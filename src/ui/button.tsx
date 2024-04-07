interface Props {
  title: string;
}

export const Button: React.FC<Props> = ({ title }) => {
  return (
    <button className="broken-border relative py-3 pr-4">
      <svg
        width="183"
        height="55"
        viewBox="0 0 183 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -left-6 top-0"
      >
        <path
          d="M23.4526 1H181.744V54H173.885M169.02 54H163.781M143.948 54H1V1H6.98737"
          stroke="black"
        />
      </svg>
      <span className="-ml-1 font-light uppercase text-lg">
        <code>&#8212;</code> {title}
      </span>
    </button>
  );
};
