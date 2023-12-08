package com.example.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;



@Entity
public class Articulo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private String contenido;
    private LocalDateTime fechaPublicacion;

    @Lob // Para campos grandes como imágenes
    private byte[] imagen;

    @ManyToOne
    @JoinColumn(name = "usuario_id") // Asegúrate de que el nombre de la columna sea correcto
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "redactor_id")
    private Redactor redactor;

    public Articulo() {
        // Constructor vacío requerido por JPA
    }

    public Articulo(String titulo, String contenido, LocalDateTime fechaPublicacion, byte[] imagen, Usuario usuario,
            Redactor redactor) {
        this.titulo = titulo;
        this.contenido = contenido;
        this.fechaPublicacion = fechaPublicacion;
        this.imagen = imagen;
        this.usuario = usuario;
        this.redactor = redactor;
    }

    // Getters y setters

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

    public byte[] getImagen() {
        return imagen;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Redactor getRedactor() {
        return redactor;
    }

    public void setRedactor(Redactor redactor) {
        this.redactor = redactor;
    }
}
