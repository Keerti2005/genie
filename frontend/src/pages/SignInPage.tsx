"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithGoogle,
  signInWithGitHub,
  signInWithEmailPassword,
} from "../lib/firebase";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "../contexts/UserContext";

export default function SignInPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useUser();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      if (result.user) {
        setUser({
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        });
        navigate("/profile");
      }
    } catch (error: any) {
      setError(error.message || "Google sign-in failed");
    }
  };

  const handleGitHubSignIn = async () => {
    try {
      const result = await signInWithGitHub();
      if (result.user) {
        setUser({
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        });
        navigate("/profile");
      }
    } catch (error: any) {
      setError(error.message || "GitHub sign-in failed");
    }
  };

  const handleEmailPasswordSignIn = async () => {
    try {
      const result = await signInWithEmailPassword(email, password);
      if (result.user) {
        setUser({
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        });
        navigate("/profile");
      }
    } catch (error: any) {
      setError(error.message || "Email sign-in failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <Card className="w-full max-w-md bg-white shadow-lg border-green-200">
        <CardHeader>
          <CardTitle className="text-center text-green-700">Welcome Back</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              {error}
            </Alert>
          )}

          {!user ? (
            <>
              <div className="space-y-3">
                <Input
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  className="w-full bg-green-600  hover:bg-green-700"
                  onClick={handleEmailPasswordSignIn}
                >
                  Sign in with Email
                </Button>
                <div className="flex items-center justify-center text-muted-foreground text-xs">or</div>
                <Button
                  variant="outline"
                  className="w-full border-green-600 text-green-700 hover:bg-green-600"
                  onClick={handleGoogleSignIn}
                >
                  Sign in with Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-green-600 text-green-700 hover:bg-green-600"
                  onClick={handleGitHubSignIn}
                >
                  Sign in with GitHub
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.photoURL || "/placeholder.svg"} />
                <AvatarFallback>{user.displayName?.[0] || user.email[0]}</AvatarFallback>
              </Avatar>
              <p className="text-green-700 font-medium">{user.displayName || user.email}</p>
              <Button
                variant="outline"
                onClick={() => navigate("/profile")}
                className="border-green-600 text-green-700 hover:bg-green-100"
              >
                Go to Profile
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
