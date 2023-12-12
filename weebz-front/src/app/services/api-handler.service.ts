import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { LoadingServiceService } from './loading-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService {

  url = "https://back-dev.weebz.fr/"
  user: any = {};
  public user$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  //Login status observable
  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedIn.asObservable();

  //User id observable
  private id: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public id$ = this.id.asObservable();

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private loadingService: LoadingServiceService,
    private router: Router
    ) {
      this.initilize();
    }

  initilize() {
    this.updateLoginStatus(false);
    const token = this.cookieService.get('apiToken');
    if(token) {
      this.validateToken().subscribe({
        error: err => {
          this.updateLoginStatus(false);
          this.loadingService.setLoadingState(false);
          //this.router.navigate(['/connexion']);
        }
      })
    }
  }

  login(data: any): Observable<any> {
    return this.http.post(this.url + "api/v1/login", data).pipe(
      tap((res: any) => {
        let token = res.key;
        this.setTokenCookie(token);
        this.fetchUserData().subscribe(
          res => {
            this.loadingService.setLoadingState(false);
          },
          err => {
            this.user = {};
            this.isLoggedIn.next(false);
          }
        );
      })
    );
  }

  validateToken() {
    const header = {
      Authorization : this.cookieService.get('apiToken')
    }
    return this.http.get(this.url + "api/v1/login/check", {headers: header}).pipe(
      tap((res: any) => {
        this.updateLoginStatus(true);
      })
    );
  }

  fetchUserData() {
    const header = {
      Authorization : this.cookieService.get('apiToken')
    }
    return this.http.get(this.url + "api/v1/users/profile", {headers: header}).pipe(
      tap((res: any) => {
        this.user = res;
        this.user$.next(res);
        this.id.next(res.id);
      })
    );
  }

  getUser() {
    return this.user;
  }

  setTokenCookie(token: string) {
    const expiration = new Date();
    expiration.setDate(expiration.getDate() + 5);
    this.cookieService.set('apiToken', token, expiration);
    this.updateLoginStatus(true);
  }

  register(data: any): Observable<any> {
    const { confirm_password, ...dataToSend } = data;
    let data_to_send = {
      user: {
        ...dataToSend
      }
    }
    return this.http.post(this.url + "api/v1/users/", data_to_send);
  }

  updateLoginStatus(val: boolean) {
    this.isLoggedIn.next(val);
  }

  checkLogin(): Observable<any> {
    let headers = {Authorization : this.cookieService.get('apiToken')}
    return this.http.get(this.url + "api/v1/login/check", {headers: headers});
  }

  logout() {
    this.cookieService.set('apiToken',"");
    this.updateLoginStatus(false);
    this.loadingService.setLoadingState(true);
    setTimeout(() => {
      this.loadingService.setLoadingState(false);
      this.router.navigate(['/accueil']);
    }, 500);
  }

  createUser(data: any): Observable<any> {
    return this.http.post(this.url + "api/v1/users/", data);
  }

  //Get an author from his author_id
  getAuthorData(id: number): Observable<any> {
    return this.http.get(this.url + "api/v1/authors/" + id);
  }

  getAuthorDataFromToken(): Observable<any> {
    // const header = {
    //   Authorization : this.cookieService.get('apiToken')
    // }
    // return this.http.get(this.url + "api/v1/authors/profile", {headers: header});
    //TODO fake data
    return this.http.get('/assets/fixtures/api/data_get_author_data_from_token.json').pipe(
      delay(500)
    );
  }

  getArtwork(id: number): Observable<any> {
    return this.http.get(this.url + "api/v1/artworks/" + id);
  }

  getAuthorArtworks(id: number): Observable<any> {
    return this.http.get(this.url + "api/v1/authors/" + id + "/artworks");
  }

  getAllChapters(id: number): Observable<any> {
    return this.http.get(this.url + "api/v1/artworks/" + id + "/chapters");
  }

  getArtworksByType(type:string, max_items?:number): Observable<any> {
    let data:any = {};
    if(max_items) {
      data = {
        ...data,
        max_items: max_items
      }
    }
    return this.http.get(this.url + "api/v1/artworks/types/"+type, {params: data});
  }

  getAllChaptersByArtworkId(id: number): Observable<any> {
    return this.http.get(this.url + "api/v1/artworks/" + id + "/chapters");
  }

  getIsLoggedIn() {
    return this.isLoggedIn.getValue();
  }

  getPages(artworkId: number, chapter: number): Observable<any> {
    return this.http.get(this.url + "api/v1/artworks/" + artworkId + "/chapters/" + chapter + "/pages");
  }

  /**
   * 
   * @param data : {title: string, description: string, type: string, cover: File, background: File}
   * type : MANGA, WEBTOON, LIGHTNOVEL
   */
  postArtwork(data: any): Observable<any> {
    let headers = {
      Authorization : this.cookieService.get('apiToken')
    }
    let formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('type', data.type);
    formData.append('cover', data.cover);
    formData.append('background', data.background);
    return this.http.post(this.url + "api/v1/artworks", formData, {headers: headers});
  }

  postChapter(data: any, artworkId: number): Observable<any> {
    let headers = {
      Authorization : this.cookieService.get('apiToken')
    }
    let formData = new FormData();
    formData.append('title', data.title);
    formData.append('cover', data.cover);
    formData.append('index', data.index);
    //TODO refaire apres le reroute
    return this.http.post(this.url + "api/v1/artworks/" + artworkId + "/chapters", formData, {headers: headers});
  }

  postPage(data: any, artworkId: number, chapterId: number): Observable<any> {
    //TODO refaire apres le reroute
    let headers = {
      Authorization : this.cookieService.get('apiToken')
    }
    let formData = new FormData();
    formData.append('page', data.page);
    formData.append('index', data.index);
    return this.http.post(this.url + "api/v1/artworks/" + artworkId + "/chapters/" + chapterId + "/pages/", formData, {headers: headers});
  }

  updateProfilePicture(picture: File) {
    let headers = {
      Authorization : this.cookieService.get('apiToken')
    }

    const formData = new FormData();
    formData.append('profile-picture', picture);

    return this.http.patch(this.url + "api/v1/users/profile/profile-picture", formData, {headers: headers});
  }

  getShopData(shopId: number): Observable<any> {
    return this.http.get(this.url + "api/v1/shops/" + shopId);
  }

  getProductData(productId: number): Observable<any> {
    return this.http.get(this.url + "api/v1/products/" + productId);
  }

  getShopsFromAuthor(authorId: number): Observable<any> {
    return this.http.get(this.url + "api/v1/authors/" + authorId + "/shops");
  }
}
