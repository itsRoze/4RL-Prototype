interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  size?: "small" | "medium" | "large";
}

export const Button: React.FC<Props> = ({
  title,
  size = "small",
  ...buttonProps
}) => {
  if (size === "small") {
    return (
      <button
        className="broken-border border-2 py-3 px-6 border-black w-48 h-14 relative"
        {...buttonProps}
      >
        <span className="font-light text-lg absolute top-3 left-3">
          <code>&#8212;</code> {title}
        </span>
      </button>
    );
  }

  if (size === "medium") {
    return (
      <button
        className="broken-border border-2 py-3 px-6 border-black w-52 h-14 relative"
        {...buttonProps}
      >
        <span className="font-light text-lg absolute top-3 left-3">
          <code>&#8212;</code> {title}
        </span>
      </button>
    );
  }

  if (size === "large") {
    return (
      <button
        className="broken-border border-2 py-3 px-6 border-black w-60 h-14 relative"
        {...buttonProps}
      >
        <span className="font-light text-lg absolute top-3 left-3">
          <code>&#8212;</code> {title}
        </span>
      </button>
    );
  }
};
