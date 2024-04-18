type Size = "xsmall" | "small" | "medium" | "large";

interface Props {
  size?: Size;
}

export const Loader: React.FC<Props> = ({ size = "small" }) => {
  if (size === "xsmall") {
    return (
      <div className="flex">
        <span className="sr-only">Loading...</span>
        <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-2 w-2 bg-black rounded-full animate-bounce"></div>
      </div>
    );
  }

  if (size === "small") {
    return (
      <div className="flex">
        <span className="sr-only">Loading...</span>
        <div className="h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-4 w-4 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-4 w-4 bg-black rounded-full animate-bounce"></div>
      </div>
    );
  }

  if (size === "medium") {
    return (
      <div className="flex">
        <span className="sr-only">Loading...</span>
        <div className="h-6 w-6 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-6 w-6 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-6 w-6 bg-black rounded-full animate-bounce"></div>
      </div>
    );
  }

  if (size === "large") {
    return (
      <div className="flex">
        <span className="sr-only">Loading...</span>
        <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-8 w-8 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
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
