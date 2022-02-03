import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client/link/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import * as Models from '../../interface/Models'

const GET_EVENTMSGS = gql`
  query Query {
    EventMsg {
      messages {
        eventMSGID
        eventMSG
      }
    }
  }
`;

const SEND_EVENT = gql`
  mutation CreateEventLogs($input: EventParam!) {
  createEventLogs(input: $input)
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
  sendEvent(msgID: number): Observable<FetchResult<Models.CreateEventLogs>> {
    return this.apollo.mutate({
      mutation: SEND_EVENT,
      variables: {
        input: {
          msgID
        }
      }
    })
  }
}
