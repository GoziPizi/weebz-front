import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { LoadingServiceService } from 'src/app/services/loading-service.service';
import { CommentInputComponent } from '../comment-input/comment-input.component';
import { CommonModule } from '@angular/common';
import { SingleCommentComponent } from './single-comment/single-comment.component';

@Component({
  selector: 'app-comments-displayer',
  standalone: true,
  imports: [CommonModule, CommentInputComponent, SingleCommentComponent],
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
