import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  pageTitle = 'SGH NEWS';
  constructor(){
  }

  onDataCheck(e: any){
    console.log(e);
  }
  

  
}
