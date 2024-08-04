import { LoadingStates } from "@/lib/types";

// LoadingButton component
type LoadingButtonProps = {
  onClick: () => void;
  loadingKey: keyof LoadingStates;
  children: React.ReactNode;
  className?: string;
  loadingStates: LoadingStates;
};
export const LoadingButton: React.FC<LoadingButtonProps> = ({
  onClick,
  loadingKey,
  children,
  className = "btn btn-ghost shadow-md",
  loadingStates,
}) => (
  <button
    className={className}
    onClick={onClick}
    disabled={loadingStates[loadingKey]}
  >
    {loadingStates[loadingKey] ? (
      <div className="loading loading-spinner"></div>
    ) : (
      children
    )}
  </button>
);
