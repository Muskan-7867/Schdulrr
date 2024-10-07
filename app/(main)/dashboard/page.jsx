"use client";
import { useUser } from "@clerk/nextjs"; // Ensure this import is correct for your version
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

import { usernameSchema } from "../../lib/validators";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUsername } from "../../../actions/users";
import useFetch from "../../../hooks/usefetch";
import { BarLoader } from "react-spinners";

const Dashboard = () => {
  const { isLoaded, user } = useUser();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(usernameSchema),
  });

  useEffect(() => {
    if (isLoaded && user) {
      setValue("username", user.username);
    }
  }, [isLoaded, user, setValue]);

  const { loading, error, fn: funcUpdateUsername } = useFetch(updateUsername);

  // Correctly define the onSubmit function and call the update function here
  const onSubmit = async (data) => {
    try {
      await funcUpdateUsername(data.username);
    } catch (e) {
      console.error("Failed to update username:", e);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {user?.firstName}</CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Unique Link</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <span>{window?.location.origin}</span>
                <Input {...register("username")} placeholder="username" />
              </div>
              {errors.username && (
                <p className="text-red-600 text-sm ml-1">{errors.username.message}</p>
              )}
              {error && (
                <p className="text-red-600 text-sm ml-1">{error.message}</p> //error for api
              )}
            </div>
            {loading && (
              <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
            )}
            <Button type="submit">Update Username</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
