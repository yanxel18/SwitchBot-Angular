import { Component, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as Models from '../../../interface/Models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { SpecialCharValidator, UrlValidator } from '../../../validator/formvalidator';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from '../s-dialog-service/dialog.service';

@Component({
  selector: 'app-d-raspi-edit',
  templateUrl: './d-raspi-edit.component.html',
  styleUrls: ['./d-raspi-edit.component.sass'],
  providers: [DialogService]
})
export class DRaspiEditComponent implements OnDestroy {

  appSubscription: Subscription[] = [];
  constructor(
    public dialogRef: MatDialogRef<DRaspiEditComponent>,
    private dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: Models.Raspi
  ) { }
  raspiUpdateForm = new FormGroup({
    raspiName: new FormControl(this.data.raspiName, [Validators.required, SpecialCharValidator()]),
    raspiServer: new FormControl(this.data.raspiServer, [Validators.required, UrlValidator()]),
  });

  closeDialog(): void {
    this.dialogRef.close();
  }
  submitUpdateRaspi(): void {
    const newValue: Models.Raspi = {
      ...this.raspiUpdateForm.value,
      raspiID: this.data.raspiID
    }
    if (this.raspiUpdateForm.valid) {
      Swal.fire({
        title: '編集',
        text: "RaspiberryPi情報を編集しますか？",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'いいえ',
        cancelButtonColor: '#d33',
        confirmButtonText: 'はい'
      }).then((result) => {
        if (result.isConfirmed) {
          this.appSubscription.push(
            this.dialogService.updateRaspi(newValue).subscribe(
              async ({ data }) => {
                if (data?.updateRaspi === "success") {
                  await Swal.fire({
                    icon: 'success',
                    text: 'RaspiberryPi情報を編集しました！'
                  });
                  this.closeDialog();
                } else if (data?.updateRaspi === "duplicate") {
                  await Swal.fire({
                    icon: 'error',
                    text: "RaspiberryPiサーバーはすでに存在しています！",
                    showConfirmButton: true
                  });
                }
                else {
                  await Swal.fire({
                    icon: 'error',
                    text: "エラーがは発生しました！" + data?.updateRaspi,
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
  raspiNameErr(): string | null {
    if (this.raspiUpdateForm.get('raspiName')!.hasError('required')) {
      return '空白は禁止！';
    } else if (this.raspiUpdateForm.get('raspiName')!.hasError('isCharValid')) {
      return '特殊文字は使用できません！';
    }
    return null;
  }

  raspiServerErr(): string | null {
    if (this.raspiUpdateForm.get('raspiServer')!.hasError('required')) {
      return '空白は禁止！';
    } else if (this.raspiUpdateForm.get('raspiServer')!.hasError('isCharValid')) {
      return '特殊文字は使用できません！';
    }
    return null;
  }
  ngOnDestroy(): void {
    this.appSubscription.forEach(s => s.unsubscribe());
  }
}
