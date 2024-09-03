import { ReactNode } from "react";

const ContentWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full min-h-svh w-full bg-color-background px-4 pb-8 pt-10 md:px-[140px]">
      {children}
    </div>
  );
};

export default ContentWrapper;
