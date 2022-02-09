import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
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

@Injectable({
  providedIn: 'root'
})
export class CQrscanService {
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
/*
  validateQRScan(QRData: string[]): QueryRef<Models.WorkerToken> {
    return this.apollo.watchQuery<Models.WorkerToken>(
      {
        query: GET_WORKERTOKEN,
        variables: {
          machineQrScan: QRData[0],
          userQrScan: QRData[1]
        }
      }
    )
  }

  checkQR(QRData: string[]): QueryRef<Models.WorkerToken> {

    return this.apollo.watchQuery<Models.WorkerToken>(
      {
        query: GET_WORKERTOKEN,
        variables: {
          machineQrScan: QRData[0],
          userQrScan: QRData[1]
        }
      }
    )
  }*/
}
