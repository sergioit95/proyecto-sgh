import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticulosComponent } from './articulos/articulos.component';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [
    ArticulosComponent,
    
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ArticulosComponent,
  ]
})
export class PagesModule { }
