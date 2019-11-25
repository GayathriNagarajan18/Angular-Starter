package com.pluralsight.bookstore.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter @Setter
public class Post {

    @Id
    @GeneratedValue
    private int id;

    @Column
    private int userId;

    @Column
    private String title;

    @Column
    private String body;

}
