import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client/link/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import * as Models from '../../interface/Models'

const GET_MACHINE_LIST = gql`
  query MachineList {
    MachineViewList {
      machineName
      machineModel
      machineQR
    }
  }
`;

const GET_USER_LIST = gql`
  query WorkerList {
    WorkerViewList {
      FullName
      UserQR
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class CQrpageService {

  constructor(
    private apollo: Apollo
  ) { }

  getMachineList(): QueryRef<Models.ResponseMachineViewList> {
    return this.apollo.watchQuery<Models.ResponseMachineViewList>(
      { query: GET_MACHINE_LIST }
    );
  }

  getUserList(): QueryRef<Models.ResponseWorkerViewList> {
    return this.apollo.watchQuery<Models.ResponseWorkerViewList>(
      { query: GET_USER_LIST }
    );
  }
}
