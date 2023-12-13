package com.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.models.Articulo;

@Repository
public interface ArticuloRepository extends JpaRepository<Articulo, Long> {
	
}