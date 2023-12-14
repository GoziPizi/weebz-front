import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-single-response',
  templateUrl: './single-response.component.html',
  styleUrls: ['./single-response.component.scss']
})
export class SingleResponseComponent implements OnInit {

  @Input() comment: Comment = new Comment();
  constructor() { }

  ngOnInit(): void {
  }

}
