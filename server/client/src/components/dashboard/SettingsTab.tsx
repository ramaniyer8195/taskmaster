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
import { GoVerified } from "react-icons/go";
import { User } from "@/interfaces/api";

const SettingsTab = ({
  user,
  getCurrentUser,
}: {
  user: User | null;
  getCurrentUser: () => void;
}) => {
  const { setTheme } = useTheme();
  const prevTheme = localStorage.getItem("vite-ui-theme");
  const [currTheme, setCurrTheme] = useState(prevTheme || "light");
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
            <AccountCard user={user} getCurrentUser={getCurrentUser} />
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
              <span>Verified</span>
              <GoVerified className="text-green-500" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
