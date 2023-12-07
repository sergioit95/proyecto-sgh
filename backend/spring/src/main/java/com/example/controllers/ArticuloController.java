package com.example.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.services.ArticuloService;
import com.example.models.Articulo;

import java.util.List;

@RestController
@RequestMapping("/api/articulos")
public class ArticuloController {

    @Autowired
    private ArticuloService articuloService;

    @GetMapping
    public List<Articulo> obtenerTodosLosArticulos() {
        return articuloService.obtenerTodosLosArticulos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Articulo> obtenerArticuloPorId(@PathVariable Long id) {
        Articulo articulo = articuloService.obtenerArticuloPorId(id);
        return articulo != null ? ResponseEntity.ok(articulo) : ResponseEntity.notFound().build();
    }

    @PostMapping("/{idRedactor}")
    public ResponseEntity<String> crearArticulo(@PathVariable Long idRedactor, @RequestBody Articulo articulo) throws NotFoundException {
        try {
            articuloService.crearArticulo(idRedactor, articulo);
            return ResponseEntity.status(HttpStatus.CREATED).body("Artículo creado exitosamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al crear el artículo");
        }
    }

    @PutMapping("/{idRedactor}/{idArticulo}")
    public ResponseEntity<String> modificarArticulo(
            @PathVariable Long idRedactor, @PathVariable Long idArticulo, @RequestBody Articulo articulo) throws NotFoundException {
        try {
            articuloService.modificarArticulo(idRedactor, idArticulo, articulo);
            return ResponseEntity.ok("Artículo modificado exitosamente");
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No tienes permiso para modificar este artículo");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al modificar el artículo");
        }
    }

    @DeleteMapping("/{idRedactor}/{idArticulo}")
    public ResponseEntity<String> eliminarArticulo(@PathVariable Long idRedactor, @PathVariable Long idArticulo) throws NotFoundException {
        try {
            articuloService.eliminarArticulo(idRedactor, idArticulo);
            return ResponseEntity.ok("Artículo eliminado exitosamente");
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No tienes permiso para eliminar este artículo");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al eliminar el artículo");
        }
    }
}

