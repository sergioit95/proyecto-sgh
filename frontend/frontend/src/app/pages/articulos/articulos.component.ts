import { Component, OnInit } from '@angular/core';
import { ArticuloService } from '../../services/articulos/articulos.service'; // Asegúrate de importar tu servicio de Articulo
import { Articulo } from '../../interfaces/articulo.model'; // Asegúrate de importar tu modelo de Articulo

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss']
})
export class ArticulosComponent implements OnInit {
  articulos: Articulo[] = [];

  constructor(private articuloService: ArticuloService) { }

  ngOnInit(): void {
    this.articuloService.obtenerTodosLosArticulos().subscribe(articulos => {
      this.articulos = articulos;
    });
  }
}