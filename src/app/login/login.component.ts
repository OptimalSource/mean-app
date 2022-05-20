import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms'
import { AuthenticationService } from '../authentication.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  constructor(private fb:FormBuilder,private authService:AuthenticationService, private router:Router) { }
  userCredential:FormGroup;
  errmsg;
  errStatus;
  currentUserObj;

  

  ngOnInit(): void {
    this.userCredential = this.fb.group({
      username:['',[Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      password:['',[Validators.required, Validators.pattern('a-zA-Z0-9]{8,}')]],
      usertype:['',Validators.required]
    })
  }

  get userName(){
    return this.userCredential.get('username')
  }
  get password() {
    return this.userCredential.get('password')
  }
  get userType(){
    return this.userCredential.get('usertype')
  }
  onsubmit(){
    console.log(this.userCredential.value.usertype)
    
    //user type is USER then 
    if (this.userCredential.value.usertype == "user") {

      this.authService.userLogin(this.userCredential.value).subscribe({
        next:(res)=>{
          console.log("inside if res ",res)
          if (res.message == "success") {
            this.errStatus =false;

            let token = res.token;
            localStorage.setItem("token",token)

            this.currentUserObj = res.userObj
            this.router.navigateByUrl(`/userDashboard/${this.currentUserObj.username}`)

          } else {
            
            this.errStatus=true
            this.errmsg = res.message
            // console.log(this.errStatus)
            // alert(res.message)
          }
        },
        error:(err)=>{
          alert(err)
        }
      })
    }
     if(this.userCredential.value.usertype == "admin") {
      
    }
  }
}
