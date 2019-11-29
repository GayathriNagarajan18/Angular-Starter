package com.pluralsight.bookstore.rest;

import com.pluralsight.bookstore.model.Post;
import com.pluralsight.bookstore.model.User;
import com.pluralsight.bookstore.repository.UserRepository;

import javax.inject.Inject;
import javax.validation.constraints.Min;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.net.URI;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

@Path("/data")
public class UserEndpoint {

    @Inject
    private UserRepository userRepository;

    @GET
    @Path("/users")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUsers() {
        System.out.println("get user");
        return Response.ok(userRepository.getUsers()).build();
    }

    @GET
    @Path("/user/{id: \\d+}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUser(@PathParam("id") int id) {
        return Response.ok(userRepository.getUser(id)).build();
    }

    @GET
    @Path("/posts")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPosts() {
        return Response.ok(userRepository.getPosts()).build();
    }

    @POST
    @Path("/user")
    @Consumes(APPLICATION_JSON)
    @Produces(APPLICATION_JSON)
    public Response createUser(User user, @Context UriInfo uriInfo) {
        user = userRepository.create(user);
        return Response.ok(user).build();
    }

    @POST
    @Path("/post")
    @Consumes(APPLICATION_JSON)
    public Response createPost(Post post, @Context UriInfo uriInfo) {
        post = userRepository.create(post);
        URI createdURI = uriInfo.getBaseUriBuilder().path(String.valueOf(post.getId())).build();
        return Response.created(createdURI).build();
    }

    @DELETE
    @Path("/user/{id : \\d+}")
    public Response deleteUser(@PathParam("id") @Min(1) int id) {
        userRepository.deleteUser(id);
        return Response.ok().build();
    }

    @DELETE
    @Path("/post/{id : \\d+}")
    public Response deletePost(@PathParam("id") @Min(1) int id) {
        userRepository.deletePost(id);
        return Response.noContent().build();
    }

    @PUT
    @Path("/user")
    @Consumes(APPLICATION_JSON)
    public Response updateUser(User user) {
        System.out.println("Update user");
        userRepository.updateUser(user);
        return Response.noContent().build();
    }
}
