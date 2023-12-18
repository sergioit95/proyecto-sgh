package com.example.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.Articulo;
import com.example.services.ArticuloService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/articulos")
public class ArticuloController {

    @Autowired
    private ArticuloService articuloService;

    @GetMapping("/")
    public List<Articulo> obtenerTodosLosArticulos() {
        List<Articulo> articulos = articuloService.obtenerTodosLosArticulos();

        for (Articulo articulo : articulos) {
            //articulo.setImagen(null);
        }

        return articulos;
    }

}