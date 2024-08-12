import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  name: String = '';
  role: String = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.role = String(localStorage.getItem('role'));
    this.name = String(localStorage.getItem('userName'));
  }

  logout() {
    this.authService.logout();
  }

}
