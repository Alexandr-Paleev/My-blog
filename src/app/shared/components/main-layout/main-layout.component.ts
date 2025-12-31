import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../admin/shared/services/auth.service';

@Component({
  selector: 'app-main-layout',
  template: `
    <nav class="navbar">
      <div class="header-content">
        <h1 class="brand" routerLink="/">My Blog</h1>
        <ul>
          <li routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
            <a routerLink="/">Home</a>
          </li>
          <li routerLinkActive="active">
            <a [routerLink]="auth.isAuthenticated() ? '/admin' : '/admin/login'">
                {{ auth.isAuthenticated() ? 'Admin' : 'Login' }}
            </a>
          </li>
          <li *ngIf="auth.isAuthenticated()">
            <a href="#" (click)="logout($event)">Logout</a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container pb-5">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .navbar {
      background-color: #fff;
      border-bottom: 1px solid #ddd;
      padding: 1rem 0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      margin-bottom: 2rem;
    }
    .header-content {
      max-width: 1000px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .brand {
      margin: 0;
      font-size: 1.5rem;
      cursor: pointer;
      color: #333;
    }
    ul { list-style: none; margin: 0; padding: 0; display: flex; }
    li { margin-left: 20px; }
    li.active a { color: var(--primary-color); font-weight: bold; }
    a { color: #666; text-decoration: none; transition: color 0.2s; cursor: pointer; }
    a:hover { color: var(--primary-color); }
    .pb-5 { padding-bottom: 3rem; }
  `]
})
export class MainLayoutComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private router: Router
  ) { }
  ngOnInit(): void { }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
