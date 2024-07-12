import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Avatar, AvatarImage } from "@shadcn/avatar";
import { Button } from "@shadcn/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shadcn/card";
import { Input } from "@shadcn/input";
import { Label } from "@shadcn/label";

import { useAuth } from "@/contexts/AuthContext";

export const Login = () => {
  const authContext = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader className="gap-4 m-6">
          <Avatar className="self-center w-24 h-24">
            <AvatarImage
              src="/logo.svg"
              alt="avatar"
            />
          </Avatar>{" "}
          <CardTitle className="text-2xl text-center">ToDo Ease</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <Button
            className="w-full"
            onClick={async () => {
              try {
                console.log("Email/password: ", email, password);
                await authContext.login({
                  email,
                  password,
                });
                navigate("/");
              } catch (error) {
                console.log("Error: ", error);
              }
            }}
          >
            Login
          </Button>
        </CardContent>
        <CardFooter>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="underline"
            >
              Register
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
