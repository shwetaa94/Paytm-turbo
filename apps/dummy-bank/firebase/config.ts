 
  import { FirebaseConfig } from "validation/otpvalidation";
  
  const firebaseConfig: FirebaseConfig = {
    apiKey: process.env.API_KEY?.toString(),
    authDomain: process.env.AUTH_DOMAIN?.toString(),
    projectId: process.env.PROJECT_ID?.toString(),
    storageBucket: process.env.STORAGE_BUCKET?.toString(),
    messagingSenderId: process.env.MESSAGING_SENDER_ID?.toString(),                               
    appId: process.env.APP_ID?.toString(),
    measurementId: process.env.MEASUREMENT_ID?.toString(),
  };
  
  export default firebaseConfig;