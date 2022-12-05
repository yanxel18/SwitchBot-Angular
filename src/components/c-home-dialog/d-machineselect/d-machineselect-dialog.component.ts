import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as Models from '../../../interface/Models';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription, Observable, map } from 'rxjs';
import Swal from 'sweetalert2';
import { DialogService } from '../s-dialog-service/dialog.service';

@Component({
  selector: 'app-d-machineselect-dialog',
  templateUrl: './d-machineselect-dialog.component.html',
  styleUrls: ['./d-machineselect-dialog.component.sass']
})
export class DMachineselectDialogComponent implements OnInit,OnDestroy {
  subscription: Subscription[] = [];
  terminalList$!: Observable<Models.MachineSelect[]>;
  selected?: number;

  executeToast = Swal.mixin({
    showConfirmButton: false,
    allowEscapeKey: false,
    allowOutsideClick: false
  });
  constructor(
    public dialogRef: MatDialogRef<DMachineselectDialogComponent>,
    private dialogService: DialogService
  ) { }

  async ngOnInit():  Promise<void> {
    this.initializedMachineList();

  }

  async initializedMachineList(): Promise<void> {
    await this.dialogService.getMachineSelect().refetch();
    this.terminalList$ = this.dialogService.getMachineSelect().valueChanges.pipe(
      map(({ data }) => {
        return data.MachineSelect;
      })
    );
  }
  async terminalSelect(selectedItem: Models.MachineSelect): Promise<void> {
    this.dialogRef.close(selectedItem);
  }
  ngOnDestroy(): void {
    this.unsubscribeF();
  }

  unsubscribeF(): void {
    this.subscription.forEach(x => x.unsubscribe());
  }

}
