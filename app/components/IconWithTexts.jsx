export default function IconWithTexts({children}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 justify-around text-black gap-y-6 items-center">
      {children}
    </div>
  );
}
