import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex w-full h-[48px] text-black rounded-md shadow-xl border border-black/20 bg-white/80 focus:border-accent font-light bg-white px-4 py-5 text-base placeholder:text-white/60 outline-none ",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
