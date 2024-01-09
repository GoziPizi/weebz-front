import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { LoadingServiceService } from 'src/app/services/loading-service.service';

@Component({
  selector: 'app-comment-input',
  templateUrl: './comment-input.component.html',
  styleUrls: ['./comment-input.component.scss']
})
export class CommentInputComponent implements OnInit {

  @Input() commentableId: number = 0;
  @Input() commentableType: string = "";

  @Input() reInitSubject: Subject<void> = new Subject<void>();

  isConnected: boolean = false;
  commentContent: string = "";

  constructor(
    private apiHandler: ApiHandlerService,
    private loadingService: LoadingServiceService
  ) {
    this.isConnected = this.apiHandler.getIsLoggedIn();
  }

  ngOnInit(): void {
  }

  submitComment() {
    this.loadingService.setLoadingState(true);
    if(this.commentContent.length > 0) {
      this.apiHandler.postComment(this.commentableId, this.commentableType, this.commentContent).subscribe({
        next: res => {
          this.commentContent = "";
          this.reInitSubject.next(undefined);
          this.loadingService.setLoadingState(false);
        }
      })
    }
  }

}
