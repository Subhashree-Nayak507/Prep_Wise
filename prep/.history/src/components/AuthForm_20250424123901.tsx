"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { Router } from "next/router";

const formSchema = z.object({
  username: z.string().min(2).max(50),
})

type FormData = z.infer<typeof formSchema>;

const authFormSchema = (type: FormType) => { // formtype check
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};


const AuthForm = ({ type }:{ type:FormType }) => { // formtype check
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer <typeof formSchema >>({ // extractes typescript types which schema is created
    resolver: zodResolver(formSchema),
    defaultValues: {
     name ;"",
     email :"",
     password :""
    },
  });
  const isSignIn = type === "sign-in";

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
   try{
     if ( type === 'sign-up'){
       toast.success('Account created succesfully');
       Router.push('/sign-in')
     }else{
      console.log('signin',values)
     }
   }catch(error){
    console.log(error);
    toast.error(`There was a error: ${error}`)
   }
  };

  return (
    <div className="card-border lg:min--w-[556px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
         <div className="flex flex-row gap-2 justify-center">
           <Image src="/logo.svg" alt="logo" height={32}  width={38} />
           <h2 className="text-primary-100">Prep_Wise</h2>
         </div>
         <h3> Practice Job Interview With AI</h3>
      </div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
         { !isSignIn && (
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
                type="text"
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email address"
              type="email"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
         )}
         <p>Email</p>
         <p>pasword</p>
        <Button type="submit" className="btn text-purple-300">{ isSignIn? ' sign in ' : 'create an Account'}</Button>
      </form>
    </Form>
    <p className="text-center text-purple-200">
          {isSignIn ? "No account yet?" : "Have an account already?"}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1"
          >
            {!isSignIn ? "Sign In" : "Sign Up"}
          </Link>
        </p>
    </div>
  );
};

export default AuthForm;