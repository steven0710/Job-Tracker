import { useState } from "react";
import { handleLogin, handleRegister } from "./services/userServices";
import { useNavigate } from "@tanstack/react-router";
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
  FormHelpText,
  ButtonGrid,
  PrimaryButton,
  SecondaryButton,
  ErrorMessage,
} from "./components/StyledElements";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeIntent, setActiveIntent] = useState<"login" | "register" | null>(
    null,
  );
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const submitEvent = e.nativeEvent as SubmitEvent;
      const submitter = submitEvent.submitter as HTMLButtonElement | null;
      const intent =
        (submitter?.value as "login" | "register" | undefined) ?? "login";
      setActiveIntent(intent);

      if (intent === "register") {
        await handleRegister({ email, password });
        navigate({ to: "/verify-email-pending", search: { email }, replace: true });
      } else {
        await handleLogin({ email, password });
        navigate({ to: "/", replace: true });
      }
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Authentication failed.",
      );
    } finally {
      setIsSubmitting(false);
      setActiveIntent(null);
    }
  };

  return (
    <PageBackground>
      <Container>
        <div className="w-full max-w-md">
          <SecondarySection>
            <SectionHeader>
              <SectionLabel>Welcome back</SectionLabel>
              <SectionTitle>Sign in to your account</SectionTitle>
              <SectionSubtitle>
                Enter your credentials to continue.
              </SectionSubtitle>
            </SectionHeader>

            <form onSubmit={onSubmit} className="space-y-4">
              <FormField>
                <FormLabel>Email</FormLabel>
                <FormInput
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
                <FormHelpText>
                  Use a valid email address (e.g., you@example.com).
                </FormHelpText>
              </FormField>

              <FormField>
                <FormLabel>Password</FormLabel>
                <FormInput
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  minLength={6}
                  required
                />
                <FormHelpText>
                  Use at least 6 characters for your password.
                </FormHelpText>
              </FormField>

              {errorMessage ? (
                <ErrorMessage>{errorMessage}</ErrorMessage>
              ) : null}

              <ButtonGrid>
                <PrimaryButton
                  type="submit"
                  value="login"
                  disabled={isSubmitting}
                >
                  {isSubmitting && activeIntent === "login"
                    ? "Signing in..."
                    : "Login"}
                </PrimaryButton>

                <SecondaryButton
                  type="submit"
                  value="register"
                  disabled={isSubmitting}
                >
                  {isSubmitting && activeIntent === "register"
                    ? "Creating account..."
                    : "Register"}
                </SecondaryButton>
              </ButtonGrid>
            </form>
          </SecondarySection>
        </div>
      </Container>
    </PageBackground>
  );
};

export default Login;
