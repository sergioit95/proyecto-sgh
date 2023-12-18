import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdministradoresComponent } from './pages/administradores/administradores/administradores.component';
import { RedactoresComponent } from './pages/redactores/redactores/redactores.component';
import { ArticulosComponent } from './pages/articulos/articulos.component';
import { LoginComponent } from './pages/login/login/login.component';
import { LoginErrorComponent } from './components/loginError/loginerror.component';
const routes: Routes = [
  {path: '', redirectTo: 'articulos', pathMatch: 'full'},
  {path: 'articulos', component: ArticulosComponent},
  {path: 'redactores', component: RedactoresComponent},
  {path: 'administradores', component: AdministradoresComponent},
  {path: 'login', component: LoginComponent},
  { path: 'login?error=true', component: LoginErrorComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
