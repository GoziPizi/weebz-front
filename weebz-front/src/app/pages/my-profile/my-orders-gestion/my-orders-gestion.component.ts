import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-my-orders-gestion',
  standalone: true,
  templateUrl: './my-orders-gestion.component.html',
  styleUrl: './my-orders-gestion.component.scss'
})
export class MyOrdersGestionComponent {
  @Input() user$: BehaviorSubject<User> = new BehaviorSubject<User>(new User());
}
