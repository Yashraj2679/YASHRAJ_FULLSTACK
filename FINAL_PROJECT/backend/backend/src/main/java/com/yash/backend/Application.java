package com.yash.backend;

import jakarta.persistence.*;

@Entity
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String internship;

    public Long getId() { return id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getInternship() { return internship; }
    public void setInternship(String internship) { this.internship = internship; }
}
