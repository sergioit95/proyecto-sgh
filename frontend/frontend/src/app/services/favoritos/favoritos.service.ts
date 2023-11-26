// favoritos.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Article } from 'src/app/interfaces/articulos';

@Injectable({
  providedIn: 'root',
})
export class FavoritosService {
  private favoriteArticles: Article[] = [];
  private favoriteArticlesSubject = new BehaviorSubject<Article[]>([]);

  addToFavorites(article: Article): void {
    if (!this.isFavorite(article)) {
      this.favoriteArticles.push(article);
      this.emitFavorites();
    }
  }

  removeFromFavorites(article: Article): void {
    const index = this.favoriteArticles.findIndex((favArticle) => favArticle.title === article.title);
    if (index !== -1) {
      this.favoriteArticles.splice(index, 1);
      this.emitFavorites();
    }
  }

  isFavorite(article: Article): boolean {
    return this.favoriteArticles.some((favArticle) => favArticle.title === article.title);
  }

  getFavorites(): Observable<Article[]> {
    return this.favoriteArticlesSubject.asObservable();
  }

  private emitFavorites(): void {
    this.favoriteArticlesSubject.next([...this.favoriteArticles]);
  }


  getFavoritesSync(): Article[] {
   return this.favoriteArticles; // Devuelve la lista actual de favoritos
  }

}
