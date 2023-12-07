package com.example.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.services.AdministradorService;
import com.example.models.Administrador;
import com.example.models.Redactor;
import com.example.models.Usuario;

import java.util.List;

@RestController
@RequestMapping("/api/administradores")
public class AdministradorController {
    @Autowired
    private AdministradorService administradorService;

    @GetMapping
    public List<Administrador> obtenerTodosLosAdministradores() {
        return administradorService.obtenerTodosLosAdministradores();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Administrador> obtenerAdministradorPorId(@PathVariable Long id) {
        Administrador administrador = administradorService.obtenerAdministradorPorId(id);
        return administrador != null ? ResponseEntity.ok(administrador) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<String> crearAdministrador(@RequestBody Administrador administrador) {
        administradorService.crearAdministrador(administrador);
        return ResponseEntity.status(HttpStatus.CREATED).body("Administrador creado exitosamente");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarAdministrador(@PathVariable Long id) {
        administradorService.eliminarAdministrador(id);
        return ResponseEntity.ok("Administrador eliminado exitosamente");
    }

    @PostMapping("/{idAdmin}/redactores")
    public ResponseEntity<String> crearRedactor(@PathVariable Long idAdmin, @RequestBody Redactor redactor) {
        administradorService.crearRedactor(idAdmin, redactor);
        return ResponseEntity.status(HttpStatus.CREATED).body("Redactor creado exitosamente");
    }

    @DeleteMapping("/{idAdmin}/redactores/{idRedactor}")
    public ResponseEntity<String> eliminarRedactor(@PathVariable Long idAdmin, @PathVariable Long idRedactor) {
        administradorService.eliminarRedactor(idAdmin, idRedactor);
        return ResponseEntity.ok("Redactor eliminado exitosamente");
    }

    @DeleteMapping("/{idAdmin}/usuarios/{idUsuario}")
    public ResponseEntity<String> eliminarUsuario(@PathVariable Long idAdmin, @PathVariable Long idUsuario) {
        administradorService.eliminarUsuario(idAdmin, idUsuario);
        return ResponseEntity.ok("Usuario eliminado exitosamente");
    }
}
