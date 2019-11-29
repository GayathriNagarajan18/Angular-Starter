import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any;
  userForm: any;
  openAddUserDialog = false;

  constructor(private formBuilder: FormBuilder, private dataService: DataService) { 
    this.userForm = this.formBuilder.group({
      fullName: '',
      username: '',
      email: '',
      phone: '',
      website: ''
    });
  }

  ngOnInit() {
    this.dataService.getUsers().subscribe(data => this.users = data);
  }

  postUser(user) {
    this.dataService.postUser(user).subscribe((data) => {
      this.users.push(data);
      this.openAddUserDialog = false;
    });
  }



}
