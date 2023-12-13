import { Redactor } from "./redactor.model";

export interface Articulo {
  redactorId: any;
  id?: number;
  titulo: string;
  contenido: string;
  fechaPublicacion: string; // o Date, dependiendo de cómo estés manejando las fechas
  imagen: File | Blob; // para manejar la imagen como un archivo
  redactor: Redactor; // asumiendo que tienes un modelo Redactor en Angular
}