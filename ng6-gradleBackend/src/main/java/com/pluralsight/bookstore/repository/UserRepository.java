package com.pluralsight.bookstore.repository;

import com.pluralsight.bookstore.model.Post;
import com.pluralsight.bookstore.model.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

import static javax.transaction.Transactional.TxType.REQUIRED;
import static javax.transaction.Transactional.TxType.SUPPORTS;

@Transactional(SUPPORTS)
public class UserRepository {

    @PersistenceContext(unitName = "userPU")
    private EntityManager em;

    public List<User> getUsers() {
        final TypedQuery<User> query = em.createQuery("SELECT u FROM User u", User.class);
        return query.getResultList();
    }

    public List<Post> getPosts() {
        final TypedQuery<Post> query = em.createQuery("SELECT p FROM Post p", Post.class);
        return query.getResultList();
    }

    @Transactional(REQUIRED)
    public User create(User user) {
        em.persist(user);
        return user;
    }

    @Transactional(REQUIRED)
    public Post create(Post post) {
        em.persist(post);
        return post;
    }

    @Transactional(REQUIRED)
    public void deleteUser(int id) {
        em.remove(em.getReference(User.class, id));
    }

    @Transactional(REQUIRED)
    public void deletePost(int id) {
        em.remove(em.getReference(Post.class, id));
    }

    @Transactional(REQUIRED)
    public void updateUser(User user) {
        em.merge(user);
    }

    public User getUser(int id) {
        return em.find(User.class, id);
    }
}
