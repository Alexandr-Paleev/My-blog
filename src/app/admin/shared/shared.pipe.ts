import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchPosts'
})
export class SearchPipe implements PipeTransform {
    transform(posts: any[], search: string = ''): any[] {
        if (!posts) {
            return [];
        }
        if (!search.trim()) {
            return posts;
        }
        return posts.filter(post => {
            return post.title.toLowerCase().includes(search.toLowerCase());
        });
    }
}
