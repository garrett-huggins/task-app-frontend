import { twMerge } from "tailwind-merge";

export const Modal = ({
  children,
  isOpen,
  onClose,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <div
      className={twMerge(
        "fixed inset-0 z-50 px-4 flex items-center justify-center bg-black bg-opacity-50",
        isOpen ? "" : "hidden"
      )}
      onClick={onClose}
    >
      <div
        className={twMerge(
          "bg-background-accent rounded-lg p-10 w-full max-w-md border border-background-muted",
          isOpen ? "" : "hidden"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
