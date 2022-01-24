import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CQrscanService } from './c-qrscan.service';
import { Subscription } from 'rxjs/internal/Subscription';
import * as Models from '../../interface/Models';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-c-qrscan',
  templateUrl: './c-qrscan.component.html',
  styleUrls: ['./c-qrscan.component.sass'],
  providers: [CQrscanService]
})

export class CQrscanComponent implements OnDestroy {
  scannedQRData: string[] = [];
  processBtn: boolean = false;
  querySubscription: Subscription[] = [];
  MAX_SCAN = 2;
  constructor(
    private router: Router,
    private cqrscanservice: CQrscanService
  ) {
  }
  qrform = new FormGroup({
    qrscantxt: new FormControl('')
  })
  resetScan(): void {
    this.scannedQRData = [];
    this.processBtn = false;
    this.unsubscribeF();
  }
  onScan(event: Event): void {
    const t = (event.target as HTMLInputElement).value;
    if (this.scannedQRData.length < this.MAX_SCAN && t) {
      this.scannedQRData.push(t);
      if (this.scannedQRData[1]) this.processBtn = true;
      this.qrform.get("qrscantxt")!.setValue("");

    }
  }
  async proceed(): Promise<void> {
    if (this.scannedQRData.length === this.MAX_SCAN) {
      console.log(this.scannedQRData);
      await this.cqrscanservice.validateQRScan(this.scannedQRData).refetch();
      this.unsubscribeF();
      this.querySubscription.push(this.cqrscanservice.validateQRScan(this.scannedQRData)
        .valueChanges
        .subscribe(({ data, loading }) => {
          const err = data.WorkerToken.error[0]?.message
          if (err) {
            Swal.fire({
              icon: 'error',
              title: 'QRスキャン',
              text: "エラー: " + err
            });
          }
          if (data.WorkerToken.Noket) {
            localStorage.setItem("UserNoket", data.WorkerToken.Noket);
            this.router.navigate(['control']);
          } else localStorage.removeItem("UserNoket");
        })
      );
    }
    this.validateMachine();
  }

  validateMachine(): void {
    this.querySubscription.push(
      this.cqrscanservice.checkQR(this.scannedQRData).valueChanges
        .subscribe(({ data, loading }) => {
          console.log(data);
        }))
  }
  unsubscribeF(): void {
    this.querySubscription.forEach(x => x.unsubscribe());
  }
  ngOnDestroy(): void {
    this.unsubscribeF();
  }

}
