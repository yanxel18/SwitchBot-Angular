import { DSwitchbotRegComponent } from './../d-switchbot-reg/d-switchbot-reg.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Models from '../../../interface/Models';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Subscription, Observable, map } from 'rxjs';
import Swal from 'sweetalert2';
import { DialogService } from '../s-dialog-service/dialog.service';
import { DSwitchbotEditComponent } from '../d-switchbot-edit/d-switchbot-edit.component';
import { DSwitchbotViewMsg } from 'src/utility/messages';
import { MatSelectChange } from '@angular/material/select';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-d-tabletmsg-view',
  templateUrl: './d-tabletmsg-view.component.html',
  styleUrls: ['./d-tabletmsg-view.component.sass']
})
export class DTabletmsgViewComponent implements OnInit,OnDestroy  {

  appSubscription: Subscription[] = [];
  terminalList$!: Observable<Models.Terminal[]>;
  eventList$!: Observable<Models.EMessages[]>;
  TERMINAL_AUTOSELECT = "0";
  constructor(
    public dialogRef: MatDialogRef<DTabletmsgViewComponent>,
    private dialogService: DialogService
  ) { }
  terminalForm = new FormGroup({
    terminalList: new FormControl(this.TERMINAL_AUTOSELECT),

  });
  async ngOnInit(): Promise<void> {
    await this.initializedTerminalList();
    await this.initializedMessageList();
  }
  async initializedTerminalList(): Promise<void> {
    await this.dialogService.getTerminalList().refetch();
    this.terminalList$ = this.dialogService.getTerminalList()
      .valueChanges.pipe(map(({ data }) => {
        return data.TerminalList;
      }));
  }
  async initializedMessageList(): Promise<void> {
    await this.dialogService.getEventmsgList().refetch();
    this.eventList$ = this.dialogService.getEventmsgList()
      .valueChanges.pipe(map(({ data }) => {
        return data.EventMsgList;
      }));
  }
  async onChangeList(event: MatSelectChange): Promise<void> {
    const listValue = event.value;

  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  ngOnDestroy(): void {
    this.appSubscription.forEach(s => s.unsubscribe());
  }
}
