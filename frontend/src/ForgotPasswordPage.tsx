import { useState } from "react";
import { requestPasswordReset } from "./services/userServices";
import {
  PageBackground,
  Container,
  SecondarySection,
  SectionHeader,
  SectionLabel,
  SectionTitle,
  SectionSubtitle,
  FormField,
  FormLabel,
  FormInput,
  PrimaryButton,
  ErrorMessage,
} from "./components/StyledElements";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sendStatus, setSendStatus] = useState<"sent" | "failed" | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await requestPasswordReset(email);
      setSubmitted(true);
      setSendStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setIsSubmitting(true);
    setSendStatus(null);
    try {
      await requestPasswordReset(email);
      setSendStatus("sent");
    } catch (err) {
      setSendStatus("failed");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageBackground>
      <Container>
        <div className="w-full max-w-md">
          <SecondarySection>
            <SectionHeader>
              <SectionLabel>Password Reset</SectionLabel>
              <SectionTitle>
                {submitted ? "Check your email" : "Forgot your password?"}
              </SectionTitle>
              <SectionSubtitle>
                {submitted ? (
                  <>
                    We sent a reset link to{" "}
                    <span className="font-medium text-slate-900 dark:text-white">
                      {email}
                    </span>
                    . Click the link to set a new password.
                  </>
                ) : (
                  "Enter your email and we'll send you a reset link."
                )}
              </SectionSubtitle>
            </SectionHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField>
                <FormLabel>Email</FormLabel>
                <FormInput
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setSubmitted(false);
                    setSendStatus(null);
                  }}
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={isSubmitting}
                  required
                />
              </FormField>

              {error && <ErrorMessage>{error}</ErrorMessage>}

              {!submitted ? (
                <PrimaryButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send reset link"}
                </PrimaryButton>
              ) : (
                <div className="flex items-center gap-3">
                  <PrimaryButton
                    type="button"
                    onClick={handleResend}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Resend"}
                  </PrimaryButton>
                  <span className="text-sm">
                    {sendStatus === "sent" && (
                      <span className="text-green-600 dark:text-green-400">
                        Sent
                      </span>
                    )}
                    {sendStatus === "failed" && (
                      <span className="text-red-600 dark:text-red-400">
                        Failed to send.
                      </span>
                    )}
                  </span>
                </div>
              )}
            </form>
          </SecondarySection>
        </div>
      </Container>
    </PageBackground>
  );
};

export default ForgotPasswordPage;
