import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RedactorService } from '../../../services/redactores/redactor.service';
import { Articulo } from 'src/app/interfaces/articulo.model';
import { ArticuloService } from 'src/app/services/articulos/articulos.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-redactores',
  templateUrl: './redactores.component.html',
  styleUrls: ['./redactores.component.scss']
})
export class RedactoresComponent implements OnInit {
  articuloForm: FormGroup = new FormGroup({});
  redactores: any;
  id: number = 0;
  mostrarFormulario: boolean = false;
  articulos: Articulo[] = [];
  eliminarForm: FormGroup = new FormGroup({});
  eliminarId: number = 0;

  constructor(private formBuilder: FormBuilder, private redactorService: RedactorService, private articuloService: ArticuloService) { }

  ngOnInit() {
    this.articuloForm = this.formBuilder.group({
      id: ['', Validators.required],
      titulo: ['', Validators.required],
      contenido: ['', Validators.required],
      fechaPublicacion: ['', Validators.required],
      imagen: ['', Validators.required],
      redactorId: ['', Validators.required],
    });

    this.redactorService.obtenerRedactores().subscribe(
      redactores => this.redactores = redactores,
      error => console.error(error)
    );

    this.articuloService.obtenerTodosLosArticulos().subscribe(
      (articulos: Articulo[]) => this.articulos = articulos,
      error => console.error(error)
    );

    this.eliminarForm = this.formBuilder.group({
      articuloId: ['', Validators.required]
    });
  }

  onFormSubmit() {
    if (this.articuloForm.valid) {
      const articulo = this.articuloForm.value;
      const redactorId = articulo.redactorId;
      const articuloId = articulo.id;
      if (redactorId == null || articuloId == null) {
        console.error('redactorId o articuloId es nulo');
        return;
      }
      const formData = new FormData();
      Object.keys(articulo).forEach(key => {
        if (key !== 'imagen' && key !== 'redactorId' && key !== 'id') {
          formData.append(key, articulo[key]);
        }
      });
      if (this.articuloForm.get('imagen')) {
        const imagen = this.articuloForm.get('imagen')?.value;
        const imagenType = imagen.type; // Coge el tipo de la imagen
        const imagenBlob = new Blob([imagen], { type: imagenType }); // Usa el tipo de la imagen
        formData.append('imagen', imagenBlob);
      }
      // Convertir el objeto articulo a un string JSON y añadirlo al objeto formData
      const articuloCopy = { ...articulo };
      delete articuloCopy.imagen;
      delete articuloCopy.redactorId;
      delete articuloCopy.id;
      const articuloStr = JSON.stringify(articuloCopy);
      formData.append('articulo', articuloStr);
      formData.append('redactorId', redactorId.toString());

      // Llama al servicio para enviar los datos al servidor
      this.redactorService.modificarArticulo(redactorId, articuloId, formData).subscribe(
        response => {
          console.log('Artículo modificado con éxito', response);
          this.mostrarFormulario = false; // Oculta el formulario después de enviarlo
        },
        error => {
          console.error('Hubo un error al modificar el artículo', error);
        }
      );
    }
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.articuloForm.patchValue({
      imagen: file
    });
  }

  modificarArticulo() {
    this.mostrarFormulario = true;
  }

  eliminarArticulo() {
    let articuloId = this.eliminarForm.get('articuloId')?.value;
    if (articuloId == null) {
      console.error('articuloId es nulo');
      return;
    }
  
    this.redactorService.eliminarArticulo(articuloId).pipe(
      catchError(error => {
        if (error.status === 404) {
          console.error('No se encontró el artículo con id ' + articuloId);
        } else {
          console.error('Hubo un error al eliminar el artículo', error);
        }
        return throwError(error);
      })
    ).subscribe(
      () => {
        console.log('Artículo eliminado');
      },
      error => {
        console.error('Hubo un error al eliminar el artículo', error);
      }
    );
  }
}