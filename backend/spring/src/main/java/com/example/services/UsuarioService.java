package com.example.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.repositories.UsuarioRepository;
import com.example.models.Usuario;

import java.nio.file.AccessDeniedException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> obtenerTodosLosUsuarios() {
        return usuarioRepository.findAll();
    }

    public Usuario obtenerUsuarioPorId(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    public void crearUsuario(Usuario usuario) {
        usuarioRepository.save(usuario);
    }

    public void eliminarUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }

    public void modificarUsuario(Long id, Usuario usuarioModificado) throws AccessDeniedException {
        Usuario usuarioExistente = obtenerUsuarioPorId(id);

        // Verificar que el usuario exista y sea el propietario del perfil
        if (usuarioExistente != null && usuarioExistente.getId().equals(id)) {
            // Actualizar solo los campos permitidos para modificación
            usuarioExistente.setNombre(usuarioModificado.getNombre());
            usuarioExistente.setApellidos(usuarioModificado.getApellidos());
            // Otros campos que puedan ser modificados por el usuario...

            usuarioRepository.save(usuarioExistente);
        } else {
            // Manejar el caso en el que el usuario no existe o no es el propietario
            throw new AccessDeniedException("No tienes permisos para modificar este usuario");
        }
    }
}
