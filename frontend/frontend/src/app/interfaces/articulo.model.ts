import { Redactor } from './redactor.model';

export interface Articulo {
  id: number;
  titulo: string;
  contenido: string;
  fechaPublicacion: Date;
  redactor: Redactor;
}
