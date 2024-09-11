import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SocialButton from "@/components/common/SocialButton";
import { Socials } from "@/interfaces/common";
import HomePageText from "@/components/common/HomePageText";

const SignUp = () => {
  return (
    <div className="flex gap-20 w-full h-full container items-center justify-between">
      <div className="w-1/2">
        <HomePageText />
      </div>
      <div className="w-1/2">
        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-5xl font-bold font-display">Sign Up</h1>
          <p>Sign up a new account </p>
          <div className="w-[85%] flex flex-col gap-4">
            <div>
              <Label htmlFor="name">Enter your name</Label>
              <Input type="name" id="name" placeholder="Name" />
            </div>
            <div>
              <Label htmlFor="email">Enter your email</Label>
              <Input type="email" id="email" placeholder="Email" />
            </div>
            <div>
              <Label htmlFor="password">Enter your password</Label>
              <Input type="password" id="password" placeholder="Password" />
            </div>
            <div>
              <Label htmlFor="password_confirm">Confirm your password</Label>
              <Input
                type="password"
                id="password_confirm"
                placeholder="Password"
              />
            </div>
            <Button className="my-2">Sign Up</Button>
          </div>
          <div className="w-[85%] flex gap-2 items-center">
            <div className="w-full h-[2px] bg-muted" />
            <span className="min-w-max">or sign up with</span>
            <div className="w-full h-[2px] bg-muted" />
          </div>
          <div className="flex gap-4">
            <SocialButton type={Socials.GOOGLE} />
            <SocialButton type={Socials.FACEBOOK} />
            <SocialButton type={Socials.TWITTER} />
            <SocialButton type={Socials.LINKEDIN} />
          </div>
          <p>
            Already have an account? Click{" "}
            <Link to="/signIn">
              <span className="text-primary underline">here</span>
            </Link>{" "}
            to sign in
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
