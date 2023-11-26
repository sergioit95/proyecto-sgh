// articulos.component.ts

import { Component } from '@angular/core';
import { Article, SGHNewsResponse } from 'src/app/interfaces/articulos';
import { ArticulosService } from 'src/app/services/articulos/articulos.service';
import { FavoritosService } from 'src/app/services/favoritos/favoritos.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss'],
  providers: [ArticulosService], // FavoritosService se debe proveer en AppModule o en el módulo correspondiente
})
export class ArticulosComponent {
  styles = {
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'center',
    padding: '20px',
    width: '200px',
  };

  articulos: Article[] = [];

  constructor(public articuloService: ArticulosService, public favoritosService: FavoritosService) {}

  ngOnInit(): void {
    this.articuloService.getArticulos().subscribe((response: SGHNewsResponse) => {
      console.log(response);
      this.articulos = response.articles;
    });
  }

  toggleFavoriteStatus(article: Article): void {
    if (this.favoritosService.isFavorite(article)) {
      this.favoritosService.removeFromFavorites(article);
    } else {
      this.favoritosService.addToFavorites(article);
    }
  }

  getFavorites(): Article[] {
    return this.favoritosService.getFavoritesSync(); // Agrega este método en FavoritosService
  }
}
