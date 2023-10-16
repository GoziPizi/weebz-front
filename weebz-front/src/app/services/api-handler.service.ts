import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService {

  url = "http://13.48.192.123:8080/"
  token: string|null = null;


  constructor(
    private http: HttpClient,
    private cookieService: CookieService
    ) { }

  //Renvoie true si l'utilisateur est connecté, false sinon.
  //Fais un appel à l'api pour verifier la validité du jeton.
  get isLoggedIn() {
    const token = this.cookieService.get('apiToken');
    if(token == null) {
      return false;
    }

    if(token == "") {
      return false;
    }

    return true;
  }

  /*
  * POST 
  * @param data : {login: string, password: string}
  * @return Observable : {key: string, created: string, expiration: string}
  */
  login(data: any): Observable<any> {
    return this.http.post(this.url + "api/v1/login", data).pipe(
      tap((res: any) => {
        this.cookieService.set('apiToken', 'your_api_token_here');
      })
    );
  }

  checkLogin(): Observable<any> {
    let headers = {Authorization: "Bearer " + this.cookieService.get('apiToken')}
    return this.http.get(this.url + "api/v1/login/check", {headers: headers});
  }

  logout() {
    this.cookieService.set('apiToken',"");
  }

}
