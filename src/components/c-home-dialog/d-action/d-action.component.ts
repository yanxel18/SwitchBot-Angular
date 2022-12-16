import { Component, OnDestroy, Inject, OnInit } from '@angular/core';
import * as Models from '../../../interface/Models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription, Observable, map } from 'rxjs';
import Swal from 'sweetalert2';
import { DialogService } from '../s-dialog-service/dialog.service';
import { DSelectedActionMsg, CEventsMsg} from 'src/utility/messages';
import { CEventsService } from 'src/components/c-events/c-events.service';
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-d-action',
  templateUrl: './d-action.component.html',
  styleUrls: ['./d-action.component.sass']
})
export class DActionComponent implements OnInit, OnDestroy {

  subscription: Subscription[] = [];
  terminalEvent$!: Observable<Models.TerminalEvents[]>;
  selected?: number;
  terminalID: string | null = "";
  defaultLang: string | null = '';
  executeToast = Swal.mixin({
    showConfirmButton: false,
    allowEscapeKey: false,
    allowOutsideClick: false
  });
  
  constructor(
    private ceventservice: CEventsService,
    public dialogRef: MatDialogRef<DActionComponent>,
    private router: Router,
    private dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public selectedEvent: Models.TerminalEvents
  ) { }

  async ngOnInit():  Promise<void> { 
    this.terminalID = localStorage?.getItem("Terminal"); 
    if (!localStorage?.getItem('lang')) localStorage.setItem('lang','jp');
    this.defaultLang = localStorage?.getItem('lang'); 
    if (this.terminalID) 
      this.initializedTerminalListEvent(parseInt(this.terminalID),1);
  }
  async startMachine(): Promise<void> {
    Swal.fire({
      title: '「' + this.selectedEvent.termEventMsg + '」',
      text: CEventsMsg.askTostartMachine,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'いいえ',
      cancelButtonColor: '#d33',
      confirmButtonText: 'はい',
    }).then((result) => {
      if (result.isConfirmed) {
        this.executeToast.fire({
          text: CEventsMsg.machineStarting,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
          },
        });
        this.subscription.push(
          this.ceventservice
            .sendEvent(this.selectedEvent.termMsgID)
            .subscribe(async ({ data }) => { 
              if (data?.createEventLogs === 'success') {
                 this.confirmSound();
                await this.executeToast.fire({
                  icon: 'success',
                  text: CEventsMsg.machineStarted,
                  timer: 2500,
                  timerProgressBar: true,
                });
                this.dialogRef.close();
                this.router.navigate(['scan']);
              } else {
                this.executeToast.fire({
                  icon: 'error',
                  text: CEventsMsg.error + data?.createEventLogs,
                  showConfirmButton: true,
                });
              }
            })
        );
      }
    }); 
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

  private confirmSound(): void {
    const audio = new Audio();
    audio.src = '../../assets/sound/success.mp3';
    audio.load();
    audio.play();
  }
  async initializedTerminalListEvent(termID: number, tAction?: number): Promise<void> {
    const paramval : Models.TerminalListEventParam  ={
      terminalID: termID,
      termAction: tAction,
      lang: this.defaultLang 
  }
    await this.dialogService.getTerminalListEvent(paramval).refetch();
    this.terminalEvent$ = this.dialogService
      .getTerminalListEvent(paramval)
      .valueChanges.pipe(
        map(({ data }) => {
          return data.TerminalListEvents;
        })
      );
  }
  async terminalSelect(selectedItem: Models.TerminalEvents): Promise<void> { 
    　    Swal.fire({
      title: '「' + this.selectedEvent.termEventMsg + '」',
      text:  '「' + this.selectedEvent.termEventMsg + '」'+ DSelectedActionMsg.selectedActionTitle,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'いいえ',
      cancelButtonColor: '#d33',
      confirmButtonText: 'はい',
    }).then((result) => {
      if (result.isConfirmed) {

        this.executeToast.fire({
          text: CEventsMsg.machineStarting,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        this.subscription.push(
          this.ceventservice
            .sendEventHold(this.selectedEvent.termMsgID)
            .subscribe(async ({ data }) => { 
              if (data?.createEventLogsHold === 'success') {
                 this.confirmSound();
                await this.executeToast.fire({
                  icon: 'success',
                  text: DSelectedActionMsg.selectedActionHold,
                  timer: 2500,
                  timerProgressBar: true,
                });
                this.dialogRef.close();
                this.router.navigate(['scan']);
              } else {
                this.executeToast.fire({
                  icon: 'error',
                  text: DSelectedActionMsg.error + data?.createEventLogsHold,
                  showConfirmButton: true,
                });
              }
            })
        );  
      }
    });
  }
  ngOnDestroy(): void {
    this.unsubscribeF();
  }

  unsubscribeF(): void {
    this.subscription.forEach(x => x.unsubscribe());
  }
}
