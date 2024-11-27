export default function IconWithText({text, children, className}) {
  return (
    <div className={`grid gap-3 justify-items-center ${className}`}>
      {children}
      <span className="text-center font-bold">{text}</span>
    </div>
  );
}
