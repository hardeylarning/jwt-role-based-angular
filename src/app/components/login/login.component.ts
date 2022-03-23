import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, 
              private userAuthService:UserAuthService,
              private router:Router) { }

  ngOnInit(): void {
  }

  login(loginForm: NgForm){
    this.userService.login(loginForm.value).subscribe(
      (response:any) => {
        console.log(response)
        this.userAuthService.setRoles(response.user.roles);
        this.userAuthService.setToken(response.jwtToken)

        const roles = response.user.roles
        const isAdmin = roles.find(role => role.roleName === 'Admin')
        const isUser = roles.find(role => role.roleName === 'User')
        if (isAdmin) {
          this.router.navigate(['/admin'])
        }
        else if(isUser){
          this.router.navigate(['/user'])
        }

        else {
          this.router.navigate(['/home'])
        }

        
      }
    )
    
    
  }

}
