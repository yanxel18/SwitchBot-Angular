import { Component, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as Models from '../../../interface/Models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { SpecialCharValidator, noWhitespaceValidator } from '../../../validator/formvalidator';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { DialogService } from '../s-dialog-service/dialog.service';


@Component({
  selector: 'app-d-pass-edit',
  templateUrl: './d-pass-edit.component.html',
  styleUrls: ['./d-pass-edit.component.sass'],
  providers: [DialogService]
})
export class DPassEditComponent implements OnDestroy {

  appSubscription: Subscription[] = [];
  constructor(
    public dialogRef: MatDialogRef<DPassEditComponent>,
    private dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: Models.WorkerInfoRegister
  ) { }
  accountRegForm = new FormGroup({
    pass: new FormControl('', [Validators.required, Validators.minLength(5), SpecialCharValidator(), noWhitespaceValidator]),
    passB: new FormControl('', [Validators.required, Validators.minLength(5), SpecialCharValidator(), noWhitespaceValidator]),
  }, {
    validators: [Validation.match('pass', 'passB')]
  });

  closeDialog(): void {
    this.dialogRef.close();
  }


  passwordAErrorMsg(): string | null {
    if (this.accountRegForm.get('pass')!.hasError('required')) return '空白は禁止！';
    else if (this.accountRegForm.get('pass')!.hasError('minlength')) return '5文字以上必要です！';
    else if (this.accountRegForm.get('pass')!.hasError('isCharValid')) return '特殊文字は使用できません！';
    else if (this.accountRegForm.get('pass')!.hasError('whitespace')) return 'スペースは許可されていません！';
    return null;
  }
  passwordBErrorMsg(): string | null {
    if (this.accountRegForm.get('passB')!.hasError('required')) return '空白は禁止！';
    else if (this.accountRegForm.get('passB')!.hasError('minlength')) return '5文字以上必要です！';
    else if (this.accountRegForm.get('passB')!.hasError('isCharValid')) return '特殊文字は使用できません！';
    else if (this.accountRegForm.get('passB')!.hasError('whitespace')) return 'スペースは許可されていません！';
    else if (this.accountRegForm.get('passB')!.hasError('matching')) return 'パスワードは同じではありません！！';
    return null;
  }

  submitAccountReg(): void {
    const updatePassInfo: Models.WorkerInfoRegister = {
      ...this.accountRegForm.value,
      ID: this.data.ID
    }
    if (this.accountRegForm.valid) {
      Swal.fire({
        title: "パスワード変更",
        text: "パスワードを変更しますか？",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'いいえ',
        cancelButtonColor: '#d33',
        confirmButtonText: 'はい'
      }).then((result) => {
        if (result.isConfirmed) {
          this.appSubscription.push(
            this.dialogService.updatePass(updatePassInfo).subscribe(
              async ({ data }) => {
                if (data?.updatePass === "success") {
                  await Swal.fire({
                    icon: 'success',
                    text: 'パスワードを変更しました！'
                  });
                  this.closeDialog();
                } else {
                  await Swal.fire({
                    icon: 'error',
                    text: "エラーがは発生しました！" + data?.updatePass,
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
  ngOnDestroy(): void {
    this.appSubscription.forEach(s => s.unsubscribe());
  }
}

export default class Validation {
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl!.errors && !checkControl!.errors['matching']) {
        return null;
      }

      if (control!.value !== checkControl!.value) {
        controls.get(checkControlName)!.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }
}
