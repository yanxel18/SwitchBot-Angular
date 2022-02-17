import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client/link/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import * as Models from '../../../interface/Models';

const GET_SWITCHBOT_LIST = gql`
 query Switchbot {
  SwitchBot {
    switchbotID
    switchbotName
    switchbotMac
    switchbotRaspiID
      RaspiList {
      raspiName
    }
  }
}
`;

const CREATE_SWITCHBOT = gql`
  mutation Mutation($input: SwitchbotParam!) {
    createSwitchBot(input: $input)
}
`;

const DELETE_SWITCHBOT = gql`
  mutation Mutation($input: SwitchbotDeleteParam!) {
    deleteSwitchBot(input: $input)
}
`;

const UPDATE_SWITCHBOT = gql`
  mutation Mutation($input: SwitchbotUpdateParam!) {
    updateSwitchBot(input: $input)
}
`;

const UPDATE_RASPI = gql`
  mutation Mutation($input: RaspiUpdateParam!) {
    updateRaspi(input: $input)
}
`;

const GET_RASPI_LIST = gql`
  query RaspiList {
      RaspiList {
        raspiServer
        raspiName
        raspiID
      }
  }
`;

const DELETE_RASPI = gql`
  mutation DeleteRaspi($input: RaspiDeleteParam!) {
  deleteRaspi(input: $input)
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
    });
  }
  deleteSwitchbot(id: number | undefined):
    Observable<FetchResult<Models.ReponseDeleteSwitchbot>> {
    return this.apollo.mutate({
      mutation: DELETE_SWITCHBOT,
      variables: {
        input: {
          switchbotID: id,
        }
      }
    });
  }

  updateSwitchbot(input: Models.SwitchBot):
    Observable<FetchResult<Models.ReponseUpdateSwitchbot>> {
    return this.apollo.mutate({
      mutation: UPDATE_SWITCHBOT,
      variables: {
        input
      }
    });
  }


  updateRaspi(input: Models.Raspi):
    Observable<FetchResult<Models.ReponseUpdateRaspi>> {
    return this.apollo.mutate({
      mutation: UPDATE_RASPI,
      variables: {
        input
      }
    });
  }
  getSwitchbotList(): QueryRef<Models.ResponseSwitchbotList> {
    return this.apollo.watchQuery<Models.ResponseSwitchbotList>(
      { query: GET_SWITCHBOT_LIST }
    );
  }

  getRaspiList(): QueryRef<Models.ReponseRaspiList> {
    return this.apollo.watchQuery<Models.ReponseRaspiList>(
      { query: GET_RASPI_LIST }
    );
  }

  deleteRaspi(id: number | undefined):
    Observable<FetchResult<Models.ReponseDeleteRaspi>> {
    return this.apollo.mutate({
      mutation: DELETE_RASPI,
      variables: {
        input: {
          raspiID: id
        }
      }
    });
  }
}
