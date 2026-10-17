import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  loading?: boolean;
};

export default function Button({
  variant = "primary",
  icon,
  iconPosition = "left",
  fullWidth = false,
  loading = false,
  disabled,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={loading || disabled}
      className={clsx(
        `inline-flex items-center justify-center gap-2 h-13 px-6 rounded-2xl font-semibold transition duration-500 cursor-pointer`,
        {
          "bg-primary text-white hover:bg-primary/90": variant === "primary",
          "border border-black/10 bg-card text-text hover:border-primary hover:text-primary":
            variant === "outline",
          "w-full": fullWidth,
          "opacity-70 cursor-not-allowed": disabled || loading,
        },
        className,
      )}
      {...props}
    >
      {loading ? (
        <>
          <div className="w-4 h-4 border-2 border-t-transparent border-current rounded-full animate-spin" />
          <span>Loading....</span>
        </>
      ) : (
        <>
          {icon && iconPosition === "left" && <span>{icon}</span>}
          {children}
          {icon && iconPosition === "right" && <span>{icon}</span>}
        </>
      )}
    </button>
  );
}
