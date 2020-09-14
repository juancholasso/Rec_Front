import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

export class Service{
    public httpOptions = {
            headers: new HttpHeaders({ 
            'Access-Control-Allow-Origin':'*'
        })
    };
}