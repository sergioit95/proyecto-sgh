package com.example.controllers;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.services.AdministradorService;
import com.example.models.Administrador;
import com.example.models.Redactor;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/administradores")
public class AdministradorController {

    @Autowired
    private AdministradorService administradorService;
    
 

    @GetMapping("/")
    public ResponseEntity<List<Administrador>> obtenerTodosLosAdministradores() {
        List<Administrador> administradores = administradorService.obtenerTodosLosAdministradores();
        return ResponseEntity.ok(administradores);
    }

    @GetMapping("/redactores")
    public ResponseEntity<List<Redactor>> obtenerTodosLosRedactores() {
        List<Redactor> redactores = administradorService.obtenerTodosLosRedactores();
        return ResponseEntity.ok(redactores);
    }

    @PostMapping("/")
    public ResponseEntity<Administrador> crearAdministrador(@RequestBody Administrador administrador) {
        Administrador nuevoAdministrador = administradorService.crearAdministrador(administrador);
        return new ResponseEntity<>(nuevoAdministrador, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Administrador> modificarAdministrador(@PathVariable Long id, @RequestBody Administrador administrador) {
        Administrador administradorModificado = administradorService.modificarAdministrador(administrador);
        return new ResponseEntity<>(administradorModificado, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarAdministrador(@PathVariable Long id) {
        administradorService.eliminarAdministrador(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/redactores")
    public ResponseEntity<Redactor> crearRedactor(@RequestBody Redactor redactor) {
        Redactor nuevoRedactor = administradorService.crearRedactor(redactor);
        return new ResponseEntity<>(nuevoRedactor, HttpStatus.CREATED);
    }

    @DeleteMapping("/redactores/{id}")
    public ResponseEntity<Void> eliminarRedactor(@PathVariable Long id) {
        administradorService.eliminarRedactor(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    
}