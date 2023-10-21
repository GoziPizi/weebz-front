import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService {

  url = "https://back.weebz.fr/"

  //Login status observable
  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedIn.asObservable();

  //User id observable
  private id: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public id$ = this.id.asObservable();

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
    ) {
      this.id.next(1);
    }

  updateLoginStatus(val: boolean) {
    this.isLoggedIn.next(val);
  }

  /*
  * POST 
  * @param data : {login: string, password: string}
  * @return Observable : {key: string, created: string, expiration: string}
  */
  login(data: any): Observable<any> {
    //TODO set l'id on success
    return this.http.post(this.url + "api/v1/login", data).pipe(
      tap((res: any) => {
        let token = res.key;
        this.cookieService.set('apiToken', token);
        this.updateLoginStatus(true);
      })
    );
  }

  checkLogin(): Observable<any> {
    let headers = {Authorization : this.cookieService.get('apiToken')}
    return this.http.get(this.url + "api/v1/login/check", {headers: headers});
  }

  logout() {
    this.cookieService.set('apiToken',"");
    this.updateLoginStatus(false);
  }

  getUserData(){
    let headers = {
      Authorization : this.cookieService.get('apiToken')
    }
    console.log(headers);
    let id = this.id.getValue();
    return this.http.get(this.url + "api/v1/users/" + id, {headers: headers});
  }

  createUser(data: any): Observable<any> {
    return this.http.post(this.url + "api/v1/users/", data);
  }

  getArtWork(id: number): Observable<any> {
    return this.http.get(this.url + "api/v1/artworks/" + id);
  }

  getAllChapters(id: number): Observable<any> {
    return this.http.get(this.url + "api/v1/artworks/" + id + "/chapters");
  }

}
