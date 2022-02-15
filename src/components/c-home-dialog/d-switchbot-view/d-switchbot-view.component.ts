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
  constructor(
    public dialogRef: MatDialogRef<DSwitchbotViewComponent>,
    private SBRegDialog: MatDialog,
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
  closeDialog(): void {
    this.dialogRef.close();
  }
  ngOnDestroy(): void {
    this.appSubscription.forEach(s => s.unsubscribe());
  }
}
