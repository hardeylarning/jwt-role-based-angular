import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  message: any;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.forAll()
  }

  forAll(){
    this.userService.forAll().subscribe(
      res => {
        console.log(res);
        this.message = res;
      } 
    )
  }

}
