import { getRouteApi, useNavigate } from "@tanstack/react-router";
import {
  PageBackground,
  Container,
  SecondarySection,
  SectionHeader,
  SectionLabel,
  SectionTitle,
  SectionSubtitle,
  PrimaryButton,
} from "./components/StyledElements";
import { resendVerificationEmail } from "./services/userServices";
import { useState } from "react";

const routeApi = getRouteApi("/verify-email-pending");
const VerifyEmailWaitingPage = () => {
  const [resending, setResending] = useState(false);
  const { email } = routeApi.useSearch();
  const navigate = useNavigate();

  if (!email) {
    navigate({ to: "/login", replace: true });
    return null;
  }

  const handleResend = async () => {
    setResending(true);
    try {
      await resendVerificationEmail(email);
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Failed to resend verification email.",
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <PageBackground>
      <Container>
        <div className="w-full max-w-md">
          <SecondarySection>
            <SectionHeader>
              <SectionLabel>Email Verification</SectionLabel>
              <SectionTitle>Check your email</SectionTitle>
              <SectionSubtitle>
                We sent a verification link to{" "}
                <span className="font-medium text-slate-900 dark:text-white">
                  {email}
                </span>
                . Click the link to verify your account before logging in.
              </SectionSubtitle>
            </SectionHeader>

            <PrimaryButton onClick={handleResend} disabled={resending}>
              {resending ? "Sending..." : "Resend"}
            </PrimaryButton>
          </SecondarySection>
        </div>
      </Container>
    </PageBackground>
  );
};

export default VerifyEmailWaitingPage;
