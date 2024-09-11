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
import userImg from "../../assets/temp/user_img.png";

const AccountCard = () => {
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
            <img src={userImg} alt="" className="h-[70px] rounded-full" />
            <Button variant="link">Upload new photo</Button>
          </div>
        </div>
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" defaultValue="Anson Abraham" />
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save changes</Button>
      </CardFooter>
    </Card>
  );
};

export default AccountCard;
