import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as Models from '../../../interface/Models';
import { MatDialogRef,MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription, Observable, map } from 'rxjs';
import Swal from 'sweetalert2';
import { SpecialCharValidator, MacAddressValidator } from '../../../validator/formvalidator';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from '../s-dialog-service/dialog.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DRaspiEditComponent } from '../d-raspi-edit/d-raspi-edit.component';
import { DRaspiRegComponent } from '../d-raspi-reg/d-raspi-reg.component';
import { DMachineRegComponent } from '../d-machine-reg/d-machine-reg.component';
import { DMachineEditComponent } from '../d-machine-edit/d-machine-edit.component';
@Component({
  selector: 'app-d-machine-view',
  templateUrl: './d-machine-view.component.html',
  styleUrls: ['./d-machine-view.component.sass'],
  providers: [DialogService]
})
export class DMachineViewComponent implements  OnInit,OnDestroy {
  appSubscription: Subscription[] = [];
  machineList$!: Observable<Models.MachineListView[]>;
  displayedColumns: string[] = ['名','URL','操作']; ;

  machineRegisterDialog  = {
    minWidth: '320px',
    maxWidth: '825px',
  };

  machineEditDialog  = {
    minWidth: '320px',
    maxWidth: '825px',
  };
  constructor(
    public dialogRef: MatDialogRef<DMachineViewComponent>,
    private SBMachineReg: MatDialog,
    private SBMachineEdit: MatDialog,
    private dialogService: DialogService
  ) { }

  async ngOnInit(): Promise<void> {
   await this.intializedMachineList();

  }

  async intializedMachineList(): Promise<void> {
    await this.dialogService.getMachineList().refetch();
    this.machineList$ = this.dialogService.getMachineList()
      .valueChanges.pipe(map(({ data }) => {
          return  data.MachineViewList;
      }));
  }
  openDialogRegMachine(): void {
    const dialogRef = this.SBMachineReg.open(DMachineRegComponent, {
      disableClose: true,
      minWidth: this.machineRegisterDialog.minWidth
    });

    dialogRef.afterClosed().subscribe(d => {
      this.intializedMachineList();
    });
  }

  openDialogMachineEdit(param: Models.Raspi): void {
    const dialogRef = this.SBMachineEdit.open(DMachineEditComponent, {
      disableClose: true,
      minWidth: this.machineEditDialog.minWidth,
      data: param
    });

    dialogRef.afterClosed().subscribe(d => {
      this.intializedMachineList();
    });
  }
  deleteItem(p: Models.MachineListView): void {
    if (p){
      Swal.fire({
        title: '削除',
        text: "設備情報を削除しますか？",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'いいえ',
        cancelButtonColor: '#d33',
        confirmButtonText: 'はい'
      }).then((result) => {
        if (result.isConfirmed) {
          this.appSubscription.push(
            this.dialogService.deleteMachine(p.machineID).subscribe(
              async ({ data }) => {
                if (data?.deleteMachine === "success") {
                  await Swal.fire({
                    icon: 'success',
                    text: '設備情報を削除しました！'
                  });
                  this.intializedMachineList();
                }  else {
                  await Swal.fire({
                    icon: 'error',
                    text: "エラーがは発生しました！" + data?.deleteMachine,
                    showConfirmButton: true
                  });
                }
              }
            )
          )
        }
      })
    }
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  ngOnDestroy(): void {
    this.appSubscription.forEach(s => s.unsubscribe());
  }
}
