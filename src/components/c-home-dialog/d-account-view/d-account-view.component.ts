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
import { DAccountRegComponent } from '../d-account-reg/d-account-reg.component';
@Component({
  selector: 'app-d-account-view',
  templateUrl: './d-account-view.component.html',
  styleUrls: ['./d-account-view.component.sass'],
  providers: [DialogService]
})
export class DAccountViewComponent implements OnInit,OnDestroy {
  appSubscription: Subscription[] = [];
  accountList$!: Observable<Models.WorkerInfo[]>;
  displayedColumns: string[] = ['GID','氏名','操作']; ;

  regAccountDialog  = {
    minWidth: '320px',
    maxWidth: '825px',
  };

  switchbotEditDialog  = {
    minWidth: '320px',
    maxWidth: '825px',
  };
  constructor(
    public dialogRef: MatDialogRef<DAccountViewComponent>,
    private AccountRegDialog: MatDialog,
    private AccountEditDialog: MatDialog,
    private dialogService: DialogService
  ) { }

  async ngOnInit(): Promise<void> {
   await this.initializeAccountlist();

  }

  async initializeAccountlist(): Promise<void> {
    await this.dialogService.getAccountList().refetch();
    this.accountList$ = this.dialogService.getAccountList()
      .valueChanges.pipe(map(({ data }) => {
          return  data.WorkerList;
      }));
  }
  openDialogAccountReg(): void {
    const dialogRef = this.AccountRegDialog.open(DAccountRegComponent, {
      disableClose: true,
      minWidth: this.regAccountDialog.minWidth
    });

    dialogRef.afterClosed().subscribe(d => {
      this.initializeAccountlist();
    });
  }

  openDialogSwitchEdit(param: Models.SwitchBot): void {
    const dialogRef = this.AccountEditDialog.open(DSwitchbotEditComponent, {
      disableClose: true,
      minWidth: this.switchbotEditDialog.minWidth,
      data: param
    });

    dialogRef.afterClosed().subscribe(d => {
      this.initializeAccountlist();
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
                  this.initializeAccountlist();
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
