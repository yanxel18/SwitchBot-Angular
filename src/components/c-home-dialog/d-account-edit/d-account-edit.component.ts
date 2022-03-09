import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import * as Models from '../../../interface/Models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { SpecialCharValidator, noWhitespaceValidator } from '../../../validator/formvalidator';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { DialogService } from '../s-dialog-service/dialog.service';

@Component({
  selector: 'app-d-account-edit',
  templateUrl: './d-account-edit.component.html',
  styleUrls: ['./d-account-edit.component.sass']
})
export class DAccountEditComponent implements OnInit, OnDestroy {
  accountTypeList$!: Observable<Models.AccountType[]>;
  appSubscription: Subscription[] = [];
  constructor(
    public dialogRef: MatDialogRef<DAccountEditComponent>,
    private dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: Models.WorkerInfo
  ) { }
  accountRegForm = new FormGroup({
    GIDFull: new FormControl({ value: this.data.GIDFull, disabled: true }, [Validators.required, SpecialCharValidator()]),
    FullName: new FormControl(this.data.FullName, [Validators.required, SpecialCharValidator()]),
    AccLvl: new FormControl(this.data.AccLvl, [Validators.required])
  });
  async ngOnInit(): Promise<void> {
    await this.dialogService.getAccountTypeList().refetch();
    this.accountTypeList$ = this.dialogService.getAccountTypeList().valueChanges.pipe(map(({ data }) => {
      return data.AccountType ? data.AccountType : [];
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
    if (this.accountRegForm.get("accesslvlID")?.hasError('required')) return '空白は禁止！';
    return null;
  }
  machineModelErr(): string | null {
    if (this.accountRegForm.get('machineModel')!.hasError('required')) return '空白は禁止！';
    else if (this.accountRegForm.get('machineModel')!.hasError('isCharValid')) return '特殊文字は使用できません！';
    return null;
  }


  submitAccountReg(): void {
    const registerInfo: Models.WorkerInfo =  {
      ...this.accountRegForm.value,
      ID: this.data.ID
    }

    if (this.accountRegForm.valid) {
      Swal.fire({
        title: 'アカウント報告更新',
        text: "アカウントを更新しますか？",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'いいえ',
        cancelButtonColor: '#d33',
        confirmButtonText: 'はい'
      }).then((result) => {
        if (result.isConfirmed) {
          this.appSubscription.push(
            this.dialogService.updateAccount(registerInfo).subscribe(
              async ({ data }) => {
                if (data?.updateAccount === "success") {
                  await Swal.fire({
                    icon: 'success',
                    text: 'アカウントを更新しました！'
                  });
                  this.closeDialog();
                } else if (data?.updateAccount === "duplicate") {
                  await Swal.fire({
                    icon: 'error',
                    text: "アカウントはすでに存在しています！",
                    showConfirmButton: true
                  });
                }
                else {
                  await Swal.fire({
                    icon: 'error',
                    text: "エラーがは発生しました！" + data?.updateAccount,
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
