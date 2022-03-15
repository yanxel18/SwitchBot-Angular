import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Models from '../../../interface/Models';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Subscription, Observable, map } from 'rxjs';
import Swal from 'sweetalert2';
import { DialogService } from '../s-dialog-service/dialog.service';
import { DRaspiEditComponent } from '../d-raspi-edit/d-raspi-edit.component';
import { DRaspiRegComponent } from '../d-raspi-reg/d-raspi-reg.component';

@Component({
  selector: 'app-d-raspi-view',
  templateUrl: './d-raspi-view.component.html',
  styleUrls: ['./d-raspi-view.component.sass'],
  providers: [DialogService]
})
export class DRaspiViewComponent implements OnInit, OnDestroy {

  appSubscription: Subscription[] = [];
  raspiList$!: Observable<Models.Raspi[]>;
  displayedColumns: string[] = ['名', 'URL', '操作'];;

  rRegDialog = {
    minWidth: '320px',
    maxWidth: '825px',
  };

  rEditDialog = {
    minWidth: '320px',
    maxWidth: '825px',
  };
  constructor(
    public dialogRef: MatDialogRef<DRaspiViewComponent>,
    private SBRegDialog: MatDialog,
    private SBEditDialog: MatDialog,
    private dialogService: DialogService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.initializedRaspiList();

  }

  async initializedRaspiList(): Promise<void> {
    await this.dialogService.getRaspiList().refetch();
    this.raspiList$ = this.dialogService.getRaspiList()
      .valueChanges.pipe(map(({ data }) => {
        return data.RaspiList;
      }));
  }
  openDialogRaspiReg(): void {
    const dialogRef = this.SBRegDialog.open(DRaspiRegComponent, {
      disableClose: true,
      minWidth: this.rRegDialog.minWidth
    });

    dialogRef.afterClosed().subscribe(d => {
      this.initializedRaspiList();
    });
  }

  openDialogRaspiEdit(param: Models.Raspi): void {
    const dialogRef = this.SBEditDialog.open(DRaspiEditComponent, {
      disableClose: true,
      minWidth: this.rEditDialog.minWidth,
      data: param
    });

    dialogRef.afterClosed().subscribe(d => {
      this.initializedRaspiList();
    });
  }
  deleteItem(p: Models.Raspi): void {
    if (p) {
      Swal.fire({
        title: '削除',
        text: "RaspberryPiを削除しますか？",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'いいえ',
        cancelButtonColor: '#d33',
        confirmButtonText: 'はい'
      }).then((result) => {
        if (result.isConfirmed) {
          this.appSubscription.push(
            this.dialogService.deleteRaspi(p.raspiID).subscribe(
              async ({ data }) => {
                if (data?.deleteRaspi === "success") {
                  await Swal.fire({
                    icon: 'success',
                    text: 'RaspberryPiを削除しました！'
                  });
                  this.initializedRaspiList();
                } else {
                  await Swal.fire({
                    icon: 'error',
                    text: "エラーがは発生しました！" + data?.deleteRaspi,
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
