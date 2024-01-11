import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { LoadingServiceService } from 'src/app/services/loading-service.service';

@Component({
  selector: 'app-comments-displayer',
  templateUrl: './comments-displayer.component.html',
  styleUrls: ['./comments-displayer.component.scss']
})
export class CommentsDisplayerComponent implements OnInit {

  @Input() commentableId: number = 0;
  @Input() commentableType: string = "";
  
  reInitSubject: Subject<void> = new Subject<void>();

  //Comments array, the comments are objects with the following structure:
  // Voir trello
  comments = [];

  constructor(
    private apiHandler: ApiHandlerService,
    private loadingService: LoadingServiceService
  ) { }

  ngOnInit(): void {
    console.log("commentableId: ", this.commentableId);
    console.log("commentableType: ", this.commentableType);
    console.log("fetching comments")
    this.fetchComments();
    this.reInitSubject.subscribe({
      next: () => {
        this.fetchComments();
      }
    })
  }

  fetchComments() {
    this.loadingService.setLoadingState(true);
    return this.apiHandler.getComments(this.commentableId, this.commentableType).subscribe({
      next: res => {
        this.comments = res.comments;
        this.sortComments();
        this.loadingService.setLoadingState(false);
      },
      error: err => {
        this.loadingService.setLoadingState(false);
      }
    })
  }

  sortComments() {
    this.comments.sort((a: any, b: any) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
  }

}
