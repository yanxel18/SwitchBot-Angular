import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';

const GET_TOKEN = gql`
  query Query {
    WorkerToken
}
`;

const GET_ISMACHINE = gql`
  query Query($machineQrScan: String!) {
    isMachineQR(machineQRScan: $machineQrScan)
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

  validateQRScan(): QueryRef<query> {
    return this.apollo.watchQuery<query>(
      {
        query: GET_TOKEN
      }
    )
  }

  checkQR(machineQR: string): QueryRef<isMachine>{
    return this.apollo.watchQuery<isMachine>(
      {
        query: GET_ISMACHINE,
        variables: {
          machineQrScan: machineQR
        }
      }
    )
  }
}
