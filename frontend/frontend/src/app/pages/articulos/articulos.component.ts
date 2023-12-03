// articulos.component.ts

import { Component } from '@angular/core';
import { Articulo,  } from 'src/app/interfaces/articulos';
import { ArticulosService } from 'src/app/services/articulos/articulos.service';

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

  articulos?: Articulo[];
  constructor(public articuloService: ArticulosService) {}

  ngOnInit(): void {
    this.fetchArticulos();
  }
  private fetchArticulos() {
    this.articuloService.findAll().subscribe({
      next: value =>{
        this.articulos = value;
        console.log(value);
      },
      error: error => {console.log(error)}
    })
  }

}
