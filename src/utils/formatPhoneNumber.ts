export const formatPhoneNumber = (phoneNumber: string) => {
  // Assuming the string is always a valid 11-digit number
  // and follows the format: Country Code (1 digit) + Area Code (3 digits) + Number (7 digits)
  const countryCode = phoneNumber.slice(0, 1);
  const areaCode = phoneNumber.slice(1, 4);
  const firstPart = phoneNumber.slice(4, 7);
  const secondPart = phoneNumber.slice(7);

  return `+${countryCode} (${areaCode}) ${firstPart}-${secondPart}`;
};
