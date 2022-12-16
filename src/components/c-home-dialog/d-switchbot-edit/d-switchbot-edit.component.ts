import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import * as Models from '../../../interface/Models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MacAddressValidator, SwitchbotCharValidator } from '../../../validator/formvalidator';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { DialogService } from '../s-dialog-service/dialog.service';
import { DSwitchbotEditMsg } from 'src/utility/messages';
@Component({
  selector: 'app-d-switchbot-edit',
  templateUrl: './d-switchbot-edit.component.html',
  styleUrls: ['./d-switchbot-edit.component.sass'],
  providers: [DialogService]
})
export class DSwitchbotEditComponent implements OnDestroy, OnInit {
  raspiList$!: Observable<Models.Raspi[]>;

  appSubscription: Subscription[] = [];
  constructor(
    public dialogRef: MatDialogRef<DSwitchbotEditComponent>,
    private dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: Models.SwitchBot
  ) { }
  switchbotUpdateForm = new UntypedFormGroup({
    switchbotMac: new UntypedFormControl(this.data.switchbotMac, [Validators.required, MacAddressValidator()]),
    switchbotName: new UntypedFormControl(this.data.switchbotName, [Validators.required, SwitchbotCharValidator()]),
    switchbotRaspiID: new UntypedFormControl(this.data.switchbotRaspiID)
  });

  async ngOnInit(): Promise<void> {
    await this.dialogService.getSwitchbotList().refetch();
    this.raspiList$ = this.dialogService.getRaspiList().valueChanges.pipe(map(({ data }) => {
      return data.RaspiList ? data.RaspiList : [];
    }));
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  submitUpdateSwitchbot(): void {
    const newValue: Models.SwitchBot = {
      ...this.switchbotUpdateForm.value,
      switchbotID: this.data.switchbotID
    }
    if (this.switchbotUpdateForm.valid) {
      Swal.fire({
        title: DSwitchbotEditMsg.updateSwitchbotTitle,
        text: DSwitchbotEditMsg.askSwitchbotUpdate,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'いいえ',
        cancelButtonColor: '#d33',
        confirmButtonText: 'はい'
      }).then((result) => {
        if (result.isConfirmed) {
          this.appSubscription.push(
            this.dialogService.updateSwitchbot(newValue).subscribe(
              async ({ data }) => {
                if (data?.updateSwitchBot === "success") {
                  await Swal.fire({
                    icon: 'success',
                    text: DSwitchbotEditMsg.switchbotUpdated
                  });
                  this.closeDialog();
                } else if (data?.updateSwitchBot === "duplicate") {
                  await Swal.fire({
                    icon: 'error',
                    text: DSwitchbotEditMsg.switchbotExisting,
                    showConfirmButton: true
                  });
                }
                else {
                  await Swal.fire({
                    icon: 'error',
                    text: DSwitchbotEditMsg.error + data?.updateSwitchBot,
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
  macAddressErr(): string | null {
    if (this.switchbotUpdateForm.get('switchbotMac')!.hasError('required')) {
      return '空白は禁止！';
    } else if (this.switchbotUpdateForm.get('switchbotMac')!.hasError('isCharValid')) {
      return '特殊文字は使用できません！';
    } else if (this.switchbotUpdateForm.get('switchbotMac')!.hasError('isMacValid')) {
      return 'MACアドレスパターンが正しくありません！';
    }
    return null;
  }

  switchbotNameErr(): string | null {
    if (this.switchbotUpdateForm.get('switchbotName')!.hasError('required')) {
      return '空白は禁止！';
    } else if (this.switchbotUpdateForm.get('switchbotName')!.hasError('isCharValid')) {
      return '特殊文字は使用できません！';
    }
    return null;
  }
  switchbotRaspiIDErr(): string | null {
    if (this.switchbotUpdateForm.get('switchbotRaspiID')!.hasError('required')) {
      return '空白は禁止！';
    } else if (this.switchbotUpdateForm.get('switchbotRaspiID')!.hasError('isCharValid')) {
      return '特殊文字は使用できません！';
    }
    return null;
  }
  ngOnDestroy(): void {
    this.appSubscription.forEach(s => s.unsubscribe());
  }
}
