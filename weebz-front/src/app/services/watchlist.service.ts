import { Injectable } from '@angular/core';
import { Artwork } from '../models/artwork';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ApiHandlerService } from './api-handler.service';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  updateWatchlist$: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);
  visibleTimer$: Subject<number> = new Subject<number>();
  toastText$: Subject<string> = new Subject<string>();
  Artworks: Artwork[] = [];

  constructor(
    private apiHandlerService: ApiHandlerService
  ) {
    this.updateWatchlist();
  }

  updateWatchlist() {
    if(!this.apiHandlerService.getIsLoggedIn()) {
      return
    }
    this.apiHandlerService.getWatchlist().subscribe({
      next: res => {
        this.Artworks = res.watchlist;
        this.updateWatchlist$.next(undefined);
      }
    });
  }

  addArtwork(artworkId: number) {
    if(!this.apiHandlerService.getIsLoggedIn()) {
      this.toastText$.next("Vous devez être connecté pour ajouter à la watchlist");
      this.visibleTimer$.next(1000);
    }
    this.apiHandlerService.addToWatchlist(artworkId).subscribe({
      next: res => {
        this.toastText$.next("Ajouté à la watchlist");
        this.visibleTimer$.next(1000);
        this.Artworks.push(res);
        this.updateWatchlist$.next(undefined);
      }
    });
  }

  removeArtwork(artworkId: number) {
    this.apiHandlerService.removeFromWatchlist(artworkId).subscribe({
      next: res => {
        this.toastText$.next("Retiré de la watchlist");
        this.visibleTimer$.next(1000);
        this.Artworks = this.Artworks.filter(artwork => artwork.id != artworkId);
        this.updateWatchlist$.next(undefined);
      }
    });
  }

  isArtworkInWatchlist(artworkId: number): boolean {
    let result = false;
    this.Artworks.forEach(artwork => {
      if(artwork.id == artworkId) {
        result = true;
      }
    });
    return result;
  }

  getWatchlist() {
    return this.Artworks;
  }

  //getters for the watchlist
  getUpdateWatchlistObservable(): Observable<void> {
    return this.updateWatchlist$.asObservable();
  }

  //getters for the toaster
  getTimerObservable(): Observable<number> {
    return this.visibleTimer$.asObservable();
  }

  getTextObservable(): Observable<string> {
    return this.toastText$.asObservable();
  }
}
