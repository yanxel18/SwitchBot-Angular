import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as Models from '../../interface/Models';
import { DSwitchbotViewComponent } from '../c-home-dialog/d-switchbot-view/d-switchbot-view.component';
import { DRaspiViewComponent } from '../c-home-dialog/d-raspi-view/d-raspi-view.component';
import { DMachineViewComponent } from '../c-home-dialog/d-machine-view/d-machine-view.component';
import { DAccountViewComponent } from '../c-home-dialog/d-account-view/d-account-view.component';
import { DTabletmsgViewComponent } from '../c-home-dialog/d-tabletmsg-view/d-tabletmsg-view.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
@Component({
  selector: 'app-c-home',
  templateUrl: './c-home.component.html',
  styleUrls: ['./c-home.component.sass'],
})
export class CHomeComponent implements OnDestroy {
  querySubscription: Subscription[] = [];
  switchbotViewDialog = {
    minWidth: '320px',
    maxWidth: '825px',
  };

  switchbotRaspiDialog = {
    minWidth: '320px',
    maxWidth: '825px',
  };

  switchbotMachineDialog = {
    minWidth: '320px',
    maxWidth: '825px',
  };

  switchbotAccountDialog = {
    minWidth: '320px',
    maxWidth: '825px',
  };

  switchbotTerminalListDialog = {
    minWidth: '320px',
    maxWidth: '825px',
  };
  constructor(
    private sbViewDialog: MatDialog,
    private raspiViewDialog: MatDialog,
    private machineViewDialog: MatDialog,
    private accountViewDialog: MatDialog,
    private tabletlistViewDialog: MatDialog,
    private router: Router,
    private store: Store<Models.SwitchbotState>,
    private appService: AppService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  openDialogSwitchbotView(): void {
    this.sbViewDialog.open(DSwitchbotViewComponent, {
      disableClose: true,
      minWidth: this.switchbotViewDialog.minWidth,
    });
  }

  openDialogRaspiView(): void {
    this.raspiViewDialog.open(DRaspiViewComponent, {
      disableClose: true,
      minWidth: this.switchbotViewDialog.minWidth,
    });
  }

  openDialogMachineView(): void {
    this.machineViewDialog.open(DMachineViewComponent, {
      disableClose: true,
      minWidth: this.switchbotMachineDialog.minWidth,
    });
  }

  openDialogAccountView(): void {
    this.machineViewDialog.open(DAccountViewComponent, {
      disableClose: true,
      minWidth: this.switchbotAccountDialog.minWidth,
    });
  }


  openDialogTabletView(): void {
    this.tabletlistViewDialog.open(DTabletmsgViewComponent, {
      disableClose: true,
      minWidth: this.switchbotTerminalListDialog.minWidth,
    });
  }
  ngOnDestroy(): void {
    this.querySubscription.forEach((x) => x.unsubscribe());
  }
}
