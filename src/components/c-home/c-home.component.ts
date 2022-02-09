import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DSwitchbotRegComponent } from '../c-home-dialog/d-switchbot-reg/d-switchbot-reg.component';

const switchbotRegDialog  = {
  minWidth: '320px',
  maxWidth: '825px',
};
@Component({
  selector: 'app-c-home',
  templateUrl: './c-home.component.html',
  styleUrls: ['./c-home.component.sass']
})
export class CHomeComponent implements OnInit {

  constructor(
    private activityList: MatDialog,
  ) { }

  ngOnInit(): void {
    const c = 0;
  }
  openDialogUpdatePass(): void {
    const dialogRef = this.activityList.open(DSwitchbotRegComponent, {
      disableClose: true,
      minWidth: switchbotRegDialog.minWidth
    });

  }
}
