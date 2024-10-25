interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children }: ButtonProps) {
  return (
    <button
      className=
      {
        'disabled:opacity-30 text-center flex h-10 w-2/3 items-center justify-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white hover:bg-blue-400'
      }
    >
      {children}
    </button>
  );
}
