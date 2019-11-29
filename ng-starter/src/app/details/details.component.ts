import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  user: any;

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(data => this.user = data.id);
   }

  ngOnInit() {
    this.dataService.getUser(this.user).subscribe(data => this.user = data);
  }

  deleteUser() {
    this.dataService.deleteUser(this.user.id).subscribe(() => this.router.navigate(['']));
  }

  updateUser() {
    this.dataService.updateUser(this.user).subscribe(() => this.router.navigate(['']))
  }

}
