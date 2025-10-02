"use client";

type LoaderSize = "xs" | "sm" | "lg" | "xl";
type LoaderVariant = "primary" | "secondary";

const LOADER_DIMENSIONS: Record<LoaderSize, string> = {
  xs: "w-4 h-4 p-2",
  sm: "w-8 h-8 p-4",
  lg: "w-12 h-12 p-4",
  xl: "w-16 h-16 p-4",
};

interface LoaderProps {
  variant?: LoaderVariant;
  size?: LoaderSize;
}

const Loader: React.FC<LoaderProps> = ({ variant = "secondary", size = "sm" }) => {
  const borderColor =
    variant === "primary" ? "border-primary" : "border-secondary";

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div
        className={`${LOADER_DIMENSIONS[size]} border-4 ${borderColor} border-t-transparent rounded-full animate-spin`}
      />
    </div>
  );
};

export default Loader;
