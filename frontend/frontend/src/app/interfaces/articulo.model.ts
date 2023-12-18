import { Redactor } from "./redactor.model";

export interface Articulo {
  id: number;
  titulo: string;
  contenido: string;
  fechaPublicacion: Date;
  imagenBase64: string;
  redactor: Redactor;
}