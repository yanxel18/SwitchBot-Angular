import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import * as Models from '../../interface/Models'

const GET_EVENTMSGS = gql`
  query Query {
    EventMsg {
      messages {
        eventMSGID
        eventMSG
      }
      error {
        message
      }
    }
  }
`;


@Injectable({
  providedIn: 'root'
})
export class CEventsService {

  constructor(
    private apollo: Apollo
  ) { }

  getEventMessages(): QueryRef<Models.EventMessages> {
    return this.apollo.watchQuery<Models.EventMessages>(
      { query: GET_EVENTMSGS }
    )
  }
}
