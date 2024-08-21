import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";

const OtpVerifyForm = () => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <h1 className="text-5xl font-bold font-display">Verify OTP</h1>
      <p>OTP has been sent to your email address</p>
      <div className="w-[85%] flex flex-col gap-4">
        <div className="flex justify-center">
          <InputOTP maxLength={6}>
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
        </div>
        <p className="text-center">
          Didn't receive OTP? Click{" "}
          <span className="text-primary underline cursor-pointer">here</span> to
          resend
        </p>
        <Button className="my-2">Verify OTP</Button>
      </div>
    </div>
  );
};

export default OtpVerifyForm;
