import clsx from "clsx";

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
        className={clsx(
          "group relative h-14 w-48 border-2 border-black px-6 py-3 transition-transform duration-300",
        )}
      >
        <span className="absolute left-3 top-3 text-lg font-light">
          <code>&#8212;</code> {title}
        </span>
        <div className="fill-in absolute left-2 top-2 z-[-1] h-full w-full bg-purple-200 group-active:left-[0] group-active:top-[0]"></div>
      </button>
    );
  }

  if (size === "medium") {
    return (
      <button
        className="group relative h-14 w-52 border-2 border-black px-6 py-3"
        {...buttonProps}
      >
        <span className="absolute left-3 top-3 text-lg font-light">
          <code>&#8212;</code> {title}
        </span>
        <div className="fill-in absolute left-2 top-2 z-[-1] h-full w-full bg-purple-200 group-active:left-[0] group-active:top-[0]"></div>
      </button>
    );
  }
};

export default Button;
