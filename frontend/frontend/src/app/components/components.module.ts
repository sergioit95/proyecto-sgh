import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { IconComponent } from './icon/icon.component';
import { TitleComponent } from './title/title.component';
import { LoginErrorComponent } from './loginError/loginerror.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    IconComponent,
    TitleComponent,
    LoginErrorComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoginErrorComponent
  ]
})
export class ComponentsModule { }
