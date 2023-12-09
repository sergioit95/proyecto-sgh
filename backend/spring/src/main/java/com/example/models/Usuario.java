package com.example.models;

import com.example.models.*;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String apellidos;
    private String email;
    private String password;
   
    @ManyToOne
    @JoinColumn(name = "administrador_id") 
    private Administrador administrador;
   
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<Articulo> articulosFavoritos;

	public Usuario(Long id, String nombre, String apellidos, String email, String password,
			List<Articulo> articulosFavoritos) {
		super();
		this.id = id;
		this.nombre = nombre;
		this.apellidos = apellidos;
		this.email = email;
		this.password = password;
		this.articulosFavoritos = articulosFavoritos;
	}

	public Usuario() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellidos() {
		return apellidos;
	}

	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<Articulo> getArticulosFavoritos() {
		return articulosFavoritos;
	}

	public void setArticulosFavoritos(List<Articulo> articulosFavoritos) {
		this.articulosFavoritos = articulosFavoritos;
	}

    // Otros campos y métodos

    // Getters y setters
}
