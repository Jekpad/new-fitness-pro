import { ReactNode } from "react";

const ContentWrapper = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <div
      className={`h-full min-h-svh w-full bg-color-background px-4 pb-8 pt-10 md:px-[140px] ${className}`}>
      {children}
    </div>
  );
};

export default ContentWrapper;
