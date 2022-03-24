import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import * as Models from '../../../interface/Models';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { SpecialCharValidator, noWhitespaceValidator } from '../../../validator/formvalidator';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { DialogService } from '../s-dialog-service/dialog.service';
import { DAccountRegisterMsg } from 'src/utility/messages';
@Component({
  selector: 'app-d-account-reg',
  templateUrl: './d-account-reg.component.html',
  styleUrls: ['./d-account-reg.component.sass'],
  providers: [DialogService]
})
export class DAccountRegComponent implements OnInit, OnDestroy {
  accountTypeList$!: Observable<Models.AccountType[]>;
  appSubscription: Subscription[] = [];
  constructor(
    public dialogRef: MatDialogRef<DAccountRegComponent>,
    private dialogService: DialogService
  ) { }
  accountRegForm = new FormGroup({
    GIDFull: new FormControl('', [Validators.required, SpecialCharValidator()]),
    FullName: new FormControl('', [Validators.required, SpecialCharValidator()]),
    AccLvl: new FormControl(null, [Validators.required]),
    pass: new FormControl('', [Validators.required, Validators.minLength(5), SpecialCharValidator(), noWhitespaceValidator]),
    passB: new FormControl('', [Validators.required, Validators.minLength(5), SpecialCharValidator(), noWhitespaceValidator]),
  }, {
    validators: [Validation.match('pass', 'passB')]
  });
  async ngOnInit(): Promise<void> {
    await this.dialogService.getAccountTypeList().refetch();
    this.accountTypeList$ = this.dialogService.getAccountTypeList().valueChanges.pipe(map(({ data }) => {
      return data.AccountType ? data.AccountType : [];
    }));

    this.appSubscription.push(this.accountRegForm.get('GIDFull')!.valueChanges.subscribe((event) => {
      this.accountRegForm.get('GIDFull')!.setValue(event.toLowerCase(), { emitEvent: false });
    }));
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

  gidFullErr(): string | null {
    if (this.accountRegForm.get('GIDFull')!.hasError('required')) return '空白は禁止！';
    else if (this.accountRegForm.get('GIDFull')!.hasError('isCharValid')) return '特殊文字は使用できません！';
    return null;
  }

  fullNameErr(): string | null {
    if (this.accountRegForm.get('FullName')!.hasError('required')) return '空白は禁止！';
    else if (this.accountRegForm.get('FullName')!.hasError('isCharValid')) return '特殊文字は使用できません！';
    return null;
  }
  accLvlErrorMsg(): string | null {
    if (this.accountRegForm.get("AccLvl")?.hasError('required')) return '空白は禁止！'
    return null;
  }
  machineModelErr(): string | null {
    if (this.accountRegForm.get('machineModel')!.hasError('required')) return '空白は禁止！';
    else if (this.accountRegForm.get('machineModel')!.hasError('isCharValid')) return '特殊文字は使用できません！';
    return null;
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
    const registerInfo: Models.WorkerInfoRegister = this.accountRegForm.value;

    if (this.accountRegForm.valid) {
      Swal.fire({
        title: DAccountRegisterMsg.registerAccountTitle,
        text: DAccountRegisterMsg.askAccountRegister,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'いいえ',
        cancelButtonColor: '#d33',
        confirmButtonText: 'はい'
      }).then((result) => {
        if (result.isConfirmed) {
          this.appSubscription.push(
            this.dialogService.createAccount(registerInfo).subscribe(
              async ({ data }) => {
                if (data?.createAccount === "success") {
                  await Swal.fire({
                    icon: 'success',
                    text: DAccountRegisterMsg.accountRegistered
                  });
                  this.closeDialog();
                } else if (data?.createAccount === "duplicate") {
                  await Swal.fire({
                    icon: 'error',
                    text: DAccountRegisterMsg.accountExisting,
                    showConfirmButton: true
                  });
                }
                else {
                  await Swal.fire({
                    icon: 'error',
                    text: DAccountRegisterMsg.error + data?.createAccount,
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
