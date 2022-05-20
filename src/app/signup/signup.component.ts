import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { UserService } from '../user.service';

import { Router} from '@angular/router'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  userFormData:FormGroup
  image:File
  errStatus
  errmsg

  constructor(private fb:FormBuilder, private us:UserService, private router:Router) { }

  ngOnInit(): void {
    this.userFormData =  this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required],
      email:['', Validators.required],
      city:'',
      profilePic:''
    })
  }

  get userName(){
    return this.userFormData.get("username")
  }

  get passWord(){
    return this.userFormData.get("password")
  }

  get email(){
    return this.userFormData.get("email")
  }

  get city(){
    return this.userFormData.get("city")
  }

  onSubmit(){
    console.log(this.userFormData.value)
    
    //get user obj from form
    let userObj= this.userFormData.value;

    //create formdata object 
    let formData =new FormData();

    //append userObj to formData
    formData.append('userObj', JSON.stringify(userObj))

    //append image to formData
    formData.append('profilePic',this.image)

    this.us.createUser(formData).subscribe({
      next:(res)=>{
        console.log("response",res)
        this.router.navigateByUrl('/login')
      },
      error:()=>{}
    })

  }

  onFileSelect(event){
    console.log(event.target.files[0])
    this.image= event.target.files[0]
  }

}
