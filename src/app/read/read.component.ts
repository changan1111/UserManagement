import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  constructor(private _apiservice:ApiserviceService) { }

  readData:any;
  successMessage:any;

  ngOnInit(): void {
    this._apiservice.getAllData().subscribe((res)=>{
      console.log(res, "res==>");
      this.readData=res;
    })
  }
    deleteId(id:any){

      this._apiservice.deleteData(id).subscribe((res)=>{
        console.log("deleting id component level: "+id);
        this.successMessage="User Successfully Deleted";

        this._apiservice.getAllData().subscribe((res)=>{
          console.log(res, "res==>");
         this.readData=res;
        });

      })
      
      
  
  }

  
}
