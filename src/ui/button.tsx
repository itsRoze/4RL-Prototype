interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export const Button: React.FC<Props> = ({ title }) => {
  return (
    <button className="broken-border border-2 py-3 px-6 border-black w-48 h-14 relative">
      <span className="font-light text-lg absolute top-3 left-3">
        <code>&#8212;</code> {title}
      </span>
    </button>
  );
};
