package com.example.controllers;
import java.sql.Blob;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.models.Articulo;
import com.example.models.Redactor;
import com.example.services.RedactorService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/redactores")
public class RedactorController {

    @Autowired
    private RedactorService redactorService;

    @GetMapping
    public ResponseEntity<List<Redactor>> obtenerTodosLosRedactores() {
        List<Redactor> redactores = redactorService.obtenerTodosLosRedactores();
        return ResponseEntity.ok(redactores);
    }

    @PostMapping(path = "/{redactorId}/articulos", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Articulo> crearArticulo(@PathVariable Long redactorId, @RequestParam("articulo") String articuloStr, @RequestParam("imagen") MultipartFile imagen) {
        try {
            // Convertir el String articuloStr a un objeto Articulo
            ObjectMapper objectMapper = new ObjectMapper();
            Articulo articulo = objectMapper.readValue(articuloStr, Articulo.class);
            
            // Convertir MultipartFile a Blob
            Blob imagenBlob = new javax.sql.rowset.serial.SerialBlob(imagen.getBytes());
            articulo.setImagen(imagenBlob);
            
            // Aquí puedes usar redactorId para asociar el nuevo artículo con el redactor correcto
            Articulo nuevoArticulo = redactorService.crearArticulo(articulo, redactorId);
            
            return ResponseEntity.ok(nuevoArticulo);
        } catch (Exception ex) {
            throw new RuntimeException("Error al procesar el JSON o convertir la imagen", ex);
        }
    }
    
   
    @PutMapping("/{redactorId}/articulos/{id}")
    public ResponseEntity<Articulo> modificarArticulo(@PathVariable Long redactorId, @PathVariable Long id, @RequestParam("articulo") String articuloStr, @RequestParam("imagen") MultipartFile imagen) throws JsonMappingException, JsonProcessingException {
        Articulo articulo = new ObjectMapper().readValue(articuloStr, Articulo.class);
        articulo.setId(id);
        // Aquí puedes manejar la imagen como necesites
        Articulo articuloModificado = redactorService.modificarArticulo(articulo, redactorId);
        return ResponseEntity.ok(articuloModificado);
    }

    @DeleteMapping("/articulos/{id}")
    public ResponseEntity<String> eliminarArticulo(@PathVariable Long id) {
        try {
            redactorService.eliminarArticulo(id);
            return ResponseEntity.ok("Artículo eliminado con éxito");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/articulos")
    public ResponseEntity<List<Articulo>> obtenerTodosLosArticulos() {
        List<Articulo> articulos = redactorService.obtenerTodosLosArticulos();
        return ResponseEntity.ok(articulos);
    }
}