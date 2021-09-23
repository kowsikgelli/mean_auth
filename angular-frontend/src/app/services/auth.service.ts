import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from  "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from '../interfaces/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  JwtAuthToken:any
  user:any
  serverUrl = "http://localhost:5000/user"
  constructor(private http: HttpClient) { }

  addUser(user: Object):Observable<any>{
    const headers = new HttpHeaders()
    headers.set('content-type','application/json')
    return this.http.post(this.serverUrl  + '/register', user,{headers:headers})
  }

  authenticateUser(user: Object):Observable<any>{
    const headers = new HttpHeaders()
    headers.set('content-type','application/json')
    return this.http.post(`${this.serverUrl}/authenticate`, user,{headers:headers}) 
  }

  getProfile():Observable<any>{
    this.loadToken()
    const headers = new HttpHeaders()
      .set('content-type','application/json')
      .set("Authorization",this.JwtAuthToken)
    console.log(this.JwtAuthToken)
    console.log(headers.get("Authorization"))
    return this.http.get(`${this.serverUrl}/profile`,{headers:headers})
  }

  loadToken(){
    const token = localStorage.getItem('id_token')
    this.JwtAuthToken = token
  }
  storeUser(jwtToken: any,user: any):any{
    localStorage.setItem('id_token',jwtToken)
    localStorage.setItem('user',JSON.stringify(user))
    this.JwtAuthToken = jwtToken;
    this.user = user;
  }

  logout(){
    this.JwtAuthToken = null;
    this.user = null;
    localStorage.clear();
  }

  isTokenExpired(){
    const helper = new JwtHelperService();
    return helper.isTokenExpired(this.JwtAuthToken);
  }
}
