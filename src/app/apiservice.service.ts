import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})


export class ApiserviceService {

  constructor(private _http:HttpClient) { }

  //apiUrl="http://localhost:3000/user";
  apiUrl=environment.Url+"/user";

  getAllData():Observable<any>{
    return this._http.get(this.apiUrl);
  }

  createData(data:any):Observable<any>{
    return this._http.post(this.apiUrl,data)
  }

  deleteData(ids:any):Observable<any>{
    let id=ids;
    console.log("api level: "+id);
    return this._http.delete(this.apiUrl+'/'+id);
  }

  updateData(ids:any,data:any):Observable<any>{
    let id=ids;
    console.log(id);
    return this._http.put(this.apiUrl+'/'+id,data);
  }

  getSingleData(ids:any):Observable<any>{
    let id=ids;
    console.log(id);
    return this._http.get(this.apiUrl+'/'+id);
  }

}
