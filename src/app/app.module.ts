import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomePageComponent } from './home-page/home-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { PostComponent } from './shared/components/post/post.component';

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        PostPageComponent,
        MainLayoutComponent,
        PostComponent
    ],
    imports: [
        BrowserModule,
        SharedModule,
        RouterModule.forRoot([
            {
                path: '', component: MainLayoutComponent, children: [
                    { path: '', component: HomePageComponent },
                    { path: 'post/:id', component: PostPageComponent }
                ]
            },
            { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
        ])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
