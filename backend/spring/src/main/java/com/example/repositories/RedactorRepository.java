package com.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.models.Redactor;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RedactorRepository extends JpaRepository<Redactor, Long> {
}
