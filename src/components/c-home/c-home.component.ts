import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DSwitchbotRegComponent } from '../c-home-dialog/d-switchbot-reg/d-switchbot-reg.component';
import { DSwitchbotViewComponent } from '../c-home-dialog/d-switchbot-view/d-switchbot-view.component';
import { DRaspiViewComponent } from '../c-home-dialog/d-raspi-view/d-raspi-view.component';
@Component({
  selector: 'app-c-home',
  templateUrl: './c-home.component.html',
  styleUrls: ['./c-home.component.sass']
})
export class CHomeComponent implements OnInit {
  switchbotViewDialog  = {
    minWidth: '320px',
    maxWidth: '825px',
  };

  switchbotRaspiDialog  = {
    minWidth: '320px',
    maxWidth: '825px',
  };
  constructor(
    private sbViewDialog: MatDialog,
    private raspiViewDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    const c = 0;
  }
  openDialogSwitchbotView(): void {
    const dialogRef = this.sbViewDialog.open(DSwitchbotViewComponent, {
      disableClose: true,
      minWidth: this.switchbotViewDialog.minWidth
    });
  }

  openDialogRaspiView(): void {
    const dialogRef = this.raspiViewDialog.open(DRaspiViewComponent, {
      disableClose: true,
      minWidth: this.switchbotViewDialog.minWidth
    });
  }
}
