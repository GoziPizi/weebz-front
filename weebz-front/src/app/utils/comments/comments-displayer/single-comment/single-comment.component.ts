import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-single-comment',
  templateUrl: './single-comment.component.html',
  styleUrls: ['./single-comment.component.scss']
})
export class SingleCommentComponent implements OnInit {

  @Input() content: string = "lorem ipsum";
  @Input() author: string = "Surname";
  @Input() date: string = "01/01/2020";

  constructor() { }

  ngOnInit(): void {
  }

}
