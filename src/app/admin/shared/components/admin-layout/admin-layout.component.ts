import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  template: `
    <nav class="navbar">
      <h1 class="brand" routerLink="/admin/dashboard">MyBlog Admin</h1>
      <ul>
        <li routerLinkActive="active"><a routerLink="/admin/dashboard">Dashboard</a></li>
        <li routerLinkActive="active"><a routerLink="/admin/create">Create</a></li>
        <li><a href="#" (click)="logout($event)">Logout</a></li>
      </ul>
    </nav>
    <div class="container">
      <app-alert></app-alert>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background-color: var(--primary-light, #ef5350);
      color: #fff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .brand {
      font-size: 1.5rem;
      font-weight: 500;
      cursor: pointer;
    }
    ul { list-style: none; margin: 0; padding: 0; display: flex; }
    li { margin-left: 20px; }
    li.active a { opacity: 1; font-weight: bold; border-bottom: 2px solid white; }
    a { color: #fff; text-decoration: none; opacity: 0.8; transition: opacity 0.2s; padding-bottom: 2px; }
    a:hover { opacity: 1; }
    .container { padding: 2rem 0; }
  `]
})
export class AdminLayoutComponent implements OnInit {

  constructor(
    private router: Router,
    public auth: AuthService
  ) { }

  ngOnInit() {
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/admin', 'login']);
  }
}
