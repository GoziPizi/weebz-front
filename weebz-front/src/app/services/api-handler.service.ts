import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { LoadingServiceService } from './loading-service.service';
import { Router } from '@angular/router';
import { ProductWithQty } from '../models/productWithQty';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService {

  url = environment.api_url;
  user: any = {};
  public user$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  //Login status observable
  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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
    const token = this.cookieService.get('apiToken');
    if(token) {
      this.validateToken().subscribe({
        next: res => {
          this.updateLoginStatus(true);
        },
        error: err => {
          this.updateLoginStatus(false);
          this.loadingService.setLoadingState(false);
          this.cookieService.delete('apiToken');
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

  //Password

  forgotPassword(data: any): Observable<any> {
    return this.http.post(this.url + "api/v1/password/forgot", data);
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post(this.url + "api/v1/password/reset", data);
  }

  //Author

  getAuthorData(id: number): Observable<any> {
    return this.http.get(this.url + "api/v1/authors/" + id + "/infos");
  }

  updateAuthorData(id: number, data: any): Observable<any> {
    let headers = {Authorization : this.cookieService.get('apiToken')}
    return this.http.put(this.url + "api/v1/authors/" + id + "/profile", data, {headers: headers});
  }

  getAuthorDataFromToken(): Observable<any> {
    const header = {
      Authorization : this.cookieService.get('apiToken')
    }
    return this.http.get(this.url + "api/v1/authors/profile", {headers: header});
    // return this.http.get('/assets/fixtures/api/author.json').pipe(delay(500));
  }

  //Hardcoded function in the backend for now
  getAuthorsHomepage(): Observable<any> {
    return this.http.get(this.url + "api/v1/authors/homepage");
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

  getChapterById(id: number): Observable<any> {
    return this.http.get(this.url + "api/v1/chapters/" + id);
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

  patchArtwork(data: any, artworkId: number): Observable<any> {
    let headers = {
      Authorization : this.cookieService.get('apiToken')
    }
    let formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('type', data.type);
    formData.append('cover', data.cover);
    formData.append('background', data.background);
    return this.http.patch(this.url + "api/v1/artworks/" + artworkId, formData, {headers: headers});
  }

  postChapter(data: any, artworkId: number): Observable<any> {
    let headers = {
      Authorization : this.cookieService.get('apiToken')
    }
    let formData = new FormData();
    formData.append('title', data.title);
    formData.append('cover', data.cover);
    formData.append('index', data.index);
    return this.http.post(this.url + "api/v1/artworks/" + artworkId + "/chapters", formData, {headers: headers});
  }

  postPage(data: any, artworkId: number, chapterId: number): Observable<any> {
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

  updateProfileBackground(picture: File) {
    let headers = {
      Authorization : this.cookieService.get('apiToken')
    }

    const formData = new FormData();
    formData.append('background-picture', picture);

    return this.http.patch(this.url + "api/v1/users/profile/background-picture", formData, {headers: headers});
  }

  //shop

  getAllShops(): Observable<any> {
    return this.http.get(this.url + "api/v1/shops");
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

  getShopDataFromArtworkId(artworkId: number): Observable<any> {
    return this.http.get(this.url + "api/v1/artworks/" + artworkId + "/shop");
  }

  getSessionFromProduct(productId: number): Observable<any> {
    return this.http.get(this.url + "api/v1/products/" + productId + "/checkout-session");
  }

  getMultipleProductsSession(products: ProductWithQty[], shippingMethod: string, relayInfo?: any): Observable<any> {
    let productsIds = products.map(p => p.product.id);
    let quantities = products.map(p => p.quantity);
    let data = {
      ids: productsIds,
      quantities: quantities,
      shippingMethod: shippingMethod,
      relayInfo: relayInfo
    }
    return this.http.post(this.url + "api/v1/products/checkout-session", data);
  }

  //Comments 

  getComments(commentableId: number, commentableType: string): Observable<any> {
    if(commentableType == "artwork") {
      return this.http.get(this.url + "api/v1/artworks/" + commentableId + "/comments");
    }
    else if(commentableType == "chapter") {
      return this.http.get(this.url + "api/v1/chapters/" + commentableId + "/comments");
    }
    else if(commentableType == "product") {
      return this.http.get(this.url + "api/v1/products/" + commentableId + "/comments");
    }
    else {
      return new Observable();
    }
  }
  //postComment

  postComment(commentableId: number, commentableType: string, content: string): Observable<any> {
    let headers = {
      Authorization : this.cookieService.get('apiToken')
    }
    let data = {
      content: content
    }
    if(commentableType == "artwork") {
      return this.http.post(this.url + "api/v1/artworks/" + commentableId + "/comments", data, {headers: headers});
    }
    else if(commentableType == "chapter") {
      return this.http.post(this.url + "api/v1/chapters/" + commentableId + "/comments", data, {headers: headers});
    }
    else if(commentableType == "product") {
      return this.http.post(this.url + "api/v1/products/" + commentableId + "/comments", data, {headers: headers});
    }
    else {
      return new Observable();
    }
  }

  //deleteComment

  //replyComment

  //likeComment

  //dislikeComment

  //watchlist

  addToWatchlist(artworkId: number): Observable<any> {
    let headers = {
      Authorization : this.cookieService.get('apiToken')
    }
    return this.http.post(this.url + "api/v1/artworks/" + artworkId + "/follow", {}, {headers: headers});
  }

  removeFromWatchlist(artworkId: number): Observable<any> {
    let headers = {
      Authorization : this.cookieService.get('apiToken')
    }
    return this.http.delete(this.url + "api/v1/artworks/" + artworkId + "/follow", {headers: headers});
  }

  getWatchlist(): Observable<any> {
    let headers = {
      Authorization : this.cookieService.get('apiToken')
    }
    return this.http.get(this.url + "api/v1/users/watchlist", {headers: headers});
  }

  //search

  searchArtworks(params: any): Observable<any> {
    return this.http.get(this.url + "api/v1/search", {params: params});
  }

  //beta

  isInBeta(): Observable<any> {
    const header = {
      Authorization : this.cookieService.get('apiToken')
    }
    return this.http.get(this.url + "api/v1/beta-enroll", {headers: header});
  }

  enrollToBeta(data: any): Observable<any> {
    const header = {
      Authorization : this.cookieService.get('apiToken')
    }
    return this.http.post(this.url + "api/v1/beta-enroll", data, {headers: header});
  }

  leaveBeta(data: any): Observable<any> {
    const header = {
      Authorization : this.cookieService.get('apiToken')
    }
    return this.http.delete(this.url + "api/v1/beta-enroll", {headers: header});
  }
}
