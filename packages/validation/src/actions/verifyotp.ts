import { ConfirmationResult } from "firebase/auth";

export const verifyOTP = async (
  otp: string,
  confirmation: ConfirmationResult
) => {
  try {
    // console.log("this is totptrgrfkj :",otp, confirmation)
    const res = await confirmation.confirm(otp);
    console.log(res);
    return {
      success: true,
      message: "Otp verified successfully ",
    };
  } catch (error) {
    console.log("this is error : ", error);
    return {
      success: false,
      message: "Interval server error while verifying otp",
    };
  }
};
