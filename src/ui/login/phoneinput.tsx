const PhoneInput = () => {
  return (
    <input
      type="tel"
      placeholder="Phone"
      autoFocus
      className="w-11/12 flex-1 bg-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
    />
  );
};

export default PhoneInput;
