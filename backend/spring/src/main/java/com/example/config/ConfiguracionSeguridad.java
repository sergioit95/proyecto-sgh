package com.example.config;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.HttpMethod;

import com.example.services.DetallesUsuarioServiceImpl;

@Configuration
@EnableWebSecurity
public class ConfiguracionSeguridad extends WebSecurityConfigurerAdapter {

    private final DetallesUsuarioServiceImpl servicioDetallesUsuario;
    private AuthenticationManagerBuilder auth;

    @Autowired
    public ConfiguracionSeguridad(@Lazy DetallesUsuarioServiceImpl servicioDetallesUsuario, AuthenticationManagerBuilder auth) {
        this.servicioDetallesUsuario = servicioDetallesUsuario;
        this.auth = auth;
    }

    @PostConstruct
    public void configureGlobal() throws Exception {
        auth.userDetailsService(servicioDetallesUsuario).passwordEncoder(codificadorContrasena());
    }

    @Bean
    public PasswordEncoder codificadorContrasena() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
        .cors().and()
        .csrf().disable()
        .exceptionHandling()
            .authenticationEntryPoint((request, response, authException) -> response.sendError(HttpServletResponse.SC_UNAUTHORIZED)) // Responder con 401 en lugar de redirigir
        .and()
        .authorizeRequests()
            .antMatchers("/login").permitAll()
            .antMatchers("/articulos", "/redactores", "/administradores").authenticated() // Proteger estas rutas
            .anyRequest().permitAll() // Permitir todas las demás rutas
        .and()
        .formLogin()
            .loginProcessingUrl("/login")
            .defaultSuccessUrl("/articulos", true)
            .failureUrl("/login?error=true")
        .and()
        .logout()
            .logoutUrl("/logout")
            .logoutSuccessUrl("/login");
    }
}