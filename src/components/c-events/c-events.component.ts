import { CEventsService } from './c-events.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Models from '../../interface/Models';
import { Subscription, Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as Selectors from '../../store/selector';
import Swal from 'sweetalert2';　
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '../c-home-dialog/s-dialog-service/dialog.service';
import { DTabletselectViewComponent } from '../c-home-dialog/d-tabletselect-view/d-tabletselect-view.component';
import { DActionComponent } from '../c-home-dialog/d-action/d-action.component';
@Component({
  selector: 'app-c-events',
  templateUrl: './c-events.component.html',
  styleUrls: ['./c-events.component.sass'],
  providers: [CEventsService],
})
export class CEventsComponent implements OnInit, OnDestroy {
  terminalDialog = {
    minWidth: '320px',
    maxWidth: '825px',
  };
  actionDialog = {
    minWidth: '320px',
    maxWidth: '825px',
  };
  
  executeToast = Swal.mixin({
    showConfirmButton: false,
    allowEscapeKey: false,
    allowOutsideClick: false,
  });
  terminalEvent$!: Observable<Models.TerminalEvents[]>;
  subscription: Subscription[] = [];
  eventMsgs$?: Observable<Models.EMessages[]>;
  machineName = localStorage.getItem('Machine');
  terminalID: string | null = '';
  selectedTerminal: string | null = '';
  defaultLang: string | null = '';
  constructor(
    private ceventservice: CEventsService,
    private router: Router,
    private store: Store<Models.SwitchbotState>,
    private terminalViewDialog: MatDialog,
    private dialogService: DialogService,
    private actionViewDialog: MatDialog
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  selected?: number;
  async ngOnInit(): Promise<void> {
    await this.validateWorkerLogin();
    this.terminalID = localStorage?.getItem('Terminal');
    this.selectedTerminal = localStorage?.getItem('TerminalName');
    if (!localStorage?.getItem('lang')) localStorage.setItem('lang','jp');
    this.defaultLang = localStorage?.getItem('lang'); 
    this.initializeMessages();
    if (!this.terminalID && !this.selectedTerminal) {
      this.openDialogTerminalSelectView();
    } else if (this.terminalID && this.selectedTerminal) {
      this.initializedTerminalListEvent(parseInt(this.terminalID), 0);
    }
  }

  async initializedTerminalListEvent(
    termID: number,
    tAction?: number
  ): Promise<void> {
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
  activateLang(langvalue: string): void {
    localStorage.setItem('lang',langvalue);
    this.ngOnInit();
  }
  reselectTerminal(): void {
    this.openDialogTerminalSelectView();
  }
  openDialogTerminalSelectView(): void {
    localStorage.removeItem('Terminal');
    localStorage.removeItem('TerminalName');
    const dialogRef = this.terminalViewDialog.open(DTabletselectViewComponent, {
      disableClose: true,
      minWidth: this.terminalDialog.minWidth,
    });

    dialogRef.afterClosed().subscribe((value: Models.Terminal) => {
      const defaulTermAction = 0;
      this.initializedTerminalListEvent(value.terminalID, defaulTermAction);
      this.selectedTerminal = value.terminalName;
      localStorage.setItem('Terminal', value.terminalID.toString());
      localStorage.setItem('TerminalName', value.terminalName);
    });
  }

  openDialogActionSelectView(selectedEvent: Models.TerminalEvents): void {
   this.actionViewDialog.open(DActionComponent, {
      disableClose: false,
      minWidth: this.terminalDialog.minWidth,
      data: selectedEvent
    });
  }
  async validateWorkerLogin(): Promise<void> {
    this.subscription.push(
      this.store.select(Selectors.getWorkerInfo).subscribe((data) => {
        if (!data[0]) this.router.navigate(['scan']);
      })
    );
  }
  async errorSelect(selectedEvent: Models.TerminalEvents): Promise<void> {
      this.openDialogActionSelectView(selectedEvent); 
    

  }

  backButton(): void {
    this.router.navigate(['scan']);
  }
  async initializeMessages(): Promise<void> {
    await this.ceventservice.getEventMessages().refetch();
    this.eventMsgs$ = this.ceventservice.getEventMessages().valueChanges.pipe(
      map(({ data }) => {
        return data.EventMsg ? data.EventMsg.messages : [];
      })
    );
  }

  ngOnDestroy(): void {
    this.unsubscribeF();
  }

  unsubscribeF(): void {
    this.subscription.forEach((x) => x.unsubscribe());
  }
}
