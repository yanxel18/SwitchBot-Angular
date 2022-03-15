import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as Models from '../../../interface/Models';
import { MatDialogRef,MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription, Observable, map } from 'rxjs';
import Swal from 'sweetalert2';
import { DialogService } from '../s-dialog-service/dialog.service';
import { DAccountRegComponent } from '../d-account-reg/d-account-reg.component';
import { DAccountEditComponent } from '../d-account-edit/d-account-edit.component';
import { DPassEditComponent } from '../d-pass-edit/d-pass-edit.component';
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

  editAccountDialog  = {
    minWidth: '320px',
    maxWidth: '825px',
  };

  editPassDialog  = {
    minWidth: '320px',
    maxWidth: '825px',
  };
  constructor(
    public dialogRef: MatDialogRef<DAccountViewComponent>,
    private AccountRegDialog: MatDialog,
    private AccountEditDialog: MatDialog,
    private PassEditDialog: MatDialog,
    private dialogService: DialogService
  ) { }

  async ngOnInit(): Promise<void> {
   await this.initializeAccountlist();

  }

  async initializeAccountlist(): Promise<void> {
    await this.dialogService.getAccountList().refetch();
    this.accountList$ = this.dialogService.getAccountList()
      .valueChanges.pipe(map(({ data }) => {
          return  data.WorkerViewList;
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

  openDialogAccountEdit(param: Models.WorkerInfo): void {
    const dialogRef = this.AccountEditDialog.open(DAccountEditComponent, {
      disableClose: true,
      minWidth: this.editAccountDialog.minWidth,
      data: param
    });

    console.log(param);
    dialogRef.afterClosed().subscribe(d => {
      this.initializeAccountlist();
    });
  }
  openDialogPassEdit(param: Models.WorkerInfo): void {
    const dialogRef = this.PassEditDialog.open(DPassEditComponent, {
      disableClose: true,
      minWidth: this.editPassDialog.minWidth,
      data: param
    });

    console.log(param);
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
