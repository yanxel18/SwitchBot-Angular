import { CEventsService } from './c-events.service';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import * as Models from '../../interface/Models';
import { Subscription, Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as Selectors from '../../store/selector';
import Swal from 'sweetalert2';
import { CEventsMsg } from 'src/utility/messages';
import { DTabletselectViewComponent } from 'src/components/c-home-dialog/d-tabletselect-view/d-tabletselect-view.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from '../c-home-dialog/s-dialog-service/dialog.service';
@Component({
  selector: 'app-c-events',
  templateUrl: './c-events.component.html',
  styleUrls: ['./c-events.component.sass'],
  providers: [CEventsService]
})
export class CEventsComponent implements OnInit, OnDestroy  {
  terminaViewDialog = {
    minWidth: '320px',
    maxWidth: '825px',
  };
  executeToast = Swal.mixin({
    showConfirmButton: false,
    allowEscapeKey: false,
    allowOutsideClick: false
  });
  terminalEvent$!: Observable<Models.TerminalEvents[]>;
  subscription: Subscription[] = [];
  eventMsgs$?: Observable<Models.EMessages[]>;
  machineName = localStorage.getItem("Machine");
  terminalID: string | null = "";
  selectedTerminal: string | null ="";
  constructor(
    private ceventservice: CEventsService,
    private router: Router,
    private store: Store<Models.SwitchbotState>,
    private terminalViewDialog: MatDialog,
    private dialogService: DialogService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

  }
  selected?: number;
  async ngOnInit(): Promise<void> {
    await this.validateWorkerLogin();
    this.terminalID = localStorage?.getItem("Terminal");
    this.selectedTerminal = localStorage?.getItem("TerminalName");

    this.initializeMessages();
    if (!this.terminalID && !this.selectedTerminal ) {
      this.openDialogTerminalSelectView();
    } else if (this.terminalID && this.selectedTerminal ){
      this.initializedTerminalListEvent(parseInt(this.terminalID));
    }
  }

  async initializedTerminalListEvent(termID: number): Promise<void> {
    await this.dialogService.getTerminalListEvent(termID).refetch();
    this.terminalEvent$ = this.dialogService
      .getTerminalListEvent(termID)
      .valueChanges.pipe(
        map(({ data }) => {
          return data.TerminalListEvents;
        })
      );
  }
  reselectTerminal(): void {
    this.openDialogTerminalSelectView();
  }
  openDialogTerminalSelectView(): void {
    localStorage.removeItem("Terminal");
    localStorage.removeItem("TerminalName");
   const dialogRef = this.terminalViewDialog.open(DTabletselectViewComponent, {
      disableClose: true,
      minWidth: this.terminaViewDialog.minWidth,
    });

    dialogRef.afterClosed().subscribe((value: Models.Terminal) => {
      this.initializedTerminalListEvent(value.terminalID);
      this.selectedTerminal = value.terminalName;
     localStorage.setItem("Terminal", (value.terminalID).toString());
     localStorage.setItem("TerminalName", value.terminalName);
    });
  }
  async validateWorkerLogin(): Promise<void> {
    this.subscription.push(
      this.store.select(Selectors.getWorkerInfo).subscribe((data) => {
        if (!data[0]) this.router.navigate(['scan']);
      })
    )
  }
  async errorSelect(d: Models.TerminalEvents): Promise<void> {
    Swal.fire({
      title: "「" + d.termEventMsg + "」",
      text: CEventsMsg.askTostartMachine,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'いいえ',
      cancelButtonColor: '#d33',
      confirmButtonText: 'はい'
    }).then((result) => {
      if (result.isConfirmed) {
        this.executeToast.fire({
          text: CEventsMsg.machineStarting,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          }
        });
        this.subscription.push(this.ceventservice.sendEvent(d.termMsgID)
          .subscribe(async ({ data }) => {
            if (data?.createEventLogs === "success") {
              this.confirmSound();
              await this.executeToast.fire({
                icon: 'success',
                text: CEventsMsg.machineStarted,
                timer: 2500,
                timerProgressBar: true
              });
              this.router.navigate(['scan']);
            } else {
              this.executeToast.fire({
                icon: 'error',
                text: CEventsMsg.error + data?.createEventLogs,
                showConfirmButton: true
              });
            }
          }));
      }
    });
  }
  private confirmSound(): void{
    const audio = new Audio();
    audio.src = "../../assets/sound/success.mp3";
    audio.load();
    audio.play();
  }
  backButton(): void {
    this.router.navigate(['scan']);
  }
  async initializeMessages(): Promise<void> {
    await this.ceventservice.getEventMessages().refetch();
    this.eventMsgs$ = this.ceventservice.getEventMessages()
      .valueChanges.pipe(map(({ data }) => {
        return data.EventMsg ? data.EventMsg.messages : []
      }));
  }

  ngOnDestroy(): void {
    this.unsubscribeF();
  }

  unsubscribeF(): void {
    this.subscription.forEach(x => x.unsubscribe());
  }
}
