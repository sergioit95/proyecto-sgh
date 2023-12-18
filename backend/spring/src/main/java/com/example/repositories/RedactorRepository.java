package com.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.models.Redactor;

public interface RedactorRepository extends JpaRepository<Redactor, Long> {
    Redactor findByEmail(String email);

}
