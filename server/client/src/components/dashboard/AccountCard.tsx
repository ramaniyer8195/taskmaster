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
import avatar_temp from "../../assets/temp/avatar_1.jpg";
import { AccountUpdateErrors, ApiError, User } from "@/interfaces/api";
import { useState } from "react";
import axios from "axios";

const AccountCard = ({
  user,
  getCurrentUser,
}: {
  user: User | null;
  getCurrentUser: () => void;
}) => {
  const [userName, setUserName] = useState(user?.name || "");
  const [errors, setErrors] = useState<AccountUpdateErrors>({});

  const handleAccountUpdate = async () => {
    if (userName === user?.name) {
      return;
    }

    try {
      await axios.put("/api/user/changeDetails", {
        name: userName,
      });

      getCurrentUser();
    } catch (error) {
      const errors = (error as ApiError<AccountUpdateErrors>).response.data
        .error;
      setErrors(errors);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-display text-2xl">Account</CardTitle>
        <CardDescription>Make changes to your account here.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="image">Profile picture</Label>
          <div className="flex items-center gap-3">
            <img
              src={user?.avatar || avatar_temp}
              alt=""
              className="h-[70px] rounded-full"
            />
            <Button variant="link">Upload new photo</Button>
          </div>
        </div>
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          {errors.name && (
            <p className="text-red-500 text-xs font-bold">{errors.name}</p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleAccountUpdate}>Save changes</Button>
      </CardFooter>
    </Card>
  );
};

export default AccountCard;
