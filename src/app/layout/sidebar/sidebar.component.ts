import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { map, Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectRole, selectUsername } from '../../pages/auth-login/store/auth-login.selectors';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  name$: Observable<String> = of('');
  role$: Observable<String> = of('');

  constructor(private authService: AuthService, private store: Store) { }

  ngOnInit(): void {
    // this.role = String(localStorage.getItem('role'));
    // this.name = String(localStorage.getItem('userName'));
    this.name$ = this.store.select(selectUsername);
    this.role$ = this.store.select(selectRole)
  }

  logout() {
    this.authService.logout();
  }

}
