const zipcode_to_timezone = require('zipcode-to-timezone');

const isValidZipcode = (value: string | number) => {
  const tz = zipcode_to_timezone.lookup(value);
  if (tz) {
    return true;
  }
  return false;
};

export default isValidZipcode;
