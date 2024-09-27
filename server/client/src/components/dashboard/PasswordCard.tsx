import axios from "axios";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ApiError, PasswordErrors } from "@/interfaces/api";
import { useState } from "react";
import { omit } from "lodash";

const PasswordCard = () => {
  const [errors, setErrors] = useState<PasswordErrors>({});
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordUpdate = async () => {
    try {
      await axios.put("/api/user/changePassword", {
        oldPassword,
        newPassword,
        confirmPassword,
      });

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      const errors = (error as ApiError<PasswordErrors>).response.data.error;
      setErrors(errors);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "oldPassword") {
      setOldPassword(e.target.value);
      setErrors(omit(errors, "oldPassword"));
    } else if (e.target.id === "newPassword") {
      setNewPassword(e.target.value);
      setErrors(omit(errors, "newPassword"));
    } else if (e.target.id === "confirmPassword") {
      setConfirmPassword(e.target.value);
      setErrors(omit(errors, "confirmPassword"));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-display text-2xl">Password</CardTitle>
        <CardDescription>Change your password here.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="oldPassword">Current password</Label>
          <Input
            id="oldPassword"
            name="oldPassword"
            type="password"
            value={oldPassword}
            onChange={handleFormChange}
          />
          {errors.oldPassword && (
            <p className="text-red-500 text-xs font-bold">
              {errors.oldPassword}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="newPassword">New password</Label>
          <Input
            id="newPassword"
            name="newPassword"
            type="password"
            value={newPassword}
            onChange={handleFormChange}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-xs font-bold">
              {errors.newPassword}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleFormChange}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs font-bold">
              {errors.confirmPassword}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handlePasswordUpdate}>Save password</Button>
      </CardFooter>
    </Card>
  );
};

export default PasswordCard;
