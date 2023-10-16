import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService {

  url = "http://13.48.192.123:8080/"
  token: string|null = null;


  constructor(private http: HttpClient) { }

  get isLoggedIn() {
    if(this.token == null) {
      return false;
    }

    //TODO : Verifier si un jeton est valide.

    return true;
  }

  /*
  * POST 
  * @param data : {login: string, password: string}
  * @return Observable : {key: string, created: string, expiration: string}
  */
  login(data: any) {
    let Observable = this.http.post("/api/v1/login", data);
    Observable.subscribe((res: any) => {
      this.token = res.key;
    });
    return Observable;
  }
}
