package com.example.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartException;

import com.example.models.Articulo;
import com.example.models.Redactor;
import com.example.repositories.ArticuloRepository;
import com.example.repositories.RedactorRepository;

@Service
public class RedactorService {

    @Autowired
    private ArticuloRepository articuloRepository;
    @Autowired
    private RedactorRepository redactorRepository;
    
	
	 public Articulo crearArticulo(Articulo articulo, Long redactorId) {
	        // Buscar el redactor por id
	        Redactor redactor = redactorRepository.findById(redactorId)
	            .orElseThrow(() -> new RuntimeException("No se encontró el redactor con id " + redactorId));

	        // Asociar el artículo con el redactor
	        articulo.setRedactor(redactor);

	        // Guardar el artículo en la base de datos
	        return articuloRepository.save(articulo);
	    }

    public Articulo modificarArticulo(Articulo articulo) {
        return articuloRepository.save(articulo);
    }

    public void eliminarArticulo(Long id) {
        articuloRepository.deleteById(id);
    }
    
    public List<Articulo> obtenerTodosLosArticulos() {
        return articuloRepository.findAll();
    }
    
    public List<Redactor> obtenerTodosLosRedactores() {
        return redactorRepository.findAll();
    }
}