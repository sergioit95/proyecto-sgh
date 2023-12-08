package com.example.services;
import com.example.repositories.RedactorRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.repositories.ArticuloRepository;
import com.example.models.Articulo;
import com.example.models.Redactor;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.Optional;

@Service
public class ArticuloService {
	@Autowired
	private RedactorRepository redactorRepository;


    @Autowired
    private ArticuloRepository articuloRepository;

    public List<Articulo> obtenerTodosLosArticulos() {
        return articuloRepository.findAll();
    }

    public Articulo obtenerArticuloPorId(Long id) {
        return articuloRepository.findById(id).orElse(null);
    }

    public void crearArticulo(Long idRedactor, Articulo articulo) {
        // Verificar si el redactor existe
        Optional<Redactor> redactorOptional = redactorRepository.findById(idRedactor);
        if (redactorOptional.isPresent()) {
            Redactor redactor = redactorOptional.get();
            // Asociar el artículo al redactor
            articulo.setRedactor(redactor);
            // Guardar el artículo
            articuloRepository.save(articulo);
        } else {
            throw new org.springframework.web.server.ResponseStatusException(HttpStatus.NOT_FOUND, "Artículo no encontrado");
        }
    }

    public void modificarArticulo(Long idRedactor, Long idArticulo, Articulo articulo) throws AccessDeniedException  {
        // Verificar si el redactor existe
        Optional<Redactor> redactorOptional = redactorRepository.findById(idRedactor);
        if (redactorOptional.isPresent()) {
            Redactor redactor = redactorOptional.get();
            // Verificar si el artículo existe y pertenece al redactor
            Optional<Articulo> articuloExistenteOptional = articuloRepository.findById(idArticulo);
            if (articuloExistenteOptional.isPresent()) {
                Articulo articuloExistente = articuloExistenteOptional.get();
                if (articuloExistente.getRedactor().equals(redactor)) {
                    // Actualizar los campos permitidos para modificación
                    articuloExistente.setTitulo(articulo.getTitulo());
                    articuloExistente.setContenido(articulo.getContenido());
                    articuloExistente.setFechaPublicacion(articulo.getFechaPublicacion());
                    // Otros campos que puedan ser modificados...

                    // Guardar el artículo modificado
                    articuloRepository.save(articuloExistente);
                } else {
                    throw new AccessDeniedException("No tienes permiso para modificar este artículo");
                }
            } else {
                throw new org.springframework.web.server.ResponseStatusException(HttpStatus.NOT_FOUND, "Articulo no encontrado");
            }
        } else {
            throw new org.springframework.web.server.ResponseStatusException(HttpStatus.NOT_FOUND, "Articulo no encontrado");
        }
    }

    public void eliminarArticulo(Long idRedactor, Long idArticulo) {
        // Verificar si el redactor existe
        Optional<Redactor> redactorOptional = redactorRepository.findById(idRedactor);
        if (redactorOptional.isPresent()) {
            Redactor redactor = redactorOptional.get();
            // Verificar si el artículo existe y pertenece al redactor
            Optional<Articulo> articuloExistenteOptional = articuloRepository.findById(idArticulo);
            if (articuloExistenteOptional.isPresent()) {
                Articulo articuloExistente = articuloExistenteOptional.get();
                if (articuloExistente.getRedactor().equals(redactor)) {
                    // Eliminar el artículo
                    articuloRepository.delete(articuloExistente);
                } else {
                	throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "No tienes permiso para eliminar este artículo");
                }
            } else {
                throw new org.springframework.web.server.ResponseStatusException(HttpStatus.NOT_FOUND, "Articulo no encontrado");
            }
        } else {
            throw new org.springframework.web.server.ResponseStatusException(HttpStatus.NOT_FOUND, "Artículo no encontrado");
        }
    }
}
