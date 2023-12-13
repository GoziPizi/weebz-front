import { Component, OnInit, Input } from '@angular/core';
import { ApiHandlerService } from 'src/app/services/api-handler.service';

@Component({
  selector: 'app-comments-displayer',
  templateUrl: './comments-displayer.component.html',
  styleUrls: ['./comments-displayer.component.scss']
})
export class CommentsDisplayerComponent implements OnInit {

  //Comments array, the comments are objects with the following structure:
  // Voir trello
  @Input() comments = {
    comments: [{
      username: "",
      comment: "",
      timestamp: ""
    }]
  }

  constructor(
    private apiHandler: ApiHandlerService
  ) { }

  ngOnInit(): void {
    this.fetchComments();
  }

  fetchComments() {
    return this.apiHandler.getComments(0).subscribe({
      next: res => {
        this.comments = res;
        console.log(res);
      }
    })
  }

}
