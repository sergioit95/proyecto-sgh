package com.example.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.example.repositories.RedactorRepository;

import java.util.List;
import java.util.Optional;
import com.example.models.Redactor;

@Service
public class RedactorService {
    @Autowired
    private RedactorRepository redactorRepository;

    public List<Redactor> obtenerTodosLosRedactores() {
        return redactorRepository.findAll();
    }

    public Optional<Redactor> obtenerRedactorPorId(Long id) {
        return redactorRepository.findById(id);
    }

    public Redactor crearRedactor(Redactor redactor) {
        // Puedes agregar lógica adicional si es necesario antes de guardar el redactor
        return redactorRepository.save(redactor);
    }

    public void modificarRedactor(Long id, Redactor redactorModificado) {
        Optional<Redactor> redactorExistente = obtenerRedactorPorId(id);

        if (redactorExistente.isPresent()) {
            Redactor redactor = redactorExistente.get();

            // Actualizar solo los campos permitidos para modificación
            redactor.setNombre(redactorModificado.getNombre());
            redactor.setApellidos(redactorModificado.getApellidos());
            redactor.setEmail(redactorModificado.getEmail());
            // Otros campos que puedan ser modificados por el administrador...

            redactorRepository.save(redactor);
        } else {
            // Manejar el caso en el que el redactor no existe
            throw new org.springframework.web.server.ResponseStatusException(HttpStatus.NOT_FOUND, "Redactor no encontrado");
        }
    }

    public void eliminarRedactor(Long id) {
        if (redactorRepository.existsById(id)) {
            redactorRepository.deleteById(id);
        } else {
            // Manejar el caso en el que el redactor no existe
            throw new org.springframework.web.server.ResponseStatusException(HttpStatus.NOT_FOUND, "Redactor no encontrado");
        }
    }
}
