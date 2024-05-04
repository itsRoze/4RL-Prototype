interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  size?: "small" | "medium";
}

export const Button: React.FC<Props> = ({
  title,
  size = "small",
  ...buttonProps
}) => {
  if (size === "small") {
    return (
      <button
        {...buttonProps}
        className="border-2 py-3 px-6 border-black w-48 h-14 relative group"
      >
        <span className="font-light text-lg absolute top-3 left-3">
          <code>&#8212;</code> {title}
        </span>
        <div className="bg-purple-200 absolute w-full h-full z-[-1] top-2 left-2 group-active:top-[0] group-active:left-[0] fill-in"></div>
      </button>
    );
  }

  if (size === "medium") {
    return (
      <button
        className="border-2 py-3 px-6 border-black w-52 h-14 relative group"
        {...buttonProps}
      >
        <span className="font-light text-lg absolute top-3 left-3">
          <code>&#8212;</code> {title}
        </span>
        <div className="bg-purple-200 absolute w-full h-full z-[-1] top-2 left-2 group-active:top-[0] group-active:left-[0] fill-in"></div>

      </button>
    );
  }
};
