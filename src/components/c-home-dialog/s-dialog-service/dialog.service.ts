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



const GET_EVENTMSG_LIST = gql`
    query EventMsgList {
      EventMsgList {
        eventMSGID
        eventMSG
      }
    }
`;
const GET_TERMINAL_LIST = gql`
  query TerminalList {
    TerminalList {
      terminalID
      terminalName
    }
  }
`;
const GET_TERMINAL_LIST_VIEW = gql`
  query TerminalListView {
    TerminalListView {
      terminalID
      terminalName
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

const GET_TERMINAL_EVENT = gql`
query TerminalEvents($filter: TerminalMsgIDFilter) {
  TerminalEvents(filter: $filter) {
    termID
    termMsgID
    termEventMsg
  }
}
`;
const GET_TERMINAL_LIST_EVENT = gql`
query TerminalListEvents($filter: TerminalMsgIDFilter) {
  TerminalListEvents(filter: $filter) {
    termID
    termMsgID
    termEventMsg
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
const CREATE_TABLET_EVENT = gql`
  mutation CreateTabletEvent($input: TabletEventsParam!) {
    createTabletEvent(input: $input)
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
    MachineViewList {
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
    WorkerViewList {
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

const UPDATE_ACCOUNT = gql`
  mutation UpdateAccount($input: UpdateAccount!) {
    updateAccount(input: $input)
}
`;

const UPDATE_PASS = gql`
  mutation UpdatePass($input: UpdatePass!) {
    updatePass(input: $input)
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

  getTerminalList(): QueryRef<Models.ResponseTerminalList> {
    return this.apollo.watchQuery<Models.ResponseTerminalList>(
      { query: GET_TERMINAL_LIST }
    );
  }

  getTerminalListView(): QueryRef<Models.ResponseTerminalListView> {
    return this.apollo.watchQuery<Models.ResponseTerminalListView>(
      { query: GET_TERMINAL_LIST_VIEW }
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

  getMachineList(): QueryRef<Models.ResponseMachineViewList> {
    return this.apollo.watchQuery<Models.ResponseMachineViewList>(
      { query: GET_MACHINE_LIST }
    );
  }

  getTerminalEvent(terminalID: number): QueryRef<Models.ResponseTerminalEvent> {
    return this.apollo.watchQuery<Models.ResponseTerminalEvent>(
      {
        query: GET_TERMINAL_EVENT ,
        variables: {
          filter: {
            termID: terminalID
          }
        }
      }
    );
  }
  getTerminalListEvent(terminalID: number): QueryRef<Models.ResponseTerminalListEvent> {
    return this.apollo.watchQuery<Models.ResponseTerminalListEvent>(
      {
        query: GET_TERMINAL_LIST_EVENT ,
        variables: {
          filter: {
            termID: terminalID
          }
        }
      }
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
  getEventmsgList(): QueryRef<Models.ResponseEventMsgList> {
    return this.apollo.watchQuery<Models.ResponseEventMsgList>(
      { query: GET_EVENTMSG_LIST }
    );
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

  getAccountList(): QueryRef<Models.ResponseWorkerViewList> {
    return this.apollo.watchQuery<Models.ResponseWorkerViewList>(
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

  updateAccount(s: Models.WorkerInfo):
    Observable<FetchResult<Models.UpdateAccountResponse>> {
    return this.apollo.mutate({
      mutation: UPDATE_ACCOUNT,
      variables: {
        input: {
          FullName: s.FullName,
          AccLvl: s.AccLvl,
          ID: s.ID
        }
      }
    });
  }
  createTabletEvent(s: Models.createTabletEvent):
    Observable<FetchResult<Models.ResponseCreateTabletEvent>> {
    return this.apollo.mutate({
      mutation: CREATE_TABLET_EVENT,
      variables: {
        input: {
          terminalID: s.terminalID,
          eventMSG: s.eventMSG
        }
      }
    });
  }

  updatePass(s: Models.WorkerInfoRegister):
    Observable<FetchResult<Models.UpdatePassResponse>> {
    return this.apollo.mutate({
      mutation: UPDATE_PASS,
      variables: {
        input: {
          ID: s.ID,
          Pass: s.pass
        }
      }
    });
  }
}
