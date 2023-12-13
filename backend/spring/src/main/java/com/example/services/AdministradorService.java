package com.example.services;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.repositories.AdministradorRepository;
import com.example.repositories.RedactorRepository;
import com.example.repositories.UsuarioRepository;
import com.example.models.Administrador;
import com.example.models.Redactor;

@Service
public class AdministradorService {

    @Autowired
    private AdministradorRepository administradorRepository;

    @Autowired
    private RedactorRepository redactorRepository;


    public List<Administrador> obtenerTodosLosAdministradores() {
        return administradorRepository.findAll();
    }

    public List<Redactor> obtenerTodosLosRedactores() {
        return redactorRepository.findAll();
    }

   
    public Administrador crearAdministrador(Administrador administrador) {
        return administradorRepository.save(administrador);
    }

    public void eliminarAdministrador(Long id) {
        administradorRepository.deleteById(id);
    }

    public Administrador modificarAdministrador(Administrador administrador) {
        return administradorRepository.save(administrador);
    }

    public Redactor crearRedactor(Redactor redactor) {
        return redactorRepository.save(redactor);
    }

    public void eliminarRedactor(Long id) {
        redactorRepository.deleteById(id);
    }

 
}