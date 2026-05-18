import { useEffect, useRef, useState } from "react";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { verifyEmail } from "./services/userServices";
import {
  PageBackground,
  Container,
  SecondarySection,
  SectionHeader,
  SectionLabel,
  SectionTitle,
  SectionSubtitle,
  PrimaryButton,
  ErrorMessage,
} from "./components/StyledElements";

const routeApi = getRouteApi("/verify-email");

const EmailVerifiedPage = () => {
  const { token } = routeApi.useSearch();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"verifying" | "verified" | "error">(
    "verifying"
  );
  const [error, setError] = useState("");
  const hasRun = useRef(false);

  useEffect(() => {
    if (!token) {
      navigate({ to: "/login", replace: true });
      return;
    }
    if (hasRun.current) return;
    hasRun.current = true;

    verifyEmail(token)
      .then(() => {
        setStatus("verified");
        // setTimeout(() => navigate({ to: "/login", replace: true }), 3000);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Verification failed.");
        setStatus("error");
      });
  }, [navigate, token]);

  return (
    <PageBackground>
      <Container>
        <div className="w-full max-w-md">
          <SecondarySection>
            <SectionHeader>
              <SectionLabel>Email Verification</SectionLabel>
              <SectionTitle>
                {status === "verifying" && "Verifying…"}
                {status === "verified" && "Email Verified!"}
                {status === "error" && "Verification Failed"}
              </SectionTitle>
              <SectionSubtitle>
                {status === "verifying" &&
                  "Please wait while we verify your email…"}
                {status === "verified" &&
                  "Your email has been verified. Redirecting to login…"}
              </SectionSubtitle>
            </SectionHeader>

            {status === "error" && <ErrorMessage>{error}</ErrorMessage>}

            {(status === "verified" || status === "error") && (
              <div className="mt-4">
                <PrimaryButton
                  onClick={() => navigate({ to: "/login", replace: true })}
                >
                  Go to Login
                </PrimaryButton>
              </div>
            )}
          </SecondarySection>
        </div>
      </Container>
    </PageBackground>
  );
};

export default EmailVerifiedPage;
