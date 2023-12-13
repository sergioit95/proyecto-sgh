package com.example.dto;

package com.example.myapp.dto;

public class ArticuloDto {
    private Long id;
    private String titulo;
    private String contenido;
    private String imagen; // Esto ahora es una cadena Base64

    // Getters
    public Long getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getContenido() {
        return contenido;
    }

    public String getImagen() {
        return imagen;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }
}
