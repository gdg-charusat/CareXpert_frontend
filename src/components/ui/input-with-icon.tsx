import * as React from "react";
import { cn } from "../../lib/utils";
import { Input, InputProps } from "./input";

export interface InputWithIconProps extends InputProps {
  icon: React.ReactNode;
}

const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        <div className="absolute left-2 flex items-center pointer-events-none">
          {icon}
        </div>
        <Input ref={ref} className={cn("pl-8", className)} {...props} />
      </div>
    );
  }
);
InputWithIcon.displayName = "InputWithIcon";

export { InputWithIcon };
