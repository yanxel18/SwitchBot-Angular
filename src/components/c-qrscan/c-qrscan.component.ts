import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-c-qrscan',
  templateUrl: './c-qrscan.component.html',
  styleUrls: ['./c-qrscan.component.sass']
})

export class CQrscanComponent   {
  scannedQRData: string[] = [];
  processBtn: boolean = false;
  constructor() { }
  qrform = new FormGroup({
    qrscantxt: new FormControl('')
  })
  resetScan(): void {
    this.scannedQRData = [];
    this.processBtn = false;
  }
  onScan(event: Event): void {
    const t = (event.target as HTMLInputElement).value;
    if (this.scannedQRData.length < 2 && t) this.scannedQRData.push(t);
    if (this.scannedQRData[1]) this.processBtn = true;
    this.qrform.get("qrscantxt")!.setValue("");
  }


}
