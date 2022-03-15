import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client/link/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import * as Models from '../../interface/Models'

const SIGN_IN = gql`
  mutation AccessInfo($input: LoginParam) {
    accessInfo(input: $input) {
      UserInfo {
        ID
        FullName
        AccLvl
        GIDFull
      }
      Noket
    }
  }
`;
@Injectable({
  providedIn: 'root'
})
export class CLoginService {
  constructor(
    private apollo: Apollo
  ) { }

  loginUser(userinfo: Models.LoginInfo): Observable<FetchResult<Models.AccessInfo>> {
    return this.apollo.mutate({
      mutation: SIGN_IN,
      variables: {
        input: {
          GIDFull: userinfo.GIDFull,
          Pass: userinfo.Pass
        }
      }
    })
  }
}
