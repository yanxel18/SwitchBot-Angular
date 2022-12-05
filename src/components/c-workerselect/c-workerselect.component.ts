import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CWorkerselectService } from './c-workerselect.service';
import { Subscription,Observable, map } from 'rxjs';
import * as Models from '../../interface/Models';
import { Router } from '@angular/router';
import * as Actions from '../../store/actions';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { DMachineselectDialogComponent } from '../c-home-dialog/d-machineselect/d-machineselect-dialog.component';
import { MatDialog } from '@angular/material/dialog';
 
@Component({
  selector: 'app-c-workerselect',
  templateUrl: './c-workerselect.component.html',
  styleUrls: ['./c-workerselect.component.sass'],
  providers: [CWorkerselectService]
})
export class CWorkerselectComponent implements OnInit, OnDestroy  {
  terminalViewDialogSize = {
    minWidth: '320px',
    maxWidth: '825px',
  };
  terminalEvent$!: Observable<Models.TerminalEvents[]>; 
  machineName = localStorage.getItem("Machine");
  scannedQRData: string[] = []; 
  selectedMachine: string | null = "";
  selectedMachineQR: string | null = "";
  processBtn: boolean = false;
  querySubscription: Subscription[] = [];
  workerList$?: Observable<Models.WorkerSelect[]>;
  selected?: number;
  MAX_SCAN = 2;
  MAX_QRCODE_LENGTH = 1;
  @ViewChild('qrscan') scanTxt!: ElementRef;
  constructor(
    private router: Router,
    private cworkerselectservice: CWorkerselectService,
    private store: Store<Models.SwitchbotState>,
    private machineSelectDialog: MatDialog
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.removeItems();
  }
  async ngOnInit(): Promise<void> {
    await this.initializeWorkerList(); 
    this.selectedMachine = localStorage?.getItem("MachineName");
    this.selectedMachineQR = localStorage?.getItem("MachineQR");
    if (!this.selectedMachine || !this.selectedMachineQR ) {
      this.openMachineSelect();
    } 
  }
  reselectTerminal(): void {
    this.openMachineSelect();
  }
  openMachineSelect(): void { 
    localStorage.removeItem("MachineName");
    localStorage.removeItem("MachineQR");
   const dialogRef = this.machineSelectDialog.open(DMachineselectDialogComponent, {
      disableClose: true,
      minWidth: this.terminalViewDialogSize.minWidth,
    });

    dialogRef.afterClosed().subscribe((value: Models.MachineSelect) => {
      if (value.machineQR && value.machineName){
        this.selectedMachine = value.machineName;
        this.selectedMachineQR  = value.machineQR;
        localStorage.setItem("MachineName",value.machineName)
        localStorage.setItem("MachineQR", value.machineQR);
      }
    });
  }
  qrform = new FormGroup({
    qrscantxt: new FormControl('')
  })
  resetScan(): void {
    this.scannedQRData = [];
    this.processBtn = false;
    this.qrform.get("qrscantxt")!.setValue("");
    this.unsubscribeF();
  }

  async initializeWorkerList(): Promise<void>{
    await this.cworkerselectservice.getworkerSelect().refetch();
    this.workerList$ = this.cworkerselectservice.getworkerSelect()
      .valueChanges.pipe(map (({data}) => {
          return data.WorkerSelect;
      }));
  }

  selectedWorker(value: Models.WorkerSelect){
     if (value.UserQR && this.selectedMachineQR) {
      this.scannedQRData[0] = value.UserQR;
      this.scannedQRData[1] = this.selectedMachineQR
      this.proceed();
     }
 
  }
  async onScan(event: Event): Promise<void> {
    const getScanValue: string = (event.target as HTMLInputElement).value;
    if (getScanValue) this.scanSound();
    if (getScanValue.length >= this.MAX_QRCODE_LENGTH) {
      if (this.scannedQRData.length == 2) this.resetScan();
      if (this.scannedQRData.length < this.MAX_SCAN && getScanValue) {

        this.scannedQRData.push(getScanValue);
        if (this.scannedQRData[1]) {
          this.processBtn = true;
          await this.proceed();
        }
        this.qrform.get("qrscantxt")!.setValue("");
      } else this.resetScan();
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showCloseButton: true,
        showConfirmButton: false,
        timer: 5000
      });
      Toast.fire({
        icon: 'error',
        text: "QRコードが処理ができませんでした！"
      });
    }

  }
  scanSound(): void {
    const audio = new Audio();
    audio.src = "../../assets/sound/scan.mp3";
    audio.load();
    audio.play();
  } 
  async proceed(): Promise<void> {
    if (this.scannedQRData.length === this.MAX_SCAN) {
      this.unsubscribeF();
      this.querySubscription.push(this.cworkerselectservice.checkQRdata(this.scannedQRData)
        .subscribe(({ data }) => {
          const userInfo = data?.WorkerToken.ScanInfo?.UInfo;
          if (data?.WorkerToken && userInfo) {
            this.setItems(data);
            this.store.dispatch(Actions.LoadWorkerInfo({ payload: userInfo }))
            this.store.dispatch(Actions.SetScan({ payload: true }));
            this.router.navigate(['control']);
          } else this.removeItems();
        })
      );

    }
  }
  private setItems(data: Models.WorkerToken): void {
    if (data.WorkerToken.Noket) localStorage.setItem("UserNoket", data.WorkerToken.Noket);
    if (data.WorkerToken.ScanInfo) {
      localStorage.setItem("Machine", data.WorkerToken.ScanInfo.machineName);
      localStorage.setItem("WName", data.WorkerToken.ScanInfo.UInfo[0].FullName);
      localStorage.setItem("GID", data.WorkerToken.ScanInfo.UInfo[0].GIDFull);
    }


  }

  private removeItems(): void {
    this.store.dispatch(Actions.LoadWorkerInfo({ payload: [] }))
    localStorage.removeItem("UserNoket");
    localStorage.removeItem("WName");
    localStorage.removeItem("GID");
    localStorage.removeItem("Machine");
  }
  unsubscribeF(): void {
    this.querySubscription.forEach(x => x.unsubscribe());
  }
  ngOnDestroy(): void {
    this.unsubscribeF();
  }

}
