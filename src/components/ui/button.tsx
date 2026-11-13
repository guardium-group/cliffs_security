import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Logo red with depth: top-to-bottom gradient, red glow, lift on hover.
        default:
          "bg-linear-to-b from-primary to-primary-deep text-primary-foreground font-semibold shadow-[0_8px_20px_-8px_rgba(232,30,37,0.6)] hover:brightness-110 hover:shadow-[0_12px_28px_-8px_rgba(232,30,37,0.7)] motion-safe:hover:-translate-y-0.5 active:translate-y-0 active:brightness-95",
        // Teal-slate, the partner button on light sections.
        secondary:
          "bg-brand-dark text-white font-semibold shadow-[0_8px_20px_-10px_rgba(20,54,66,0.55)] hover:bg-brand-dark-hover hover:shadow-[0_12px_28px_-10px_rgba(20,54,66,0.6)] motion-safe:hover:-translate-y-0.5 active:translate-y-0",
        // Solid white, the partner button on dark sections and photos.
        inverse:
          "bg-white text-brand-ink font-semibold shadow-[0_8px_20px_-10px_rgba(0,0,0,0.45)] hover:bg-white/90 motion-safe:hover:-translate-y-0.5 active:translate-y-0",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost:
          "hover:bg-accent hover:text-accent-foreground",
        link:
          "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-12 rounded-md px-8 text-base",
        xl: "h-13 rounded-md px-10 text-base font-semibold",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
