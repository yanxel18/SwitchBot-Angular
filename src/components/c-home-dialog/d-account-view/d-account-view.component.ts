import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Models from '../../../interface/Models';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Subscription, Observable, map } from 'rxjs';
import { DialogService } from '../s-dialog-service/dialog.service';
import { DAccountRegComponent } from '../d-account-reg/d-account-reg.component';
import { DAccountEditComponent } from '../d-account-edit/d-account-edit.component';
import { DPassEditComponent } from '../d-pass-edit/d-pass-edit.component';
@Component({
  selector: 'app-d-account-view',
  templateUrl: './d-account-view.component.html',
  styleUrls: ['./d-account-view.component.sass'],
  providers: [DialogService],
})
export class DAccountViewComponent implements OnInit, OnDestroy {
  appSubscription: Subscription[] = [];
  accountList$!: Observable<Models.WorkerInfo[]>;
  displayedColumns: string[] = ['GID', '氏名', '操作'];

  regAccountDialog = {
    minWidth: '320px',
    maxWidth: '825px',
  };

  editAccountDialog = {
    minWidth: '320px',
    maxWidth: '825px',
  };

  editPassDialog = {
    minWidth: '320px',
    maxWidth: '825px',
  };
  constructor(
    public dialogRef: MatDialogRef<DAccountViewComponent>,
    private AccountRegDialog: MatDialog,
    private AccountEditDialog: MatDialog,
    private PassEditDialog: MatDialog,
    private dialogService: DialogService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.initializeAccountlist();
  }

  async initializeAccountlist(): Promise<void> {
    await this.dialogService.getAccountList().refetch();
    this.accountList$ = this.dialogService.getAccountList().valueChanges.pipe(
      map(({ data }) => {
        return data.WorkerViewList;
      })
    );
  }
  openDialogAccountReg(): void {
    const dialogRef = this.AccountRegDialog.open(DAccountRegComponent, {
      disableClose: true,
      minWidth: this.regAccountDialog.minWidth,
    });

    dialogRef.afterClosed().subscribe((d) => {
      this.initializeAccountlist();
    });
  }

  openDialogAccountEdit(param: Models.WorkerInfo): void {
    const dialogRef = this.AccountEditDialog.open(DAccountEditComponent, {
      disableClose: true,
      minWidth: this.editAccountDialog.minWidth,
      data: param,
    });
    dialogRef.afterClosed().subscribe((d) => {
      this.initializeAccountlist();
    });
  }
  openDialogPassEdit(param: Models.WorkerInfo): void {
    const dialogRef = this.PassEditDialog.open(DPassEditComponent, {
      disableClose: true,
      minWidth: this.editPassDialog.minWidth,
      data: param,
    });

    dialogRef.afterClosed().subscribe((d) => {
      this.initializeAccountlist();
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  ngOnDestroy(): void {
    this.appSubscription.forEach((s) => s.unsubscribe());
  }
}
