import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingServiceService {

  loading: boolean = false;

  constructor() { }

  setLoadingState(state: boolean){
    this.loading = state;
  }
}
