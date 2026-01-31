"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { signUpSchema } from "@/app/schemas/auth";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";

export default function SignUpPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    }
  });

  async function onSubmit(data: z.infer<typeof signUpSchema>) {
    startTransition(async () => {
      await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed up successfully");
            router.push("/");
          },
          onError: (error) => {
            toast.error(error.error.message);
          }
        }
      });
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create an account to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-y-4">
            <Controller name="name" control={form.control} render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Full Name</FieldLabel>
                <FieldContent>
                  <Input aria-invalid={fieldState.invalid} placeholder="John Doe" {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]}/>
                  )}
                </FieldContent>
              </Field>
            )}/>
            <Controller name="email" control={form.control} render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Email</FieldLabel>
                <FieldContent>
                  <Input aria-invalid={fieldState.invalid} placeholder="example@example.com" {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]}/>
                  )}
                </FieldContent>
              </Field>
            )}/>
            <Controller name="password" control={form.control} render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Password</FieldLabel>
                <FieldContent>
                  <Input aria-invalid={fieldState.invalid} placeholder="********" type="password" {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]}/>
                  )}
                </FieldContent>
              </Field>
            )}/>
            <Button disabled={isPending} type="submit">{isPending ? (
              <>
              <Loader2 className="size-4 animate-spin" />
              <span>Loading...</span>
              </>
            ) : (
              <span>Signup</span>
            )}</Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}