import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SocialButton from "@/components/common/SocialButton";
import { Socials } from "@/interfaces/common";
import HomePageText from "@/components/common/HomePageText";
import { useEffect, useState } from "react";
import axios from "axios";
import { ApiError, SignupErrors } from "@/interfaces/api";
import { omit } from "lodash";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const SignUp = () => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<SignupErrors>({});

  const navigate = useNavigate();

  useEffect(() => {
    if (user !== "") {
      navigate("/");
    }
  }, [user]);

  const handleSignup = async () => {
    try {
      const res: { data: { data: string } } = await axios.post(
        "/api/user/signup",
        {
          name,
          email,
          password,
          confirmPassword,
          loginMethod: "email",
        }
      );
      setUser(res.data.data);

      navigate("/otpVerify");
    } catch (error) {
      const errors = (error as ApiError<SignupErrors>).response.data.error;
      setErrors(errors);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "name") {
      setName(e.target.value);
      setErrors(omit(errors, "name"));
    } else if (e.target.id === "email") {
      setEmail(e.target.value);
      setErrors(omit(errors, "email"));
    } else if (e.target.id === "password") {
      setPassword(e.target.value);
      setErrors(omit(errors, "password"));
    } else if (e.target.id === "password_confirm") {
      setConfirmPassword(e.target.value);
      setErrors(omit(errors, "confirmPassword"));
    }
  };

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
              <Input
                type="name"
                id="name"
                name="name"
                placeholder="Name"
                value={name}
                onChange={handleFormChange}
              />
              {errors.name && (
                <p className="text-red-500 text-xs font-bold">{errors.name}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Enter your email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleFormChange}
              />
              {errors.email && (
                <p className="text-red-500 text-xs font-bold">{errors.email}</p>
              )}
            </div>
            <div>
              <Label htmlFor="password">Enter your password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleFormChange}
              />
              {errors.password && (
                <p className="text-red-500 text-xs font-bold">
                  {errors.password}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="password_confirm">Confirm your password</Label>
              <Input
                type="password"
                id="password_confirm"
                name="password_confirm"
                placeholder="Password"
                value={confirmPassword}
                onChange={handleFormChange}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs font-bold">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            <Button className="my-2" onClick={handleSignup}>
              Sign Up
            </Button>
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
