import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client/core';
import { Apollo, gql, QueryRef} from 'apollo-angular';
import { Observable } from 'rxjs';
import * as Models from '../../interface/Models'

const GET_WORKERTOKEN = gql`
  mutation WorkerToken($machineQrScan: String!, $userQrScan: String!) {
  WorkerToken(machineQRScan: $machineQrScan, userQRScan: $userQrScan) {
    Noket
    ScanInfo {
      machineID
      machineName
      UInfo {
        ID
        FullName
        GIDFull
        AccLvl
      }
    }
  }
}
`;

const GET_WORKERSELECT = gql`
    query WorkerSelect {
      WorkerSelect {
        FullName
        UserQR
      }
    }
`;
@Injectable({
  providedIn: 'root'
})
export class CWorkerselectService {
  constructor(
    private apollo: Apollo
  ) { }

  checkQRdata(QRData: string[]): Observable<FetchResult<Models.WorkerToken>> {
    return this.apollo.mutate({
      mutation: GET_WORKERTOKEN,
      variables: {
        userQrScan: QRData[0],
        machineQrScan: QRData[1]
      }
    })
  }

  getworkerSelect(): QueryRef<Models.ResponseWorkerSelect>{
    return this.apollo.watchQuery<Models.ResponseWorkerSelect>({
      query: GET_WORKERSELECT
    })
  }
}
