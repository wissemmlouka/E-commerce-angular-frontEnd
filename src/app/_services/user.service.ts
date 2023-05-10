import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  PATH_OF_API = 'http://localhost:8083';
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  constructor(
    private httpClient: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  public register(registerData: any) {
    return this.httpClient.post(
      this.PATH_OF_API + '/registerNewUser',
      registerData
    );
  }

  public login(loginData: any) {
    return this.httpClient.post(this.PATH_OF_API + '/authenticate', loginData, {
      headers: this.requestHeader,
    });
  }

  public forUser() {
    return this.httpClient.get(this.PATH_OF_API + '/forUser', {
      responseType: 'text',
    });
  }

  public forAdmin() {
    return this.httpClient.get(this.PATH_OF_API + '/forAdmin', {
      responseType: 'text',
    });
  }

  public roleMatch(allowedRoles: any[]): boolean {
    let isMatch = false;
    const roles: any = this.userAuthService.getRoles();
    if (roles != null && roles) {
      let test = true;
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].roleName !== allowedRoles[i]) {
          test = false;
        }
      }
      isMatch = test;
    }
    return isMatch;
  }

  /*public roleMatch(allowedRoles: any): any {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
  }*/
}
