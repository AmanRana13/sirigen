import React from 'react';

interface StateCityFormatterProps {
  city: string;
  state: string;
}

/**
 * @description React component to display City and State name.
 * @param {StateCityFormatterProps} props 
 * @returns JSX
 */
const StateCityFormatter = (props: StateCityFormatterProps) => {
  const {city, state} = props;

  if (!city) {
    return <React.Fragment>-</React.Fragment>;
  }
  return (
    <React.Fragment>
      {city},&nbsp;{state}
    </React.Fragment>
  );
};

export default StateCityFormatter;
