import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  message: any;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.forAdmin();
  }

  forAdmin(){
    this.userService.forAdmin().subscribe(
      res => {
        console.log(res);
        this.message = res;
      } 
    )
  }

}
