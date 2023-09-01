import React from 'react';
import SeniorCallSchedule from 'pages/WCPages/SeniorCallSchedule';

const AllCallSchedule = (props: any) => {
  return <SeniorCallSchedule noHeader={true} {...props} listAll={true} />;
};

export default AllCallSchedule;
