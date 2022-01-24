import { CEventsService } from './c-events.service';
import { Component, OnInit } from '@angular/core';
import * as Models from '../../interface/Models';
import { Subscription, Observable, map } from 'rxjs';
@Component({
  selector: 'app-c-events',
  templateUrl: './c-events.component.html',
  styleUrls: ['./c-events.component.sass'],
  providers: [CEventsService]
})
export class CEventsComponent implements OnInit {

  subscription: Subscription[] = [];
  eventMsgs$?: Observable<Models.EMessages[]>;
  constructor(
    private ceventservice: CEventsService

  ) { }
  selected?: number;
  ngOnInit(): void {
    this.initializeMessages();
  }
  errorSelect(ErrorId: number): void {

  }
  initializeMessages(): void {

        this.eventMsgs$ = this.ceventservice.getEventMessages()
        .valueChanges.pipe(map(({data}) => {
          return  data.EventMsg ? data.EventMsg.messages : []
        }));

  }
}
