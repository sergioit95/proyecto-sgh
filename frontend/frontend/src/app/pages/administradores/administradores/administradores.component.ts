import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdministradorService } from '../../../services/administradores/administrador.service';
import { Administrador } from '../../../interfaces/administrador.model';
import { Redactor } from '../../../interfaces/redactor.model';

@Component({
  selector: 'app-administrador',
  templateUrl: './administradores.component.html',
  styleUrls: ['./administradores.component.scss']
})
export class AdministradoresComponent implements OnInit {
modificarRedactor() {
throw new Error('Method not implemented.');
}
  administradorForm: FormGroup = new FormGroup({});
  redactorForm: FormGroup = new FormGroup({});
  idEliminar: number = 0;
  tipoEliminar: string = '';

  administradores: Administrador[] = [];
  redactores: Redactor[] = [];

  constructor(private formBuilder: FormBuilder, private administradorService: AdministradorService) { }

  ngOnInit() {
    this.administradorForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.redactorForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.cargarAdministradores();
    this.cargarRedactores();
  }

  cargarAdministradores() {
    this.administradorService.obtenerTodosLosAdministradores().subscribe(
      administradores => this.administradores = administradores,
      error => console.error(error)
    );
  }

  cargarRedactores() {
    this.administradorService.obtenerTodosLosRedactores().subscribe(
      redactores => this.redactores = redactores,
      error => console.error(error)
    );
  }

  crearAdministrador() {
    if (this.administradorForm.valid) {
      const newAdministrador: Administrador = {
        nombre: this.administradorForm.value.nombre,
        apellidos: this.administradorForm.value.apellidos,
        email: this.administradorForm.value.email,
        password: this.administradorForm.value.password,
        id: 0
      };

      this.administradorService.crearAdministrador(newAdministrador).subscribe(
        administrador => {
          this.administradores.push(newAdministrador);
          this.administradorForm.reset();
        },
        error => console.error(error)
      );
    }
  }

  eliminarAdministrador(id: number): void {
    this.administradorService.eliminarAdministrador(id).subscribe(
      response => {
        console.log(response);
        this.administradorService.obtenerTodosLosAdministradores().subscribe(
          administradores => {
            this.administradores = administradores;
          },
          error => {
            console.log(error);
          }
        );
      },
      error => {
        console.log(error);
      });
  }

  crearRedactor() {
    if (this.redactorForm.valid) {
      const newRedactor: Redactor = {
        nombre: this.redactorForm.value.nombre,
        apellidos: this.redactorForm.value.apellidos,
        email: this.redactorForm.value.email,
        password: this.redactorForm.value.password
      };

      this.administradorService.crearRedactor(newRedactor).subscribe(
        redactor => {
          this.redactores.push(newRedactor);
          this.redactorForm.reset();
        },
        error => console.error(error)
      );
    }
  }

  eliminarRedactor(id: number) {
    this.administradorService.eliminarRedactor(id).subscribe(
      () => this.redactores = this.redactores.filter(redactor => redactor.id !== id),
      error => console.error(error)
    );
  }
}