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
import { CEventsMsg, DTerminalEventMsg } from 'src/utility/messages';

@Component({
  selector: 'app-d-tabletselect-view',
  templateUrl: './d-tabletselect-view.component.html',
  styleUrls: ['./d-tabletselect-view.component.sass']
})
export class DTabletselectViewComponent implements  OnInit,OnDestroy {
  subscription: Subscription[] = [];
  terminalList$!: Observable<Models.Terminal[]>;
  selected?: number;

  executeToast = Swal.mixin({
    showConfirmButton: false,
    allowEscapeKey: false,
    allowOutsideClick: false
  });
  constructor(
    public dialogRef: MatDialogRef<DTabletselectViewComponent>,
    private dialogService: DialogService
  ) { }

  async ngOnInit():  Promise<void> {
    this.initializedTerminalList();

  }

  async initializedTerminalList(): Promise<void> {
    await this.dialogService.getTerminalListView().refetch();
    this.terminalList$ = this.dialogService.getTerminalListView().valueChanges.pipe(
      map(({ data }) => {
        return data.TerminalListView;
      })
    );
  }
  async terminalSelect(selectedItem: Models.Terminal): Promise<void> {
    this.dialogRef.close(selectedItem);
  }
  ngOnDestroy(): void {
    this.unsubscribeF();
  }

  unsubscribeF(): void {
    this.subscription.forEach(x => x.unsubscribe());
  }
}
