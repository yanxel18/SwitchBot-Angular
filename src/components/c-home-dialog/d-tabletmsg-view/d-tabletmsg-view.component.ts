import { DSwitchbotRegComponent } from './../d-switchbot-reg/d-switchbot-reg.component';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as Models from '../../../interface/Models';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Subscription, Observable, map } from 'rxjs';
import Swal from 'sweetalert2';
import { DialogService } from '../s-dialog-service/dialog.service';
import { MatSelectChange } from '@angular/material/select';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelectionList } from '@angular/material/list';
import { DTerminalEventMsg } from 'src/utility/messages';
@Component({
  selector: 'app-d-tabletmsg-view',
  templateUrl: './d-tabletmsg-view.component.html',
  styleUrls: ['./d-tabletmsg-view.component.sass'],
})
export class DTabletmsgViewComponent implements OnInit, OnDestroy {
  appSubscription: Subscription[] = [];
  terminalList$!: Observable<Models.Terminal[]>;
  eventList$!: Observable<Models.EMessages[]>;
  terminalEvent$!: Observable<Models.TerminalEvents[]>;
  filteredEvents: Models.TerminalEvents[] = [];
  allowMultiple: boolean = false;
  TERMINAL_AUTOSELECT = '0';
  @ViewChild('eventlist') eventList: MatSelectionList | undefined;

  constructor(
    public dialogRef: MatDialogRef<DTabletmsgViewComponent>,
    private dialogService: DialogService
  ) {}
  terminalForm = new FormGroup({
    terminalID: new FormControl(this.TERMINAL_AUTOSELECT),
    eventMSG: new FormControl()
  });

  async ngOnInit(): Promise<void> {
    await this.initializedTerminalList();
    await this.initializedMessageList();
  }

  async initializedTerminalList(): Promise<void> {
    await this.dialogService.getTerminalList().refetch();
    this.terminalList$ = this.dialogService.getTerminalList().valueChanges.pipe(
      map(({ data }) => {
        return data.TerminalList;
      })
    );
  }
  async initializedMessageList(): Promise<void> {
    await this.dialogService.getEventmsgList().refetch();
    this.eventList$ = this.dialogService.getEventmsgList().valueChanges.pipe(
      map(({ data }) => {
        return data.EventMsgList;
      })
    );
  }

  async initializedTerminal(termID: number): Promise<void> {
    await this.dialogService.getTerminalEvent(termID).refetch();
    this.terminalEvent$ = this.dialogService
      .getTerminalEvent(termID)
      .valueChanges.pipe(
        map(({ data }) => {
          return data.TerminalEvents;
        })
      );
    this.appSubscription.push(
      this.terminalEvent$.subscribe((data) => {
        this.filteredEvents = data;
      })
    );
  }

  submitData(): void {
    const selectedEventRaw : Models.createTabletEvent =  this.terminalForm.value;
    if (this.terminalForm.valid) {
      Swal.fire({
        title: DTerminalEventMsg.updateTerminalTitle,
        text: DTerminalEventMsg.askTerminalUpdate,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'いいえ',
        cancelButtonColor: '#d33',
        confirmButtonText: 'はい'
      }).then((result) => {
        if (result.isConfirmed) {
          this.appSubscription.push(
            this.dialogService.createTabletEvent(selectedEventRaw).subscribe(
              async ({ data }) => {
                if (data?.createTabletEvent === "success") {
                  await Swal.fire({
                    icon: 'success',
                    text: DTerminalEventMsg.TerminalUpdated
                  });
                  this.initializedEventList(selectedEventRaw.terminalID);
                }else {
                  await Swal.fire({
                    icon: 'error',
                    text: DTerminalEventMsg.error + data?.createTabletEvent,
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
  checkItem(msgID: number): boolean {
    return this.filteredEvents.find((b) => b.termMsgID === msgID)
      ? true
      : false;
  }
  async onChangeList(event: MatSelectChange): Promise<void> {
    const termID: number = event.value;
    this.initializedEventList(termID);
  }

  async initializedEventList(termID: number): Promise<void> {
    this.allowMultiple = true;
    this.eventList?.deselectAll();
    this.filteredEvents = [];
    await this.initializedTerminal(termID);
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  ngOnDestroy(): void {
    this.appSubscription.forEach((s) => s.unsubscribe());
  }
}


