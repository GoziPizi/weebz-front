import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-my-shops-gestion',
  standalone: true,
  templateUrl: './my-shops-gestion.component.html',
  styleUrls: ['./my-shops-gestion.component.scss']
})
export class MyShopsGestionComponent implements OnInit {

  @Input() user$: BehaviorSubject<User> = new BehaviorSubject<User>(new User());
  user: User = new User();

  constructor() { }

  ngOnInit(): void {
  }

}
