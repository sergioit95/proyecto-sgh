import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { IconComponent } from './icon/icon.component';
import { TitleComponent } from './title/title.component';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    IconComponent,
    TitleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class ComponentsModule { }
