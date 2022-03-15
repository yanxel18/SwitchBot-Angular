import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MacAddressValidator, SwitchbotCharValidator } from '../../../validator/formvalidator';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from '../s-dialog-service/dialog.service';

@Component({
  selector: 'app-d-switchbot-reg',
  templateUrl: './d-switchbot-reg.component.html',
  styleUrls: ['./d-switchbot-reg.component.sass'],
  providers: [DialogService]
})
export class DSwitchbotRegComponent implements OnDestroy {
  appSubscription: Subscription[] = [];
  constructor(
    public dialogRef: MatDialogRef<DSwitchbotRegComponent>,
    private dialogService: DialogService
  ) { }
  switchbotRegForm = new FormGroup({
    macAddressTxt: new FormControl('', [Validators.required, MacAddressValidator()]),
    switchbotTxt: new FormControl('', [Validators.required, SwitchbotCharValidator()]),
  });

  closeDialog(): void {
    this.dialogRef.close();
  }
  submitCreateSB(): void {
    if (this.switchbotRegForm.valid) {
      Swal.fire({
        title: '登録',
        text: "スウィッチボットを登録しますか？",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'いいえ',
        cancelButtonColor: '#d33',
        confirmButtonText: 'はい'
      }).then((result) => {
        if (result.isConfirmed) {
          this.appSubscription.push(
            this.dialogService.createSwitchbot(this.switchbotRegForm.value).subscribe(
              async ({ data }) => {
                if (data?.createSwitchBot === "success") {
                  await Swal.fire({
                    icon: 'success',
                    text: 'スウィッチボットを登録しました！'
                  });
                  this.closeDialog();
                } else if (data?.createSwitchBot === "duplicate") {
                  await Swal.fire({
                    icon: 'error',
                    text: "スウィッチボット情報はすでに存在しています！",
                    showConfirmButton: true
                  });
                }
                else {
                  await Swal.fire({
                    icon: 'error',
                    text: "エラーがは発生しました！" + data?.createSwitchBot,
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
    if (this.switchbotRegForm.get('macAddressTxt')!.hasError('required')) {
      return '空白は禁止！';
    } else if (this.switchbotRegForm.get('macAddressTxt')!.hasError('isCharValid')) {
      return '特殊文字は使用できません！';
    } else if (this.switchbotRegForm.get('macAddressTxt')!.hasError('isMacValid')) {
      return 'MACアドレスパターンが正しくありません！';
    }
    return null;
  }

  switchbotNameErr(): string | null {
    if (this.switchbotRegForm.get('switchbotTxt')!.hasError('required')) {
      return '空白は禁止！';
    } else if (this.switchbotRegForm.get('switchbotTxt')!.hasError('isCharValid')) {
      return '特殊文字は使用できません！';
    }
    return null;
  }

  ngOnDestroy(): void {
    this.appSubscription.forEach(s => s.unsubscribe());
  }
}
