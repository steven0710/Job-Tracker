import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const responsiveSpacing = "rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3";
const interactiveStyles = `${responsiveSpacing} text-sm font-semibold transition`;
const formControlStyles = `w-full ${responsiveSpacing} border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-400 dark:focus:ring-cyan-500/20`;

/**
 * Container centers page content and keeps the layout responsive.
 */
export const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-3 py-6 sm:px-4 md:px-6 lg:px-8 lg:py-10">
    {children}
  </div>
);

/**
 * PageBackground provides the overall page backdrop and supports light/dark mode.
 */
export const PageBackground = ({ children }: { children: React.ReactNode }) => (
  <div className="relative min-h-screen overflow-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(59,130,246,0.12),_transparent_45%),radial-gradient(ellipse_at_bottom_right,_rgba(168,85,247,0.1),_transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top_left,_rgba(56,189,248,0.18),_transparent_45%),radial-gradient(ellipse_at_bottom_right,_rgba(249,115,22,0.16),_transparent_50%)]" />
    {children}
  </div>
);

/**
 * SecondarySection renders a card-style container for the login form.
 */
export const SecondarySection = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <section className="rounded-2xl md:rounded-3xl border border-slate-200 bg-white p-5 md:p-6 shadow-lg shadow-slate-200/50 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80 dark:shadow-2xl dark:shadow-cyan-900/20 sm:p-6 md:p-8">
    {children}
  </section>
);

/**
 * SectionHeader groups the heading and subtitle with vertical spacing.
 */
export const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-6 md:mb-8">{children}</div>
);

/**
 * SectionLabel renders a small uppercase contextual label.
 */
export const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-cyan-300">
    {children}
  </p>
);

/**
 * SectionTitle renders the main heading text for the form.
 */
export const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mt-2 md:mt-3 text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white">
    {children}
  </h2>
);

/**
 * SectionSubtitle provides supporting text below the title.
 */
export const SectionSubtitle = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{children}</p>
);

/**
 * FormField wraps a label and input pair for consistent spacing.
 */
export const FormField = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

/**
 * FormLabel renders styled labels for form inputs.
 */
export const FormLabel = ({ children }: { children: React.ReactNode }) => (
  <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
    {children}
  </label>
);

/**
 * FormInput styles text inputs and supports dark mode styling.
 */
export const FormInput = (
  props: React.InputHTMLAttributes<HTMLInputElement>
) => <input {...props} className={formControlStyles} />;

/**
 * FormSelect styles select fields the same as text inputs.
 */
export const FormSelect = (
  props: React.SelectHTMLAttributes<HTMLSelectElement>
) => <select {...props} className={formControlStyles} />;

/**
 * FormHelpText renders small descriptive text under a form field.
 */
export const FormHelpText = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{children}</p>
);

/**
 * ButtonGrid lays out action buttons side-by-side on larger screens.
 */
export const ButtonGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid gap-2 md:gap-3 pt-2 sm:grid-cols-2">{children}</div>
);

/**
 * PrimaryButton renders the main form action button.
 */
export const PrimaryButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => (
  <button
    {...props}
    className={`${interactiveStyles} bg-blue-600 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400 dark:disabled:bg-slate-600 dark:disabled:text-slate-300`}
  />
);

/**
 * SecondaryButton renders the alternate action button style.
 */
export const SecondaryButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => (
  <button
    {...props}
    className={`${interactiveStyles} border border-slate-300 bg-slate-100 text-slate-900 hover:bg-slate-200 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 dark:border-slate-500 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 dark:disabled:border-slate-700 dark:disabled:bg-slate-700 dark:disabled:text-slate-400`}
  />
);

/**
 * ErrorMessage displays validation or submission errors.
 */
export const ErrorMessage = ({ children }: { children: React.ReactNode }) => (
  <p className="rounded-lg md:rounded-xl border border-red-300 bg-red-50 px-3 md:px-4 py-2 md:py-3 text-sm text-red-700 dark:border-red-400/40 dark:bg-red-500/10 dark:text-red-200">
    {children}
  </p>
);

/**
 * PasswordInput is a password field with a show/hide toggle button.
 */
export const PasswordInput = (
  props: Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">
) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <input
        {...props}
        type={visible ? "text" : "password"}
        className={`${formControlStyles} pr-10`}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        tabIndex={-1}
      >
        {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
};
