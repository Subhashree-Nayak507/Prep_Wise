"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3, "Name must be at least 3 characters") : z.string().optional(),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
  });

  const isSignIn = type === "sign-in";
  const title = isSignIn ? "Welcome back" : "Create your account";
  const description = isSignIn 
    ? "Sign in to practice job interviews with AI" 
    : "Get started with PrepWise today";

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (type === 'sign-up') {
        // Add your sign-up logic here
        toast.success('Account created successfully!');
        router.push('/sign-in');
      } else {
        // Add your sign-in logic here
        console.log('Signing in', data);
        toast.success('Welcome back!');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-2xl shadow-lg overflow-hidden bg-white dark:bg-gray-900">
      <div className="p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Image 
              src="/logo.svg" 
              alt="PrepWise Logo" 
              height={40} 
              width={40} 
              className="h-10 w-10"
            />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">PrepWise</h1>
          </div>
          <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-gray-200">
            {title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
            {description}
          </p>
        </div>

        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="space-y-6"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Full Name"
                placeholder="John Doe"
                type="text"
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email Address"
              placeholder="your@email.com"
              type="email"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="••••••••"
              type="password"
            />

            <Button 
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-colors duration-200"
            >
              {isSignIn ? 'Sign In' : 'Create Account'}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600 dark:text-gray-400">
            {isSignIn ? "Don't have an account?" : "Already have an account?"}
            <Link
              href={isSignIn ? "/sign-up" : "/sign-in"}
              className="ml-1 font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              {isSignIn ? "Sign up" : "Sign in"}
            </Link>
          </p>
        </div>

        {!isSignIn && (
          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
            By creating an account, you agree to our Terms and Privacy Policy.
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;