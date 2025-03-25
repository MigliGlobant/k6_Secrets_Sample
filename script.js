import http from 'k6/http';
import { check } from 'k6';
 
// Obtener variables de entorno
const API_URL = __ENV.API_URL || 'https://test.k6.io/login.php'; // URL por defecto
const client_id = __ENV.CLIENT_ID || 'test'; // clientId por defecto
const client_secret =__ENV.CLIENT_SECRET || '1234'; // clientSecret por defecto
const scope = __ENV.SCOPE ||'';


export let options = {
    thresholds: {
        "http_req_duration": ["p(95)<200"],
        "http_req_duration{staticAsset:yes}": ["p(95)<50"]
    }
};
 
export default function () {
    
  const payload = `grant_type=client_credentials&scope=${scope}&client_id=${client_id}&client_secret=${client_secret}`;
    
  const res = http.post(API_URL, payload, {
      headers: {
          "Content-Type": "application/x-www-form-urlencoded"
      },
  });

  check(res, {
      'token': (r) => r.status === 200,
      'respuesta tiene token': (r) => JSON.parse(r.body).access_token !== undefined,
  });
 
  const jsonResponse = JSON.parse(res.body);
  console.log('Token para cliente:', client_id);
  console.log('Respuesta: ', jsonResponse.access_token);// Retorna el token

}
