import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Post } from '../shared/interfaces';
import { PostsService } from '../shared/posts.service';

@Component({
  selector: 'app-post-page',
  template: `
    <div *ngIf="post$ | async as post; else loader">
      <div class="post">
        <div class="post-header">
          <button routerLink="/" class="btn btn-link">Back to home</button>
          <h1>{{ post.title }}</h1>
          <div class="post-info">
            <strong>{{ post.author }}</strong>
            <small>{{ post.date | date:'medium' }}</small>
          </div>
        </div>
        <div class="post-content ql-editor" [innerHTML]="post.text"></div>
      </div>
    </div>

    <ng-template #loader>
      <p class="text-center">Loading post...</p>
    </ng-template>
  `,
  styles: [`
    .post { background: #fff; padding: 2rem; border-radius: 4px; border: 1px solid #ddd; }
    .post-header { margin-bottom: 2rem; border-bottom: 1px solid #eee; padding-bottom: 1rem; }
    .post-header h1 { margin-top: 1rem; color: #333; }
    .post-info { color: #888; display: flex; gap: 1rem; align-items: center; }
    .post-content { line-height: 1.6; }
    .btn-link { padding-left: 0; color: var(--primary-color); text-decoration: none; }
    .btn-link:hover { text-decoration: underline; }
    .text-center { text-align: center; margin-top: 2rem; }
  `]
})
export class PostPageComponent implements OnInit {
  post$: Observable<Post>;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.post$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postsService.getById(params.id);
      })
    );
  }
}
