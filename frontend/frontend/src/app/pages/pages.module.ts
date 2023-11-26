import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticulosComponent } from './articulos/articulos.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [
    ArticulosComponent,
    FavoritosComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ArticulosComponent
  ]
})
export class PagesModule { }
