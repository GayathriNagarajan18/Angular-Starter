import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users;
  userForm: any;
  openAddUserDialog = false;
  countries;
  country = {country: 'ALL'};
  dataReceived = false;

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
    this.dataService.getUsers().toPromise()
    .then((data) => {
      this.users = data;
      this.dataReceived = true;
    })
    .then(() => {
      const uniqueCountries = this.users.reduce((dest, user) => {
        if(dest.indexOf(user.country) === -1) {
          dest.push(user.country);
        }
        return dest;
      }, []);
      uniqueCountries.unshift('ALL');
      this.countries = uniqueCountries.map((countryName) => {
        return {
          country: countryName
        };
      });
      console.log('countries: ' + JSON.stringify(this.countries));
    });
  }

  getUsers() {
    if(this.country.country === 'ALL') {
      return this.users;
    }
    return this.users.filter((user) => user.country === this.country.country);
  }

  postUser(user) {
    this.dataService.postUser(user).subscribe((data) => {
      this.users.push(data);
      this.openAddUserDialog = false;
    });
  }



}
