import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SocialButton from "@/components/common/SocialButton";
import { Socials } from "@/interfaces/common";
import HomePageText from "@/components/common/HomePageText";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { ApiError, SignInErrors } from "@/interfaces/api";
import axios from "axios";
import { omit } from "lodash";

const SignIn = () => {
  const { user, setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<SignInErrors>({});

  const navigate = useNavigate();

  useEffect(() => {
    if (user !== "") {
      navigate("/");
    }
  }, [user]);

  const handleSignIn = async () => {
    try {
      const res: { data: { data: string } } = await axios.post(
        "/api/user/signin",
        {
          email,
          password,
        }
      );
      setUser(res.data.data);

      navigate("/");
    } catch (error) {
      const errors = (error as ApiError<SignInErrors>).response.data.error;
      setErrors(errors);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "email") {
      setEmail(e.target.value);
      setErrors(omit(errors, "email"));
    } else if (e.target.id === "password") {
      setPassword(e.target.value);
      setErrors(omit(errors, "password"));
    }
  };

  return (
    <div className="flex gap-20 w-full h-full container items-center justify-between">
      <div className="w-1/2">
        <HomePageText />
      </div>
      <div className="w-1/2 flex flex-col gap-4 items-center">
        <h1 className="text-5xl font-bold font-display">Sign In</h1>
        <p>Sign in if you already have an account </p>
        <div className="w-[85%] flex flex-col gap-4">
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
          <Button className="my-2" onClick={handleSignIn}>
            Sign In
          </Button>
        </div>
        <div className="w-[85%] flex gap-2 items-center">
          <div className="w-full h-[2px] bg-muted" />
          <span className="min-w-max">or sign in with</span>
          <div className="w-full h-[2px] bg-muted" />
        </div>
        <div className="flex gap-4">
          <SocialButton type={Socials.GOOGLE} />
          <SocialButton type={Socials.FACEBOOK} />
          <SocialButton type={Socials.TWITTER} />
          <SocialButton type={Socials.LINKEDIN} />
        </div>
        <p>
          Don't have an account? Click{" "}
          <Link to="/signUp">
            <span className="text-primary underline">here</span>
          </Link>{" "}
          to register
        </p>
      </div>
    </div>
  );
};

export default SignIn;
