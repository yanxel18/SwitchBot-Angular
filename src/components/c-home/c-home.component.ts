import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DSwitchbotRegComponent } from '../c-home-dialog/d-switchbot-reg/d-switchbot-reg.component';
import { DSwitchbotViewComponent } from '../c-home-dialog/d-switchbot-view/d-switchbot-view.component';
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
  constructor(
    private activityList: MatDialog,
  ) { }

  ngOnInit(): void {
    const c = 0;
  }
  openDialogSwitchbotView(): void {
    const dialogRef = this.activityList.open(DSwitchbotViewComponent, {
      disableClose: true,
      minWidth: this.switchbotViewDialog.minWidth
    });
  }
}
