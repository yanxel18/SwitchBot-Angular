import { DSwitchbotRegComponent } from './../d-switchbot-reg/d-switchbot-reg.component';
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
import { DSwitchbotEditComponent } from '../d-switchbot-edit/d-switchbot-edit.component';

@Component({
  selector: 'app-d-switchbot-view',
  templateUrl: './d-switchbot-view.component.html',
  styleUrls: ['./d-switchbot-view.component.sass'],
  providers: [DialogService]
})
export class DSwitchbotViewComponent implements OnInit,OnDestroy  {
  appSubscription: Subscription[] = [];
  switchbotList$!: Observable<Models.SwitchBot[]>;
  displayedColumns: string[] = ['名','MACアドレス','操作']; ;

  switchbotRegDialog  = {
    minWidth: '320px',
    maxWidth: '825px',
  };

  switchbotEditDialog  = {
    minWidth: '320px',
    maxWidth: '825px',
  };
  constructor(
    public dialogRef: MatDialogRef<DSwitchbotViewComponent>,
    private SBRegDialog: MatDialog,
    private SBEditDialog: MatDialog,
    private dialogService: DialogService
  ) { }

  async ngOnInit(): Promise<void> {
   await this.initializeSwitchBotlist();

  }

  async initializeSwitchBotlist(): Promise<void> {
    await this.dialogService.getSwitchbotList().refetch();
    this.switchbotList$ = this.dialogService.getSwitchbotList()
      .valueChanges.pipe(map(({ data }) => {
          return  data.SwitchBot;
      }));
  }
  openDialogSwitchReg(): void {
    const dialogRef = this.SBRegDialog.open(DSwitchbotRegComponent, {
      disableClose: true,
      minWidth: this.switchbotRegDialog.minWidth
    });

    dialogRef.afterClosed().subscribe(d => {
      this.initializeSwitchBotlist();
    });
  }

  openDialogSwitchEdit(param: Models.SwitchBot): void {
    const dialogRef = this.SBEditDialog.open(DSwitchbotEditComponent, {
      disableClose: true,
      minWidth: this.switchbotEditDialog.minWidth,
      data: param
    });

    dialogRef.afterClosed().subscribe(d => {
      this.initializeSwitchBotlist();
    });
  }
  deleteItem(p: Models.SwitchBot): void {
    if (p){
      Swal.fire({
        title: '削除',
        text: "スウィッチボットを削除しますか？",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'いいえ',
        cancelButtonColor: '#d33',
        confirmButtonText: 'はい'
      }).then((result) => {
        if (result.isConfirmed) {
          this.appSubscription.push(
            this.dialogService.deleteSwitchbot(p.switchbotID).subscribe(
              async ({ data }) => {
                if (data?.deleteSwitchBot === "success") {
                  await Swal.fire({
                    icon: 'success',
                    text: 'スウィッチボットを削除しました！'
                  });
                  this.initializeSwitchBotlist();
                }  else {
                  await Swal.fire({
                    icon: 'error',
                    text: "エラーがは発生しました！" + data?.deleteSwitchBot,
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
