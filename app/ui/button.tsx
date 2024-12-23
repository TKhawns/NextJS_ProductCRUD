export function Button({
  children,
  isDisable,
}: {
  children: React.ReactNode;
  isDisable: boolean;
}) {
  return (
    <button
      disabled={isDisable}
      type="submit"
      className={
        "disabled:opacity-30 text-center flex h-10 w-2/3 items-center justify-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
      }
    >
      {children}
    </button>
  );
}
