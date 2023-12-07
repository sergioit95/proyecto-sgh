package com.example.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.repositories.AdministradorRepository;
import com.example.repositories.RedactorRepository;
import com.example.repositories.UsuarioRepository;
import com.example.models.Administrador;
import com.example.models.Redactor;

import java.util.List;

@Service
public class AdministradorService {
    @Autowired
    private AdministradorRepository administradorRepository;

    @Autowired
    private RedactorRepository redactorRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Administrador> obtenerTodosLosAdministradores() {
        return administradorRepository.findAll();
    }

    public Administrador obtenerAdministradorPorId(Long id) {
        return administradorRepository.findById(id).orElse(null);
    }

    public void crearAdministrador(Administrador administrador) {
        administradorRepository.save(administrador);
    }

    public void eliminarAdministrador(Long id) {
        administradorRepository.deleteById(id);
    }

    public void crearRedactor(Long idAdmin, Redactor redactor) {
        Administrador administrador = obtenerAdministradorPorId(idAdmin);
        if (administrador != null) {
            redactorRepository.save(redactor);
        }
    }

    public void eliminarRedactor(Long idAdmin, Long idRedactor) {
        Administrador administrador = obtenerAdministradorPorId(idAdmin);
        if (administrador != null) {
            redactorRepository.deleteById(idRedactor);
        }
    }

    public void eliminarUsuario(Long idAdmin, Long idUsuario) {
        Administrador administrador = obtenerAdministradorPorId(idAdmin);
        if (administrador != null) {
            usuarioRepository.deleteById(idUsuario);
        }
    }
}
