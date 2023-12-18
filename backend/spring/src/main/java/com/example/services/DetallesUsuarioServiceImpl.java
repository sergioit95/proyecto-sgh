package com.example.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.example.repositories.AdministradorRepository;
import com.example.repositories.RedactorRepository;
import com.example.models.Administrador;
import com.example.models.Redactor;

import java.util.ArrayList;

@Service
public class DetallesUsuarioServiceImpl implements UserDetailsService {

    @Autowired
    private AdministradorRepository repositorioAdministrador;

    @Autowired
    private RedactorRepository repositorioRedactor;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Administrador administrador = repositorioAdministrador.findByEmail(email);
        if (administrador != null) {
            return new User(administrador.getEmail(), administrador.getPassword(), new ArrayList<>());
        }

        Redactor redactor = repositorioRedactor.findByEmail(email);
        if (redactor != null) {
            return new User(redactor.getEmail(), redactor.getPassword(), new ArrayList<>());
        }

        throw new UsernameNotFoundException("Usuario no encontrado con email: " + email);
    }
}