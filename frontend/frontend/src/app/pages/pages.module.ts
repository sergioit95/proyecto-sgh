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
import { LoginComponent } from './login/login/login.component';
import { AuthService } from '../services/auth/auth.service';

@NgModule({
  declarations: [
    AdministradoresComponent,
    RedactoresComponent,
    ArticulosComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AdministradoresComponent,
    RedactoresComponent,
    ArticulosComponent,
    LoginComponent
  ],
  providers: [
    AdministradorService,
    RedactorService,
    ArticuloService,
    AuthService

  ]
})
export class PagesModule { }
