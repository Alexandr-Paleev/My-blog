import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../interfaces';

@Component({
    selector: 'app-post',
    template: `
    <div class="card mb-4">
      <div class="card-header">
        <h2 class="post-title">{{ post.title }}</h2>
        <small>{{ post.date | date:'medium' }} by <strong>{{ post.author }}</strong></small>
      </div>
      <div class="card-body">
        <div class="post-preview" [innerHTML]="post.text | slice:0:200"></div>
        <button class="btn btn-outline-primary mt-3" [routerLink]="['/post', post.id]">Open post</button>
      </div>
    </div>
  `,
    styles: [`
    .card { border: 1px solid #eee; margin-bottom: 1.5rem; }
    .post-title { margin-bottom: 0.5rem; font-size: 1.5rem; color: #333; }
    .btn-outline-primary {
        border: 1px solid var(--primary-color);
        color: var(--primary-color);
        background: transparent;
    }
    .btn-outline-primary:hover {
        background: var(--primary-color);
        color: #fff;
    }
    .mt-3 { margin-top: 1rem; }
    .mb-4 { margin-bottom: 1.5rem; }
  `]
})
export class PostComponent implements OnInit {
    @Input() post: Post;
    constructor() { }
    ngOnInit(): void { }
}
