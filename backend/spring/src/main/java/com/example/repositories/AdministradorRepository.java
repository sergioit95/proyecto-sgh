package com.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.models.Administrador;

@Repository
public interface AdministradorRepository extends JpaRepository<Administrador, Long> {
}
