"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldContent, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { postSchema } from "@/app/schemas/blog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import z from "zod";
import { useTransition } from "react";
import { createBlogAction } from "@/app/actions";

export default function CreateRoute() {
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: "",
      title: "",
      image: undefined,
    }
  });

  function onSubmit(values: z.infer<typeof postSchema>) {
    startTransition(async () => {
      await createBlogAction(values);
    })
  }

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Create Post</h1>
        <p className="text-xl text-muted-foreground pt-4">Share your thoughts with the big world</p>
      </div>

      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Create Blog Article</CardTitle>
          <CardDescription>Create a new blog article</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gapy-4">
            <Controller name="title" control={form.control} render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Title</FieldLabel>
                <FieldContent>
                  <Input aria-invalid={fieldState.invalid} placeholder="super cool title" {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]}/>
                  )}
                </FieldContent>
              </Field>
            )}/>
            <Controller name="content" control={form.control} render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Content</FieldLabel>
                <FieldContent>
                  <Textarea aria-invalid={fieldState.invalid} placeholder="super cool content" {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]}/>
                  )}
                </FieldContent>
              </Field>
            )}/>
            <Controller name="image" control={form.control} render={({ field: { value, ...field }, fieldState }) => (
              <Field>
                <FieldLabel>Image</FieldLabel>
                <FieldContent>
                  <Input
                    aria-invalid={fieldState.invalid}
                    placeholder="super cool content"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      const file = event.target.files?.[0]
                      field.onChange(file);
                    }}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
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
              <span>Create Post</span>
            )}</Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}