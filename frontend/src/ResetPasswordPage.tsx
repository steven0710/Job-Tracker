import { useState } from "react";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { resetPassword } from "./services/userServices";
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

const routeApi = getRouteApi("/reset-password");

const ResetPasswordPage = () => {
  const { token } = routeApi.useSearch();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!token) {
    navigate({ to: "/login", replace: true });
    return null;
  }

  const passwordsMatch = password === confirm;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!passwordsMatch) return;
    setError("");
    setIsSubmitting(true);
    try {
      await resetPassword(token, password);
      navigate({ to: "/login", replace: true });
    } catch (err) {
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
              <SectionTitle>Set a new password</SectionTitle>
              <SectionSubtitle>
                Enter a new password for your account.
              </SectionSubtitle>
            </SectionHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField>
                <FormLabel>New password</FormLabel>
                <FormInput
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  minLength={6}
                  disabled={isSubmitting}
                  required
                />
              </FormField>

              <FormField>
                <FormLabel>Confirm password</FormLabel>
                <FormInput
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                  minLength={6}
                  disabled={isSubmitting}
                  required
                />
                {confirm && !passwordsMatch && (
                  <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                    Passwords do not match.
                  </p>
                )}
              </FormField>

              {error && <ErrorMessage>{error}</ErrorMessage>}

              <PrimaryButton
                type="submit"
                disabled={isSubmitting || !passwordsMatch}
              >
                {isSubmitting ? "Saving..." : "Set new password"}
              </PrimaryButton>
            </form>
          </SecondarySection>
        </div>
      </Container>
    </PageBackground>
  );
};

export default ResetPasswordPage;
