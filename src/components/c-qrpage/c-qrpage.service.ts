import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client/link/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import * as Models from '../../interface/Models'

const GET_MACHINE_LIST = gql`
  query MachineList {
    MachineList {
      machineName
      machineModel
      machineQR
    }
  }
`;

const GET_USER_LIST = gql`
  query WorkerList {
    WorkerList {
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

  getMachineList(): QueryRef<Models.ResponseMachineList> {
    return this.apollo.watchQuery<Models.ResponseMachineList>(
      { query: GET_MACHINE_LIST }
    );
  }

  getUserList(): QueryRef<Models.ResponseWorkerList> {
    return this.apollo.watchQuery<Models.ResponseWorkerList>(
      { query: GET_USER_LIST }
    );
  }
}
