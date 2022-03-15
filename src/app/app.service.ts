import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client/link/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import * as Models from '../interface/Models'

const GET_ACCOUNTINFO = gql`
  query AccountInfo {
    AccountInfo {
      ID
      FullName
      AccLvl
      GIDFull
    }
  }
`;
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private apollo: Apollo
  ) { }

  getAccountInfo(): QueryRef<Models.AccountInfoResponse> {
    return this.apollo.watchQuery<Models.AccountInfoResponse>(
      { query: GET_ACCOUNTINFO }
    );
  }

}
