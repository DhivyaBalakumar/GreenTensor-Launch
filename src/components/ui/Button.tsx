import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsAnchor = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const variantClasses: Record<ButtonVariant, string> = {
  /** Primary — solid green, used for "Start Free Trial" */
  primary: [
    "bg-gt-green text-gt-bg font-semibold",
    "border border-gt-green",
    "hover:bg-gt-green-dim hover:border-gt-green-dim hover:scale-[1.02]",
    "shadow-[0_0_16px_rgba(34,197,94,0.25)] hover:shadow-[0_0_24px_rgba(34,197,94,0.4)]",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gt-green",
  ].join(" "),

  /** Secondary — outlined blue, used for "Request Demo" */
  secondary: [
    "bg-transparent text-gt-blue font-semibold",
    "border border-gt-blue",
    "hover:bg-gt-blue hover:text-white hover:scale-[1.02]",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gt-blue",
  ].join(" "),

  /** Ghost — transparent white border, used for "Join Waitlist" */
  ghost: [
    "bg-transparent text-gt-text font-semibold",
    "border border-gt-border",
    "hover:bg-white/5 hover:border-white/40 hover:scale-[1.02]",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gt-text",
  ].join(" "),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-md",
  md: "px-6 py-3 text-base rounded-lg",
  lg: "px-8 py-4 text-lg rounded-xl",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed";

/**
 * Button — renders as <button> or <a> depending on whether `href` is provided.
 * Supports primary (green), secondary (blue), and ghost (transparent) variants.
 */
export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  ].join(" ");

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorProps } = props as ButtonAsAnchor;
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
