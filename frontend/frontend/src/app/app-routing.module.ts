import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { ArticulosComponent } from './pages/articulos/articulos.component';
//import { RedactoresComponent } from './pages/redactores/redactores/redactores.component';
import { AdministradoresComponent } from './pages/administradores/administradores/administradores.component';
import { RedactoresComponent } from './pages/redactores/redactores/redactores.component';
import { ArticulosComponent } from './pages/articulos/articulos.component';
const routes: Routes = [
  {path: '', redirectTo: 'articulos', pathMatch: 'full'},
  {path: 'articulos', component: ArticulosComponent},
  {path: 'redactores', component: RedactoresComponent},
  {path: 'administradores', component: AdministradoresComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
