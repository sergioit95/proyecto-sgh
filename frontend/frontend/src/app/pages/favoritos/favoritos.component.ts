import { Component, Input, OnInit } from '@angular/core';
import { FavoritosService } from '../../services/favoritos/favoritos.service';
import { Article } from 'src/app/interfaces/articulos';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss']
})

export class FavoritosComponent implements OnInit {
  @Input()favoritos: Article[] = [];

  constructor(public favoritosService: FavoritosService) {}

  ngOnInit(): void {
    this.favoritosService.getFavorites().subscribe((favoritos) => {
      this.favoritos = favoritos;
    });
  }
}