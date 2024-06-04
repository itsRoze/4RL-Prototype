export const Loader = () => {
  return (
    <div className="flex">
      <span className="sr-only">Loading...</span>
      <div className="h-4 w-4 animate-bounce rounded-full bg-black [animation-delay:-0.3s]"></div>
      <div className="h-4 w-4 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.15s]"></div>
      <div className="h-4 w-4 animate-bounce rounded-full bg-black"></div>
    </div>
  );
};
