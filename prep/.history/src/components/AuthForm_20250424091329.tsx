"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import Image from "next/image";

const formSchema = z.object({
  username: z.string().min(2).max(50),
})

type FormData = z.infer<typeof formSchema>;

const AuthForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = (values: FormData) => {

    console.log(values);
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div>
  );
};

export default AuthForm;