import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl = 'http://localhost:8080/users-back-1.0/api/data';
  
  constructor(private httpClient: HttpClient) { }
  
  getUsers() {
    const originalUrl = 'https://jsonplaceholder.typicode.com/users';
    return this.httpClient.get(`${this.baseUrl}/users`);
  }
  
  getUser(userId) {
    return this.httpClient.get(`${this.baseUrl}/user/${userId}`);
  }
  
  getPosts() {
    const originalUrl = 'https://jsonplaceholder.typicode.com/posts';
    return this.httpClient.get(`${this.baseUrl}/posts`);
  }

  postUser(user) {
    return this.httpClient.post(`${this.baseUrl}/user`, user);
  }
  
  persistPost(post) {
    return this.httpClient.post(`${this.baseUrl}/post`, post);
  }

  deleteUser(userId) {
    return this.httpClient.delete(`${this.baseUrl}/user/${userId}`);
  }

  deletePost(postId) {
    return this.httpClient.delete(`${this.baseUrl}/post/${postId}`);
  }

  updateUser(user) {
    return this.httpClient.put(`${this.baseUrl}/user`, user);
  }
}
