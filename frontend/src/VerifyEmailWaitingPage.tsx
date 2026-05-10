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
  SecondaryButton,
} from "./components/StyledElements";

const routeApi = getRouteApi("/verify-email-pending");

const VerifyEmailWaitingPage = () => {
  const { email } = routeApi.useSearch();
  const navigate = useNavigate();

  if (!email) {
    navigate({ to: "/login", replace: true });
    return null;
  }

  const handleResend = async () => {
    console.log("WIPE: Resend verification email for:", email);
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

            <div className="grid gap-2 pt-2 sm:grid-cols-2">
              <PrimaryButton onClick={handleResend}>Resend</PrimaryButton>
              <SecondaryButton
                onClick={() => navigate({ to: "/login", replace: true })}
              >
                Go to Login
              </SecondaryButton>
            </div>
          </SecondarySection>
        </div>
      </Container>
    </PageBackground>
  );
};

export default VerifyEmailWaitingPage;
