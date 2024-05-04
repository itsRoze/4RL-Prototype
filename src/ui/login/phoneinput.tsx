const PhoneInput = () => {
  return (
    <input
      type="tel"
      placeholder="Phone"
      required
      name="phone"
      autoFocus
      className="focus-visible:ring-ring w-11/12 flex-1 bg-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
      maxLength={10}
    />
  );
};

export default PhoneInput;
