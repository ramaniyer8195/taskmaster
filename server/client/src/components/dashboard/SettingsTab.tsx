import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import AccountCard from "./AccountCard";
import PasswordCard from "./PasswordCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { SelectTrigger } from "../ui/select";
import { useTheme } from "../../components/providers/ThemeProvider";
import { Label } from "@radix-ui/react-label";
import { GoVerified, GoUnverified } from "react-icons/go";
import OtpVerifyForm from "../common/OtpVerifyForm";

const SettingsTab = () => {
  const { setTheme } = useTheme();
  const [isVerified] = useState(true);
  const [isVerificationInProgress, setIsVerificationInProgress] =
    useState(false);
  const [currTheme, setCurrTheme] = useState("light");
  const [accountToggle, setAccountToggle] = useState(true);

  const handleThemeChange = (value: "light" | "dark") => {
    setCurrTheme(value);
    setTheme(value);
  };

  return (
    <div className="flex flex-col gap-8 h-full">
      <h2 className="text-3xl font-display font-bold">Settings</h2>
      <div className="flex gap-16">
        <Tabs
          value={accountToggle ? "account" : "password"}
          className="min-w-[500px]"
        >
          <TabsList className="grid w-full grid-cols-2 h-[50px] rounded mb-3">
            <TabsTrigger
              value="account"
              onClick={() => setAccountToggle(true)}
              className={`${
                accountToggle
                  ? "bg-primary text-white"
                  : "bg-muted text-primary"
              }`}
            >
              Account
            </TabsTrigger>
            <TabsTrigger
              value="password"
              onClick={() => setAccountToggle(false)}
              className={`${
                !accountToggle
                  ? "bg-primary text-white"
                  : "bg-muted text-primary"
              }`}
            >
              Password
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <AccountCard />
          </TabsContent>
          <TabsContent value="password">
            <PasswordCard />
          </TabsContent>
        </Tabs>
        <div className="w-full ml-20 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h2 className="font-display text-2xl font-bold">Theme Selector</h2>
            <div className="space-y-1">
              <Label htmlFor="theme">Theme</Label>
              <Select
                value={currTheme}
                defaultValue="light"
                onValueChange={handleThemeChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold">Account Status</h2>
            <p className="flex items-center gap-2">
              {isVerified ? (
                <>
                  <span>Verified</span>
                  <GoVerified className="text-green-500" />
                </>
              ) : (
                <>
                  <span>Verification Pending</span>
                  <GoUnverified className="text-red-500" />
                  <div>
                    Click{" "}
                    <span
                      className="text-primary underline cursor-pointer"
                      onClick={() => setIsVerificationInProgress(true)}
                    >
                      here
                    </span>{" "}
                    to verify your account
                  </div>
                </>
              )}
            </p>
            {isVerificationInProgress && <OtpVerifyForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
