import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../shared/interfaces';
import { PostsService } from '../shared/posts.service';

@Component({
    selector: 'app-home-page',
    template: `
    <div *ngIf="posts$ | async as posts; else loader">
      <div *ngIf="posts.length; else noPosts">
        <app-post
          *ngFor="let post of posts"
          [post]="post"
        ></app-post>
      </div>
      <ng-template #noPosts>
        <p class="text-center">No posts yet. Stay tuned!</p>
      </ng-template>
    </div>

    <ng-template #loader>
      <p class="text-center">Loading posts...</p>
    </ng-template>
  `,
    styles: [`
    .text-center { text-align: center; margin-top: 2rem; }
  `]
})
export class HomePageComponent implements OnInit {
    posts$: Observable<Post[]>;

    constructor(private postsService: PostsService) { }

    ngOnInit(): void {
        this.posts$ = this.postsService.getAll();
    }
}
