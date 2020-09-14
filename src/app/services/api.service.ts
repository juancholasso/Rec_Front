import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Service } from './service.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService extends Service implements OnInit{

  public URL:string = "http://localhost:8000";
  private token:string;

  constructor(private http: HttpClient) {
    super();
    this.token = localStorage.getItem("session");
  }

  ngOnInit(): void {
    this.token = localStorage.getItem("session");
  }

  getToken(): void {
    this.token = localStorage.getItem("session");
  }


  public loginRequest(body:any) {
    var response = this.http.post(this.URL+"/login", body, this.httpOptions)
    this.getToken();
    return response;
  }

  public registerRequest(body:any) {
    var response = this.http.post(this.URL+"/signup", body, this.httpOptions)
    return response;
  }

  // public makeLogout() {
  //   var reqHeader = new HttpHeaders({ 
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer '+this.token
  //   });
  //   return this.http.get(this.URL+"/api/logout", { headers: reqHeader });
  // }

  // public getSongs() {
  //   var reqHeader = new HttpHeaders({ 
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer '+this.token
  //   });
  //   return this.http.get(this.URL+"/api/songs", { headers: reqHeader });
  // }

  // public deleteSong(idsong:number) {
  //   var reqHeader = new HttpHeaders({ 
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer '+this.token
  //   });
  //   return this.http.delete(this.URL+"/api/songs/"+idsong, { headers: reqHeader });
  // }

  // public getMySongs() {
  //   var reqHeader = new HttpHeaders({ 
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer '+this.token
  //   });
  //   console.log(this.token)
  //   return this.http.get(this.URL+"/api/songs/user", { headers: reqHeader });
  // }


  // public getPlaylists() {
  //   var reqHeader = new HttpHeaders({ 
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer '+this.token
  //   });
  //   return this.http.get(this.URL+"/api/playlist", { headers: reqHeader });
  // }

  // public getPlaylist(id:number) {
  //   var reqHeader = new HttpHeaders({ 
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer '+this.token
  //   });
  //   return this.http.get(this.URL+"/api/playlist/"+id, { headers: reqHeader });
  // }

  // public deletePlaylist(id:number) {
  //   var reqHeader = new HttpHeaders({ 
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer '+this.token
  //   });
  //   return this.http.delete(this.URL+"/api/playlist/"+id, { headers: reqHeader });
  // }

  // public createPlaylist(name:string) {
  //   var reqHeader = new HttpHeaders({ 
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer '+this.token
  //   });
  //   return this.http.post(this.URL+"/api/playlist/create",{'name':name}, { headers: reqHeader });
  // }

  // public addSongToPlaylist(idplaylist, idsong){
  //   var reqHeader = new HttpHeaders({ 
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer '+this.token
  //   });
  //   return this.http.post(this.URL+"/api/playlist/addsong",{'idplaylist':idplaylist, 'idsong':idsong}, { headers: reqHeader });
  // }

  // public removeSongToPlaylist(idplaylist, idsong){
  //   var reqHeader = new HttpHeaders({ 
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer '+this.token
  //   });
  //   return this.http.post(this.URL+"/api/playlist/removesong",{'idplaylist':idplaylist, 'idsong':idsong}, { headers: reqHeader });
  // }


  // public uploadSong(form:FormGroup){
  //   const formData = new FormData();
  //   formData.append('name', form.controls['name'].value);
  //   formData.append('song', form.controls['song'].value);

  //   var reqHeader = new HttpHeaders({ 
  //     'Authorization': 'Bearer '+this.token
  //   });
  //   return this.http.post(this.URL+"/api/songs/create",formData, { headers: reqHeader });
  // }

  // public signUp(body:any){
  //   var reqHeader = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });

  //   return this.http.post(this.URL+"/signup",body, { headers: reqHeader });
  // }
}
