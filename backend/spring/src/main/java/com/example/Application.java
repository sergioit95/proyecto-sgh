package com.example;

import java.sql.SQLException;

import javax.sql.DataSource;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.jdbc.DataSourceBuilder;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);

        DataSource dataSource = DataSourceBuilder.create()
                .url("jdbc:mysql://localhost:3306/sgh_noticias")
                .username("root")
                .password("root")
                .build();

        try {
            dataSource.getConnection();
            System.out.println("Conexión a MySQL exitosa");
        } catch (SQLException e) {
            System.out.println("Error al conectar con MySQL");
            e.printStackTrace();
        }
    }
}

