import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL = 'http://localhost:9090/';
  private requestHeader = new HttpHeaders(
    { "No-Auth": "True" }
  )
  constructor(private httpClient:HttpClient, private userAuthService:UserAuthService) { }

  public login(loginData:any){
    return this.httpClient.post(this.BASE_URL + 'authenticate', loginData, {headers: this.requestHeader});
  }

  public forUser(){
    return this.httpClient.get(this.BASE_URL + 'for-user', { responseType: 'text' });
  }

  public forAdmin(){
    return this.httpClient.get(this.BASE_URL + 'for-admin', { responseType: 'text' });
  }

  public forAll(){
    return this.httpClient.get(this.BASE_URL + 'for-all', { responseType: 'text' });
  }

  public roleMatch(allowedRoles):boolean{
    const userRoles:any = this.userAuthService.getRoles();
    if (userRoles) {
      for (let index = 0; index < userRoles.length; index++) {
        for (let i = 0; i < allowedRoles.length; i++) {
          if (userRoles[index].roleName === allowedRoles[i]) {
            return true
          }
        }
      }
    }
    return false;
  }
}
