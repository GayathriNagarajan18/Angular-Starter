package com.pluralsight.bookstore.rest;

import com.pluralsight.bookstore.repository.UserRepository;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/data")
public class UserEndpoint {

    @Inject
    private UserRepository userRepository;

    @GET
    @Path("/users")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUsers() {
        return Response.ok(userRepository.getUsers()).build();
    }

    @GET
    @Path("/posts")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPosts() {
        return Response.ok(userRepository.getPosts()).build();
    }
}
