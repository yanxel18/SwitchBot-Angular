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

const GET_SWITCHBOT_FOR_MACHINELIST = gql`
  query SwitchBot($filter: SwitchbotFilter) {
    SwitchBot(filter: $filter) {
      switchbotName
      switchbotID
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
const CREATE_RASPI = gql`
  mutation Mutation($input: RaspiCreateParam!) {
    createRaspi(input: $input)
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

const GET_MACHINE_LIST = gql`
  query MachineList {
    MachineList {
      machineID
      machineName
      machineModel
      machineSwitchbotID
      machineQR
    }
  }
`;

const DELETE_RASPI = gql`
  mutation DeleteRaspi($input: RaspiDeleteParam!) {
  deleteRaspi(input: $input)
}

`;

const UPDATE_MACHINE = gql`
  mutation UpdateMachine($input: MachineUpdateParam!) {
    updateMachine(input: $input)
}
`;

const CREATE_MACHINE = gql`
  mutation CreateMachine($input: MachineCreateParam!) {
  createMachine(input: $input)
}
`;

const DELETE_MACHINE = gql`
  mutation DeleteMachine($input: MachineDeleteParam!) {
  deleteMachine(input: $input)
}
`;

const GET_ACCOUNT_LIST = gql`
  query WorkerList {
    WorkerList {
      ID
      FullName
      AccLvl
      GIDFull
    }
  }
`;

const GET_ACCOUNT_TYPE = gql`
  query AccountType {
    AccountType {
      acclvlID
      accType
    }
  }
`;

const CREATE_ACCOUNT = gql`
  mutation Mutation($input: CreateAccount!) {
  createAccount(input: $input)
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
  createRaspi(s: Models.Raspi):
    Observable<FetchResult<Models.ResponseCreateRaspi>> {
    return this.apollo.mutate({
      mutation: CREATE_RASPI,
      variables: {
        input: {
          raspiName: s.raspiName,
          raspiServer: s.raspiServer
        }
      }
    });
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

  getMachineList(): QueryRef<Models.ResponseMachineList> {
    return this.apollo.watchQuery<Models.ResponseMachineList>(
      { query: GET_MACHINE_LIST }
    );
  }
  getMachineSwitchbotList(): QueryRef<Models.ResponseSwitchbotList> {
    return this.apollo.watchQuery<Models.ResponseSwitchbotList>(
      {
        query: GET_SWITCHBOT_FOR_MACHINELIST,
        variables: {
          filter: {
            switchbotRaspiIDisNull: true
          }
        }
      }
    );
  }

  updateMachine(input: Models.MachineListView):
    Observable<FetchResult<Models.ResponseUpdateMachine>> {
    return this.apollo.mutate({
      mutation: UPDATE_MACHINE,
      variables: {
        input: {
          machineID: input.machineID,
          machineName: input.machineName,
          machineModel: input.machineModel,
          machineSwitchbotID: input.machineSwitchbotID
        }
      }
    });
  }

  createMachine(s: Models.MachineListView):
    Observable<FetchResult<Models.ResponseCreateMachine>> {
    return this.apollo.mutate({
      mutation: CREATE_MACHINE,
      variables: {
        input: {
          machineName: s.machineName,
          machineModel: s.machineModel
        }
      }
    });
  }

  deleteMachine(id: number | undefined):
    Observable<FetchResult<Models.ResponseDeleteMachine>> {
    return this.apollo.mutate({
      mutation: DELETE_MACHINE,
      variables: {
        input: {
          machineID: id,
        }
      }
    });
  }

  getAccountList(): QueryRef<Models.ResponseWorkerList> {
    return this.apollo.watchQuery<Models.ResponseWorkerList>(
      { query: GET_ACCOUNT_LIST }
    );
  }

  getAccountTypeList(): QueryRef<Models.ResponseAccountTypeList> {
    return this.apollo.watchQuery<Models.ResponseAccountTypeList>(
      { query: GET_ACCOUNT_TYPE }
    );
  }

  createAccount(s: Models.WorkerInfoRegister):
    Observable<FetchResult<Models.CreateAccountResponse>> {
    return this.apollo.mutate({
      mutation: CREATE_ACCOUNT,
      variables: {
        input: {
          FullName: s.FullName,
          AccLvl: s.AccLvl,
          GIDFull: s.GIDFull,
          Pass: s.pass
        }
      }
    });
  }
}
