package com.example.models;

import java.util.List;

import jakarta.persistence.CascadeType;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Redactor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String apellidos;
    private String email;
    private String password;

    @OneToMany(mappedBy = "redactor", cascade = CascadeType.ALL)
    private List<Articulo> articulos;

    @ManyToOne // Agrega esta anotación para indicar la relación ManyToOne con Administrador
    @JoinColumn(name = "administrador_id") // Asegúrate de que el nombre de la columna sea correcto
    private Administrador administrador;

    public Redactor() {
        super();
    }

    public Redactor(Long id) {
		super();
		this.id = id;
	}

	public Redactor(Long id, String nombre, String apellidos, String email, String password,
            List<Articulo> articulos, Administrador administrador) {
        super();
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.password = password;
        this.articulos = articulos;
        this.administrador = administrador;
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

	public List<Articulo> getArticulos() {
		return articulos;
	}

	public void setArticulos(List<Articulo> articulos) {
		this.articulos = articulos;
	}

	public Administrador getAdministrador() {
		return administrador;
	}

	public void setAdministrador(Administrador administrador) {
		this.administrador = administrador;
	}

    
    
}
