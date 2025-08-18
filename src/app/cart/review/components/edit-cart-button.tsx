"use client";

interface EditCartButtonProps {
  children: React.ReactNode;
}

export default function EditCartButton({ children }: EditCartButtonProps) {
  const handleClick = () => {
    // Close any open dialogs first
    document.body.click();

    // Delay a bit to ensure any closing animations are done
    setTimeout(() => {
      // Click the cart trigger to open the cart sheet
      document.getElementById("cart-trigger")?.click();
    }, 100);
  };

  return (
    <button
      type="button"
      className="text-primary hover:text-primary/80 font-medium"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
