"use client";
import { useUser } from "@clerk/nextjs"; // Ensure this import is correct for your version
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import {Input} from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

import { usernameSchema} from '../../lib/validators';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Dashboard = () => {
  const { isLoaded, user } = useUser();

  const {register, handleSubmit, setValue, formState:{errors}} = useForm({
    resolver: zodResolver(usernameSchema),
  });
  useEffect(() => {
    setValue("username", user?.username)
  },[isLoaded]);

  const onSubmit = async (data) => {};
return (
    <div className="space-y-8">
       <Card>
         <CardHeader>
            <CardTitle>Welcome, {user?.firstName}</CardTitle>
         </CardHeader>
       </Card>

       <Card>
         <CardHeader>
            <CardTitle>Your unique Link</CardTitle>
         </CardHeader>
         <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <div className="flex items-center gap-2 ">
                       <span>{window?.location.origin}</span>
                       <Input {...register("username")} placeholder="usernme"></Input>
                    </div>
                    {errors.username &&(
                        <p className="text-red-600 text-sm ml-1">{errors.username.message}</p>
                    )}
                </div>
                <Button type='submit'>Update Username</Button>
            </form>
         </CardContent>
       </Card>
    
    </div>
  );
};

export default Dashboard;
