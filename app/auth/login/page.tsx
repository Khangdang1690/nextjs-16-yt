"use client";

import { loginSchema } from "@/app/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardDescription } from "@/components/ui/card";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    startTransition(async () => {
      try {
        await authClient.signIn.email({
          email: data.email,
          password: data.password,
          fetchOptions: {
            onSuccess: () => {
              toast.success("Logged in successfully");
              router.push("/");
            },
            onError: (error) => {
              toast.error(error.error.message);
            }
          }
        });
      } catch (error) {
        toast.error((error as Error).message);
      }
    })}


  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login to your account to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-y-4">
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
              <span>Login</span>
            )}</Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}