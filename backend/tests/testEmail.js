import 'dotenv/config';
import { sendEmail } from '../services/emailService.js';


(async () => {
  await sendEmail({
    to: 'dev.elghabatech@gmail.com',
    subject: 'Test Email Bubbl',
    html: '<h1>Hello from Bubbl!</h1>',
  });
})();
