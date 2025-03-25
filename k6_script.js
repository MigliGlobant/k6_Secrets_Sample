import http from 'k6/http';
import { sleep } from 'k6';

const API_URL = __ENV.API_URL || 'https://test.k6.io/login.php'; // URL por defecto

export let options = {
    thresholds: {
        "http_req_duration": ["p(95)<210"]
    }
};
 
export default function () {
  http.get('https://test.k6.io');
  console.log("value of api_url secret:" ,API_URL);
  sleep(1);
}