import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import * as Models from '../../../interface/Models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MachineSpecialCharValidator } from '../../../validator/formvalidator';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { DialogService } from '../s-dialog-service/dialog.service';
import { DUpdateMachineMsg } from 'src/utility/messages';
@Component({
  selector: 'app-d-machine-edit',
  templateUrl: './d-machine-edit.component.html',
  styleUrls: ['./d-machine-edit.component.sass'],
  providers: [DialogService]
})
export class DMachineEditComponent implements OnInit, OnDestroy {
  switchbotList$!: Observable<Models.SwitchBot[]>;
  appSubscription: Subscription[] = [];
  constructor(
    public dialogRef: MatDialogRef<DMachineEditComponent>,
    private dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: Models.MachineListView
  ) { }
  machineUpdateForm = new UntypedFormGroup({
    machineName: new UntypedFormControl(this.data.machineName, [Validators.required, MachineSpecialCharValidator()]),
    machineModel: new UntypedFormControl(this.data.machineModel, [Validators.required, MachineSpecialCharValidator()]),
    machineSwitchbotID: new UntypedFormControl(this.data.machineSwitchbotID)
  });
  async ngOnInit(): Promise<void> {
    await this.dialogService.getMachineSwitchbotList().refetch();
    this.switchbotList$ = this.dialogService.getMachineSwitchbotList().valueChanges.pipe(map(({ data }) => {
      return data.SwitchBot ? data.SwitchBot : [];
    }));
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  submitUpdateMachine(): void {
    const newValue: Models.MachineListView = {
      ...this.machineUpdateForm.value,
      machineID: this.data.machineID
    }
    if (this.machineUpdateForm.valid) {
      Swal.fire({
        title: DUpdateMachineMsg.updateMachineTitle,
        text: DUpdateMachineMsg.askMachineUpdate,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'いいえ',
        cancelButtonColor: '#d33',
        confirmButtonText: 'はい'
      }).then((result) => {
        if (result.isConfirmed) {
          this.appSubscription.push(
            this.dialogService.updateMachine(newValue).subscribe(
              async ({ data }) => {
                if (data?.updateMachine === "success") {
                  await Swal.fire({
                    icon: 'success',
                    text: DUpdateMachineMsg.machineExisting
                  });
                  this.closeDialog();
                } else if (data?.updateMachine === "duplicate") {
                  await Swal.fire({
                    icon: 'error',
                    text: DUpdateMachineMsg.machineExisting,
                    showConfirmButton: true
                  });
                }
                else {
                  await Swal.fire({
                    icon: 'error',
                    text: DUpdateMachineMsg.error + data?.updateMachine,
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
  machineNameErr(): string | null {
    if (this.machineUpdateForm.get('machineName')!.hasError('required')) {
      return '空白は禁止！';
    } else if (this.machineUpdateForm.get('machineName')!.hasError('isCharValid')) {
      return '特殊文字は使用できません！';
    }
    return null;
  }

  machineModelErr(): string | null {
    if (this.machineUpdateForm.get('machineModel')!.hasError('required')) {
      return '空白は禁止！';
    } else if (this.machineUpdateForm.get('machineModel')!.hasError('isCharValid')) {
      return '特殊文字は使用できません！';
    }
    return null;
  }
  ngOnDestroy(): void {
    this.appSubscription.forEach(s => s.unsubscribe());
  }
}
