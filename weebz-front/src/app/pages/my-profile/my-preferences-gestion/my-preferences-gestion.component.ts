import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-my-preferences-gestion',
  standalone: true,
  templateUrl: './my-preferences-gestion.component.html',
  styleUrl: './my-preferences-gestion.component.scss'
})
export class MyPreferencesGestionComponent {

  @Input() user$: BehaviorSubject<User> = new BehaviorSubject<User>(new User());

}
