import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticulosComponent } from './articulos/articulos.component';
import { ComponentsModule } from '../components/components.module';
import { ArticuloService } from '../services/articulos/articulos.service';
import { RedactorService } from '../services/redactores/redactor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdministradoresComponent } from './administradores/administradores/administradores.component';
import { AdministradorService } from '../services/administradores/administrador.service';
import { RedactoresComponent } from './redactores/redactores/redactores.component';

@NgModule({
  declarations: [
    AdministradoresComponent,
    RedactoresComponent,
    ArticulosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AdministradoresComponent,
    RedactoresComponent,
    ArticulosComponent
  ],
  providers: [
    AdministradorService,
    RedactorService,
    ArticuloService

  ]
})
export class PagesModule { }
