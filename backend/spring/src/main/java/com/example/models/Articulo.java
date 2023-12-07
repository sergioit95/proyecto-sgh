package com.example.models;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import com.example.models.*;

@Entity
public class Articulo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private String contenido;
    private LocalDateTime fechaPublicacion;
    
    @ManyToOne
    @JoinColumn(name = "usuario_id") // Asegúrate de que el nombre de la columna sea correcto
    private Usuario usuario;


    @ManyToOne
    @JoinColumn(name = "redactor_id")
    private Redactor redactor;

	public Articulo(Long id, String titulo, String contenido, LocalDateTime fechaPublicacion, Redactor redactor) {
		super();
		this.id = id;
		this.titulo = titulo;
		this.contenido = contenido;
		this.fechaPublicacion = fechaPublicacion;
		this.redactor = redactor;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getContenido() {
		return contenido;
	}

	public void setContenido(String contenido) {
		this.contenido = contenido;
	}

	public LocalDateTime getFechaPublicacion() {
		return fechaPublicacion;
	}

	public void setFechaPublicacion(LocalDateTime fechaPublicacion) {
		this.fechaPublicacion = fechaPublicacion;
	}

	public Redactor getRedactor() {
		return redactor;
	}

	public void setRedactor(Redactor redactor) {
		this.redactor = redactor;
	}


}
