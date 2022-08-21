import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  errorMessage:any;
  successMessage:any;
  getparamid:any;

  constructor(private _apiservice:ApiserviceService, private router:ActivatedRoute) { }

  ngOnInit(): void {

    //console.log(this.router.snapshot.paramMap.get('_id'),'getid');
    this.getparamid=this.router.snapshot.paramMap.get('id');
    console.log(this.getparamid);
    this._apiservice.getSingleData(this.getparamid).subscribe((res)=>{
      console.log(res,"res==>")
      this.userForm.patchValue({
        name:res.name,
        mobile:res.mobile
      })
    })

    
  }

  userForm=new FormGroup({
    'name':new FormControl('',Validators.required),
    'mobile':new FormControl('',Validators.required)
  })


  //this._apiservice.getAllData().subscribe((res)=>{
  //  console.log(res, "res==>");
  //  this.readData=res;
  userSubmit(){
    if(this.userForm.valid){
      //console.log(this.userForm.value);
      this._apiservice.createData(this.userForm.value).subscribe((res)=>{
        console.log("message:"+ res.message);
        this.userForm.reset();
        this.successMessage="Data Added Successfully";
        
      });
    }
    else{
      this.errorMessage="All fields are required";
    }
  }


  userUpdate(){
      //console.log(this.userForm.value);
      if(this.userForm.valid){

      
      this._apiservice.updateData(this.getparamid,this.userForm.value).subscribe((res)=>{
        //console.log("message:"+ res.message);
        //this.userForm.reset();
        this.successMessage="Data Updated Successfully";
        
      });
      }
      else{
        this.errorMessage="All fields are required";
      }
  }
}