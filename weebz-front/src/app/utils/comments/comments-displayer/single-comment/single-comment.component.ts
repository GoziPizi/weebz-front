import { Component, OnInit, Input } from '@angular/core';
import { CommentWithResponses } from '../../models/comment-with-responses';

@Component({
  selector: 'app-single-comment',
  templateUrl: './single-comment.component.html',
  styleUrls: ['./single-comment.component.scss']
})
export class SingleCommentComponent implements OnInit {

  @Input() comment: CommentWithResponses = new CommentWithResponses();
  repliesDisplayed: boolean = false;
  constructor() {}

  ngOnInit(): void {
  }

  displayResponses() {
    this.repliesDisplayed = !this.repliesDisplayed;
  }

  get hasResponses() {
    return this.comment.replies.length > 0;
  }
}
