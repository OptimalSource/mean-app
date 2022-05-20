import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  user
  constructor(private us:UserService, private authService:AuthenticationService) { }

  ngOnInit(): void {
    this.user= this.authService.currentUser
  }

  getPrivateData(){
    console.log(this.user)
    this.us.getUserInfo().subscribe({
      next:(Data)=>{
        alert(Data)
        
      }
    })
  }

}
