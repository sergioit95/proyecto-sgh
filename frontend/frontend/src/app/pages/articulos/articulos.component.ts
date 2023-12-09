// articulos.component.ts

import { Component } from '@angular/core';
import { Articulo,  } from 'src/app/interfaces/articulo.model';
import { ArticuloService } from 'src/app/services/articulos/articulos.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss'],
  providers: [ArticuloService], // FavoritosService se debe proveer en AppModule o en el módulo correspondiente
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
  constructor(public articuloService: ArticuloService) {}

  ngOnInit(): void {
  }
 

}
