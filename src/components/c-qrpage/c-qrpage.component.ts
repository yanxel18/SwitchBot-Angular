import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Models from '../../interface/Models';
import { Subscription, Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as Selectors from '../../store/selector';
import Swal from 'sweetalert2';
import { CQrpageService } from './c-qrpage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import * as qrcode from 'qrcode-generator'
@Component({
  selector: 'app-c-qrpage',
  templateUrl: './c-qrpage.component.html',
  styleUrls: ['./c-qrpage.component.sass']
})
export class CQrpageComponent implements OnInit, OnDestroy {
  appSubscription: Subscription[] = [];
  qrFields$ : Models.QRFields [] = [];
  qrForm = new FormGroup({
    qrList: new FormControl('0'),

  });
  constructor(
    private cQRScanService: CQrpageService,
    private router: Router,
    private store: Store<Models.SwitchbotState>
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  async ngOnInit(): Promise<void> {
    await this.initializedMachineList();
  }

  generatedQR(qrCode: string | undefined): string | null {
    if (qrCode) {
      const TYPE_NUMBER = 4;
      const ERROR_CORRECTION_LEVEL = 'L';
      const myqrcode = qrcode(TYPE_NUMBER, ERROR_CORRECTION_LEVEL);
      myqrcode.addData(qrCode);
      myqrcode.make();
      return myqrcode.createImgTag();
    }
    return null
  }
  async onChangeList(event: MatSelectChange): Promise<void> {
    const listValue = event.value;
    this.qrFields$ = [];
    if (listValue === "0") {
      await this.initializedMachineList();
    }else if(listValue === "1") {
      await this.initializedUserList();
    }
  }
  async initializedMachineList(): Promise<void>   {
    await this.cQRScanService.getMachineList().refetch();
     this.appSubscription.push(this.cQRScanService.getMachineList()
      .valueChanges.subscribe(({data}) => {
        if (data.MachineList.length > 0) {
          for (let x of data.MachineList)
          this.qrFields$.push({
            description: x.machineName,
            qrcode: x.machineQR
          });
        }
      }));
  }

  async initializedUserList(): Promise<void>   {
    await this.cQRScanService.getUserList().refetch();
     this.appSubscription.push(this.cQRScanService.getUserList()
      .valueChanges.subscribe(({data}) => {
        if (data.WorkerList.length > 0) {
          for (let x of data.WorkerList)
          this.qrFields$.push({
            description: x.FullName,
            qrcode: x.UserQR
          });
        }
      }));
  }

  ngOnDestroy(): void {
    this.appSubscription.forEach(s => s.unsubscribe());
  }
}
