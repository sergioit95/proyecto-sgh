import { Component, OnInit } from '@angular/core';
import { ArticuloService } from '../../services/articulos/articulos.service';
import { Articulo } from '../../interfaces/articulo.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss']
})
export class ArticulosComponent implements OnInit {
  articulos: Articulo[] = [];

  constructor(private articuloService: ArticuloService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.articuloService.obtenerTodosLosArticulos().subscribe(articulos => {
      this.articulos = articulos;
    });
  }

  getImagenUrl(imagenBase64: string): SafeUrl {
    // Devolver la cadena base64 como una URL segura
    return this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + imagenBase64);
  }
}