import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client/link/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import * as Models from '../../../interface/Models'
const GET_SWITCHBOT_LIST = gql`
 query Switchbot {
  SwitchBot {
    switchbotID
    switchbotName
    switchbotMac
    switchbotRaspiID
  }
}
`;

const CREATE_SWITCHBOT = gql`
  mutation Mutation($input: SwitchbotParam!) {
  createSwitchBot(input: $input)
}
`;
@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private apollo: Apollo) { }
  createSwitchbot(s: Models.CreateSwitchBotForm):
    Observable<FetchResult<Models.ResponseCreateSwitchBot>> {
    return this.apollo.mutate({
      mutation: CREATE_SWITCHBOT,
      variables: {
        input: {
          switchbotName: s.switchbotTxt,
          switchbotMac: s.macAddressTxt
        }
      }
    })
  }

  getSwitchbotList(): QueryRef<Models.ResponseSwitchbotList> {
    return this.apollo.watchQuery<Models.ResponseSwitchbotList>(
      { query: GET_SWITCHBOT_LIST }
    )
  }
}
