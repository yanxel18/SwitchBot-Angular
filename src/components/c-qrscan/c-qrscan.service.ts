import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';

const GET_TOKEN = gql`
  query Query {
    WorkerToken
}
`;

const GET_WORKERTOKEN = gql`
  query Query($machineQrScan: String!, $userQrScan: String!) {
    WorkerToken(machineQRScan: $machineQrScan, userQRScan: $userQrScan)
  }
`;
interface query {
  WorkerToken: string
}

interface isMachine {
  isMachineQR: boolean
}
@Injectable({
  providedIn: 'root'
})
export class CQrscanService {
  constructor(
    private apollo: Apollo
  ) { }

  validateQRScan(QRData: string[]): QueryRef<query> {
    return this.apollo.watchQuery<query>(
      {
        query: GET_WORKERTOKEN,
        variables: {
          machineQrScan: QRData[0],
          userQrScan: QRData[1]
        }
      }
    )
  }

  checkQR(QRData: string[]): QueryRef<query> {

    return this.apollo.watchQuery<query>(
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
