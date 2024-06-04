interface Props {
  message: string;
}

const ErrorCallout: React.FC<Props> = ({ message }) => {
  return <p className="w-full py-2 text-sm text-red-600">{message}</p>;
};

export default ErrorCallout;
