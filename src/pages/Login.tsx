import { useMutation } from "@tanstack/react-query";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { api } from "../apis";
import { LoginRequestDto } from "../apis/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: login } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (requestDto: LoginRequestDto) => {
      const token = await api.auth.login(requestDto);
      return token;
    },
  });
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
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
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={async () => {
              try {
                await login({
                  email,
                  password,
                });
                navigate("/");
              } catch (error) {
                alert("Unauthorized");
              }
            }}
          >
            Sign in
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
