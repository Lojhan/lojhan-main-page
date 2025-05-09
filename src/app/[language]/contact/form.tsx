"use client";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";
import { LangMap } from "@/i18n/lang-map";
import { useActionState, useEffect } from "react";
import { createGithubIssue, ParseError } from "./action";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export function ContactFormSection({
  contactMe,
}: {
  contactMe: LangMap["/contact"]["contactMe"];
}) {
  const { email, message, subject, name, ...contactForm } =
    contactMe.contactForm;

  const [state, formAction, pending] = useActionState(createGithubIssue, {
    success: false,
    error: null,
    previousState: null,
    type: "NOT_SENT",
  });

  useEffect(() => {
    if (state.type === "UNKNOWN_ERROR") {
      toast("Unknown error occurred");
    }
  }, [state.type]);

  const [isValidationError, validationError] = [
    state.type === "VALIDATION_ERROR",
    state.error as ParseError["error"],
  ];

  if (state.success) {
    return (
      <Card className="w-full h-full min-h-120 text-center flex flex-col items-center justify-center">
        <CardHeader>
          <CardTitle>{contactForm.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-500 text-sm">{contactForm.successMessage}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full min-h-120">
      <CardHeader>
        <CardTitle>{contactForm.title}</CardTitle>
        <CardDescription>{contactForm.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" action={formAction}>
          <div className="grid gap-2">
            <Label htmlFor="name">{name.label}</Label>
            <Input
              id="name"
              name="name"
              placeholder={name.placeholder}
              minLength={2}
              maxLength={100}
              defaultValue={state.previousState?.name ?? ""}
              required
            />
            {isValidationError && (
              <ErrorMessage serverError={validationError} label="name" />
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">{email.label}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              defaultValue={state.previousState?.email ?? ""}
              required
            />
            {isValidationError && (
              <ErrorMessage serverError={validationError} label="email" />
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="subject">{subject.label}</Label>
            <Select
              name="subject"
              defaultValue={
                state.previousState?.name ?? subject.options[0].value
              }
              required
            >
              <SelectTrigger id="subject">
                <SelectValue placeholder={subject.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {subject.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {isValidationError && (
              <ErrorMessage serverError={validationError} label="subject" />
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">{message.label}</Label>
            <Textarea
              id="message"
              name="message"
              placeholder={message.placeholder}
              className="min-h-[150px]"
              minLength={10}
              maxLength={100}
              defaultValue={state.previousState?.message ?? ""}
              required
            />
            {isValidationError && (
              <ErrorMessage serverError={validationError} label="message" />
            )}
          </div>
          <Button type="submit" className="w-full" disabled={pending}>
            {contactForm.sendMessage}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function ErrorMessage({
  serverError,
  label,
}: {
  label: keyof ParseError["error"];
  serverError: ParseError["error"];
}) {
  const { [label]: errorForLabel } = serverError ?? {};
  if (!errorForLabel) return null;
  return <p className="text-red-500 text-xs">{errorForLabel.join(", ")}</p>;
}
