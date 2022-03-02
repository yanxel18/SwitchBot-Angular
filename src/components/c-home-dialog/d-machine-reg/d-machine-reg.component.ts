import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import * as Models from '../../../interface/Models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { SpecialCharValidator, MacAddressValidator,UrlValidator } from '../../../validator/formvalidator';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from '../s-dialog-service/dialog.service';

@Component({
  selector: 'app-d-machine-reg',
  templateUrl: './d-machine-reg.component.html',
  styleUrls: ['./d-machine-reg.component.sass'],
  providers: [DialogService]
})
export class DMachineRegComponent implements OnDestroy {
  appSubscription: Subscription[] = [];
  constructor(
    public dialogRef: MatDialogRef<DMachineRegComponent>,
    private dialogService: DialogService,
  ) { }
  machineRegisterForm = new FormGroup({
    machineName: new FormControl('', [Validators.required, SpecialCharValidator()]),
    machineModel: new FormControl('', [Validators.required, SpecialCharValidator()])
  });

  closeDialog(): void {
    this.dialogRef.close();
  }
  submitRegisterMachine(): void {
    const newValue: Models.MachineListView = {
      ...this.machineRegisterForm.value
    }
    console.log(newValue);
    if (this.machineRegisterForm.valid) {
      Swal.fire({
        title: '登録',
        text: "設備情報を登録しますか？",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'いいえ',
        cancelButtonColor: '#d33',
        confirmButtonText: 'はい'
      }).then((result) => {
        if (result.isConfirmed) {
          this.appSubscription.push(
            this.dialogService.createMachine(newValue).subscribe(
              async ({ data }) => {
                if (data?.createMachine === "success") {
                  await Swal.fire({
                    icon: 'success',
                    text: '設備情報を登録しました！'
                  });
                  this.closeDialog();
                } else if (data?.createMachine === "duplicate") {
                  await Swal.fire({
                    icon: 'error',
                    text: "設備情報はすでに存在しています！",
                    showConfirmButton: true
                  });
                }
                else {
                  await Swal.fire({
                    icon: 'error',
                    text: "エラーがは発生しました！" + data?.createMachine,
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
    if (this.machineRegisterForm.get('machineName')!.hasError('required')) {
      return '空白は禁止！';
    } else if (this.machineRegisterForm.get('machineName')!.hasError('isCharValid')) {
      return '特殊文字は使用できません！';
    }
    return null;
  }

  machineModelErr(): string | null {
    if (this.machineRegisterForm.get('machineModel')!.hasError('required')) {
      return '空白は禁止！';
    } else if (this.machineRegisterForm.get('machineModel')!.hasError('isCharValid')) {
      return '特殊文字は使用できません！';
    }
    return null;
  }
  ngOnDestroy(): void {
    this.appSubscription.forEach(s => s.unsubscribe());
  }
}
