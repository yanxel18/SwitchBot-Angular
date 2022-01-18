import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import * as Models from '../../interface/Models'

const GET_WORKERTOKEN = gql`
  query Query($machineQrScan: String!, $userQrScan: String!) {
  WorkerToken(machineQRScan: $machineQrScan, userQRScan: $userQrScan) {
    Noket
    error {
      message
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
  }
}
