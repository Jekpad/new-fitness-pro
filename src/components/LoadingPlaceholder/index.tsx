import Loading from "@/assets/Blocks@1x-18s-200px-200px.svg?react";

const LoadingPlaceholder = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Loading className="w-4/6 max-w-80" />
    </div>
  );
};

export default LoadingPlaceholder;
