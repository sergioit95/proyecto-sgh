import { Component } from '@angular/core';
import { Article, SGHNewsResponse } from 'src/app/interfaces/articulos';
import { ArticulosService } from 'src/app/services/articulos/articulos.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss'],
  providers: [
    ArticulosService
  ]
})
export class ArticulosComponent {
  styles = {
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'center',
    padding: '20px',
    width: '200px',
  }

  articulos: Article[] = [];

  constructor(private articuloService: ArticulosService){}

  ngOnInit(): void{
    this.articuloService.getArticulos()
      .subscribe((response: SGHNewsResponse) =>{
        console.log(response);
        this.articulos = response.articles;
      });
  }
}
