import { Component, OnInit, Input } from '@angular/core';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { Comment } from 'src/app/utils/comments/models/comment';
import { CommentWithResponses } from 'src/app/utils/comments/models/comment-with-responses';

@Component({
  selector: 'app-comments-displayer',
  templateUrl: './comments-displayer.component.html',
  styleUrls: ['./comments-displayer.component.scss']
})
export class CommentsDisplayerComponent implements OnInit {

  //Comments array, the comments are objects with the following structure:
  // Voir trello
  @Input() comments = [];

  constructor(
    private apiHandler: ApiHandlerService
  ) { }

  ngOnInit(): void {
    this.fetchComments();
  }

  fetchComments() {
    return this.apiHandler.getComments(0).subscribe({
      next: res => {
        this.comments = res.comments;
      }
    })
  }

}
