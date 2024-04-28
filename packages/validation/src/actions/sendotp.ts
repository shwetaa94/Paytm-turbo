import {
  ApplicationVerifier,
  ConfirmationResult,
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";



declare global {
    interface Window {
        recaptchaVerifier: any;
    }
  }

export const sendOTP = async (phoneNumber: string, recaptchaVerifier: ApplicationVerifier, app:any):Promise< { success: boolean; message: string; confirmation?: ConfirmationResult }
  > => {
  try {
    const auth = getAuth(app);
    const formatedPhoneNumber =`+91${phoneNumber.replace(/\D/g, "")}` ;
    const confirmation= await signInWithPhoneNumber(auth, formatedPhoneNumber, recaptchaVerifier);
    return {
      success: true,
      message: "Otp sent successfully",
      confirmation

    };
  } catch (error) {
    return {
      success: false,
      message: "Otp didn't sent",
    };
  }
};
