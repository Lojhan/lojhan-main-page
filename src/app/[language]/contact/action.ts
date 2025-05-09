"use server";

import { z, type ZodError } from "zod";
import { Octokit } from "octokit";
import { formSchema } from "./schema";

export type ContactFormData = z.infer<typeof formSchema>;
type FormError = ZodError<ContactFormData>["formErrors"]["fieldErrors"];

export type NotSent = {
  error: null;
  success: false;
  previousState: null;
  type: "NOT_SENT";
};

export type ParseError = {
  error: FormError;
  success: false;
  previousState: ContactFormData;
  type: "VALIDATION_ERROR";
};

export type IssueCreationError = {
  error: unknown;
  success: false;
  previousState: ContactFormData;
  type: "UNKNOWN_ERROR";
};

export type IssueCreationSuccess = {
  error: null;
  success: true;
  previousState: ContactFormData;
  type: "ISSUE_CREATED";
};

type FormResult =
  | ParseError
  | IssueCreationError
  | IssueCreationSuccess
  | NotSent;

export async function createGithubIssue(_: FormResult, formData: FormData) {
  const result = formSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return {
      previousState: Object.fromEntries(formData),
      error: result.error.formErrors.fieldErrors,
      success: false,
      type: "VALIDATION_ERROR",
    } as FormResult;
  }

  const issueSubject = result.data.subject;
  const issueBody = result.data.message;
  const issueName = result.data.name;
  const issueEmail = result.data.email;

  const issueBodyContent = `## Contact Form Submission
  **Name:** ${issueName}
  **Email:** ${issueEmail}
  **Message:** ${issueBody}`;

  const issueTitleContent = `[${issueSubject}] Contact Form Submission from ${issueName}`;

  const auth = process.env.GITHUB_TOKEN;

  const octokit = new Octokit({ auth });

  const payload = {
    owner: "Lojhan",
    repo: "lojhan-contact-issues",
    title: issueTitleContent,
    body: issueBodyContent,
    labels: [issueSubject],
  };

  return await octokit.rest.issues
    .create(payload)
    .then(
      () =>
        ({
          error: null,
          previousState: Object.fromEntries(formData),
          success: true,
          type: "ISSUE_CREATED",
        } as FormResult)
    )
    .catch(
      (error) =>
        ({
          error,
          success: false,
          type: "UNKNOWN_ERROR",
          previousState: Object.fromEntries(formData),
        } as FormResult)
    );
}
