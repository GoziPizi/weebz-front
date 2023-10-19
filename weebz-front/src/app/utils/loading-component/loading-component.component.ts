import { Component, OnInit } from '@angular/core';
import { LoadingServiceService } from 'src/app/services/loading-service.service';

@Component({
  selector: 'app-loading-component',
  templateUrl: './loading-component.component.html',
  styleUrls: ['./loading-component.component.scss']
})
export class LoadingComponentComponent implements OnInit {

  loading: boolean = false;

  constructor(
    public loading_service: LoadingServiceService
  ) { }

  ngOnInit(): void {
  }

}
