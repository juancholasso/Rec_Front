import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

export class Service{

    // public URL:string = "http://localhost:8000";
    public URL:string = "https://recbackend.destinysoftware.com.co";

    public httpOptions = {
            headers: new HttpHeaders({ 
            'Access-Control-Allow-Origin':'*'
        })
    };

    public httpOptionsAuth = {
        headers: new HttpHeaders({ 
            'Access-Control-Allow-Origin':'*',
            'Authorization': 'Bearer '+this.getToken()
        })
    };

    public getToken(): String {
        return localStorage.getItem("token");
    }

    constructor(public http: HttpClient) {
    }
}