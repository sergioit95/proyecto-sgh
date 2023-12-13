import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RedactorService } from '../../../services/redactores/redactor.service';

@Component({
  selector: 'app-redactores',
  templateUrl: './redactores.component.html',
  styleUrls: ['./redactores.component.scss']
})
export class RedactoresComponent implements OnInit {
  articuloForm: FormGroup = new FormGroup({});
  redactores: any;
  id: number = 0;
  constructor(private formBuilder: FormBuilder, private redactorService: RedactorService) { }

  ngOnInit() {
    this.articuloForm = this.formBuilder.group({
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
  }

  onFormSubmit() {
    console.log("onFormSubmit() fue llamado");
    if (this.articuloForm.valid) {
        const articulo = this.articuloForm.value;
        const redactorId = articulo.redactorId;
        if (redactorId == null) {
            console.error('redactorId es nulo');
            return;
        }
        const formData = new FormData();
        Object.keys(articulo).forEach(key => {
            if (key !== 'imagen' && key !== 'redactorId') {
                formData.append(key, articulo[key]);
            }
        });
        if (this.articuloForm.get('imagen')) {
          const imagen = this.articuloForm.get('imagen')?.value;
          const imagenType = imagen.type; // Obtén el tipo de la imagen
          const imagenBlob = new Blob([imagen], { type: imagenType }); // Usa el tipo de la imagen
          formData.append('imagen', imagenBlob);
      }
        // Convertir el objeto articulo a un string JSON y añadirlo al objeto formData
        const articuloCopy = { ...articulo };
        delete articuloCopy.imagen;
        delete articuloCopy.redactorId;
        const articuloStr = JSON.stringify(articuloCopy);
        formData.append('articulo', articuloStr);
        formData.append('redactorId', redactorId.toString());

        // Llamar a tu servicio para enviar los datos al servidor
        this.redactorService.crearArticulo(redactorId, formData).subscribe(
            response => {
                console.log('Artículo creado con éxito', response);
            },
            error => {
                console.error('Hubo un error al crear el artículo', error);
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
    // Aquí va tu código para modificar el artículo
  }

  eliminarArticulo(id: number) {
    this.redactorService.eliminarArticulo(id).subscribe(
      () => {
        console.log('Artículo eliminado');
        // Aquí puedes manejar la respuesta del servidor
      },
      error => {
        console.error(error);
        // Aquí puedes manejar los errores
      }
    );
  }
}