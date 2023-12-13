package com.example.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.models.Articulo;
import com.example.repositories.ArticuloRepository;

import java.util.List;

@Service
public class ArticuloService {

    @Autowired
    private ArticuloRepository articuloRepository;

    public List<Articulo> obtenerTodosLosArticulos() {
        return articuloRepository.findAll();
    }

    // otros métodos del servicio
}