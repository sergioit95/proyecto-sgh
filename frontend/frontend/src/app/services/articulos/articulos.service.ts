import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { SGHNewsResponse } from 'src/app/interfaces/articulos';
@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  constructor(private http: HttpClient) {
   }

   getArticulos(){
    return this.http.get<SGHNewsResponse>('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=bbd7e760111e43c6a828a328424ca804')
  }
  
}
