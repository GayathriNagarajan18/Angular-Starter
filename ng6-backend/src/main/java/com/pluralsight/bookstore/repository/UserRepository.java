package com.pluralsight.bookstore.repository;

import com.pluralsight.bookstore.model.Post;
import com.pluralsight.bookstore.model.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

public class UserRepository {

    @PersistenceContext(unitName = "userPU")
    private EntityManager em;

    public List<User> getUsers() {
        final TypedQuery<User> query = em.createQuery("SELECT u FROM User u", User.class);
        return query.getResultList();
    }

    public List<Post> getPosts() {
        final TypedQuery<Post> query = em.createQuery("SELECT p FROM Post p", Post.class);
        System.out.println("TypedQuery<Post>: " + query.getFirstResult() + " , " + query.getMaxResults());
        return query.getResultList();
    }
}
