import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-my-account-gestion',
  templateUrl: './my-account-gestion.component.html',
  styleUrls: ['./my-account-gestion.component.scss']
})
export class MyAccountGestionComponent implements OnInit {

  constructor() { }

  @Input() user$: BehaviorSubject<User> = new BehaviorSubject<User>(new User());
  user: User = new User();

  ngOnInit(): void {
    this.user$.subscribe({
      next: (res: any) => {
        this.user = res;
      }
    });
  }

}
