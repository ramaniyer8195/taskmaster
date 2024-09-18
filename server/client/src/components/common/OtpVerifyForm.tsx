import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { ApiError, OtpErrors } from "@/interfaces/api";
import { useNavigate } from "react-router-dom";

const OtpVerifyForm = () => {
  const navigate = useNavigate();
  const [isResend, setIsResend] = useState(false);
  const [errors, setErrors] = useState<OtpErrors>({});
  const [otp, setOtp] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleResend = async () => {
    try {
      await axios.get("/api/user/generateOtp", {});
      setIsResend(true);
    } catch (err) {
      console.error(err);
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post("/api/user/verifyOtp", { otp });
      setSuccessMessage(res.data.message);

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 2000);
    } catch (error) {
      const errors = (error as ApiError<OtpErrors>).response.data.error;
      setErrors(errors);
    }
  };

  const handleInputChange = (value: string) => {
    setOtp(value);
    setErrors({});
    setIsResend(false);
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <h1 className="text-5xl font-bold font-display">Verify OTP</h1>
      <p>OTP has been sent to your email address</p>
      <div className="w-[85%] flex flex-col gap-4">
        <div className="flex items-center flex-col">
          <InputOTP maxLength={6} onChange={handleInputChange}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          {isResend && (
            <p className="text-green-500 font-bold text-center">
              OTP has been re-sent to your email address
            </p>
          )}
        </div>
        <p className="text-center">
          Didn't receive OTP? Click{" "}
          <span
            className="text-primary underline cursor-pointer"
            onClick={handleResend}
          >
            here
          </span>{" "}
          to resend
        </p>
        {errors.otp && (
          <p className="text-red-500 text-xs text-center font-bold">
            {errors.otp}
          </p>
        )}
        {successMessage !== "" && (
          <p className="text-green-500 text-xs text-center font-bold">
            {successMessage}. Redirecting to dashboard!
          </p>
        )}
        <Button className="my-2" onClick={verifyOtp}>
          Verify OTP
        </Button>
      </div>
    </div>
  );
};

export default OtpVerifyForm;
