import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

export class Service{

    public URL:string = "http://localhost:8000";
    public token:string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOWVlMzhhZmJjMjI3OWFhMTdiZTUxYjk1YWFiZTIzYjkyOWFkODRhODQ0MGNlMjZkZTZiYjU3NGIzNWJmODg0NWU0NTRiMmVlYzMxNjM2MDUiLCJpYXQiOjE2MDAyOTA3NzEsIm5iZiI6MTYwMDI5MDc3MSwiZXhwIjoxNjMxODI2NzcxLCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.cbWSjObOoaYvlrlsgSCm8pX0cDQfn3EL6oHcL_0cCAMpVEYn3QeuP6ZXfh4scwGxsbSa9p4y3Jva5x63wwJtdhEaF1SVmjbKAlu1hu-FSxi6Xf0S0YKd_nKWrsq9Ui8ODXNbWBEky5IDOhPnN7IxafWfs6zKOg-ZCXToOJEjg1gTXKKtAaxPdfA0uAAL9Rht76A6lM3Y0sr12s_Qhd-1Vd5vXv5iKc3IXD8Lu0qXVNISTIO0YxOzpd_-CKBXHZSwOvaKuWEg128GZPIgcs6WYjoImEcmRWUheN8LEofeXhN_ckbra3X2EXNsbYvECKF1RbBkRqGqqqIjdocndpPd7TBa7VM3H513EAzWcPo9HZKqySvfXdgZIVOMfdpUwJZzqMQDY0Z9olOlGURhnDQ3J7zvu3WMcT24gOGR5ewZ0tJhJr2zgaZE1m9U3BZWlQFCcO12nV2hTrhGkLk9K_GXXWUa_eEFfAqBHy2VVjz5ji4XUGEWZ25QStf6uIhWn_vY0FNV5pUNNaE8SfNDthvV31yysw54ojf_eSSmj-hamCRxtMPA04TFzWN6TBWRNoJ7nUXaUnP32wKJLwA4z_AiGMAF_tmAFxjpuIgm2n8Ng0CKd2-f6sXEAwXH_4mnRlvPMu5Ln4OGe4r5wTotoHH5GZt_5sl960nV0i__Be8j7KU"
    ;

    public httpOptions = {
            headers: new HttpHeaders({ 
            'Access-Control-Allow-Origin':'*'
        })
    };

    public httpOptionsAuth = {
        headers: new HttpHeaders({ 
            'Access-Control-Allow-Origin':'*',
            'Authorization': 'Bearer '+this.token
        })
    };

    constructor(public http: HttpClient) {
    }
}