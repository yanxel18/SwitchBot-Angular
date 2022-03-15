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
import * as qrcode from 'qrcode-generator';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-c-qrpage',
  templateUrl: './c-qrpage.component.html',
  styleUrls: ['./c-qrpage.component.sass'],
  providers: [CQrpageService]
})
export class CQrpageComponent implements OnInit, OnDestroy {
  appSubscription: Subscription[] = [];
  qrFields$: Models.QRFields[] = [];
  MACHINE_AUTOSELECT = "0";
  qrForm = new FormGroup({
    qrList: new FormControl(this.MACHINE_AUTOSELECT),

  });
  constructor(
    private cQRScanService: CQrpageService,
    private router: Router,
    private store: Store<Models.SwitchbotState>
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  async ngOnInit(): Promise<void> {
    this.appSubscription.push(this.store.select(Selectors.getSignIn).subscribe((userSignin: boolean) =>{
      if (!userSignin) {
        this.router.navigate(['panel']);
      }
    }));
    await this.initializedMachineList();
  }
  backButton(): void {
    this.router.navigate(['panel']);
  }
  generatedQR(qrCode: string | undefined): string | null {
    if (qrCode) {
      const TYPE_NUMBER = 4;
      const ERROR_CORRECTION_LEVEL = 'L';
      const myqrcode = qrcode(TYPE_NUMBER, ERROR_CORRECTION_LEVEL);
      myqrcode.addData(qrCode);
      myqrcode.make();
      this.getLink(myqrcode.createImgTag());
      return myqrcode.createImgTag();
    }
    return null
  }

  downloadImg(url: string | null, filename: string | undefined): void {
    if (url) saveAs(url, filename + '.png');
  }

  getLink(qrlink: string | null): string | null {
    let quoteIndices = [];

    const MAX_FOUND_QUOTE = 2;
    const FIRST_QUOTE_INDEX = 0;
    const SECOND_QUOTE_INDEX = 1;
    const CHAR_TO_FIND = "\"";
    const ADD_SUBSTRING_FIRSTINDEX = 1;
    if (qrlink) {
      for (var i = 0; i < qrlink.length; i++)
        if (qrlink[i] === CHAR_TO_FIND && quoteIndices.length < MAX_FOUND_QUOTE) quoteIndices.push(i);
      if (quoteIndices.length > 0) {
        const gotQRLink = qrlink.substring(
                  quoteIndices[FIRST_QUOTE_INDEX] + ADD_SUBSTRING_FIRSTINDEX,
                  quoteIndices[SECOND_QUOTE_INDEX]
                  );
        return gotQRLink;
      }
    }
    return null;

  }
  async onChangeList(event: MatSelectChange): Promise<void> {
    const listValue = event.value;
    this.qrFields$ = [];
    const ISMACHINE_SELECTED = "0";
    const ISUSER_SELECTED = "1";
    if (listValue === ISMACHINE_SELECTED) {
      await this.initializedMachineList();
    } else if (listValue === ISUSER_SELECTED) {
      await this.initializedUserList();
    }
  }
  async initializedMachineList(): Promise<void> {
    await this.cQRScanService.getMachineList().refetch();
    this.appSubscription.push(this.cQRScanService.getMachineList()
      .valueChanges.subscribe(({ data }) => {
        if (data.MachineViewList.length > 0) {
          this.qrFields$ = [];
          for (let x of data.MachineViewList)
            this.qrFields$.push({
              description: x.machineName,
              qrcode: x.machineQR
            });
        }
      }));
  }

  async initializedUserList(): Promise<void> {
    await this.cQRScanService.getUserList().refetch();
    this.appSubscription.push(this.cQRScanService.getUserList()
      .valueChanges.subscribe(({ data }) => {
        if (data.WorkerViewList.length > 0) {
          this.qrFields$ = [];
          for (let x of data.WorkerViewList)
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
