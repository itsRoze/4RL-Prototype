type Size = "xsmall" | "small" | "medium" | "large";

interface Props {
  size?: Size;
}

export const Loader: React.FC<Props> = ({ size = "small" }) => {
  if (size === "xsmall") {
    return (
      <div className="flex">
        <span className="sr-only">Loading...</span>
        <div className="h-2 w-2 animate-bounce rounded-full bg-black [animation-delay:-0.3s]"></div>
        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.15s]"></div>
        <div className="h-2 w-2 animate-bounce rounded-full bg-black"></div>
      </div>
    );
  }

  if (size === "small") {
    return (
      <div className="flex">
        <span className="sr-only">Loading...</span>
        <div className="h-4 w-4 animate-bounce rounded-full bg-black [animation-delay:-0.3s]"></div>
        <div className="h-4 w-4 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.15s]"></div>
        <div className="h-4 w-4 animate-bounce rounded-full bg-black"></div>
      </div>
    );
  }

  if (size === "medium") {
    return (
      <div className="flex">
        <span className="sr-only">Loading...</span>
        <div className="h-6 w-6 animate-bounce rounded-full bg-black [animation-delay:-0.3s]"></div>
        <div className="h-6 w-6 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.15s]"></div>
        <div className="h-6 w-6 animate-bounce rounded-full bg-black"></div>
      </div>
    );
  }

  if (size === "large") {
    return (
      <div className="flex">
        <span className="sr-only">Loading...</span>
        <div className="h-8 w-8 animate-bounce rounded-full bg-black [animation-delay:-0.3s]"></div>
        <div className="h-8 w-8 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.15s]"></div>
        <div className="h-8 w-8 animate-bounce rounded-full bg-black"></div>
      </div>
    );
  }
};

export const Ellipsis = () => {
  return (
    <span className="ellipsis-anim">
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </span>
  );
};
