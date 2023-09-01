import {Box} from '@mui/material';
import RoleBaseRender from 'common/RoleBaseRender/RoleBaseRender';
import {Roles} from 'globals/enums';
import {residentSubPages} from 'globals/global.constants';
import {changeDocumentTitle} from 'globals/global.functions';
import SeniorLocation from 'pages/WCPages/SeniorLocation/SeniorLocation.component';
import WellnessDashboard from 'pages/WCPages/WellnessDashboard/WellnessDashboard.component';
import React from 'react';
import {useParams} from 'react-router-dom';

const ResidentSubPages = () => {
  const {subRoute} = useParams();
  const changeTitle = React.useCallback((title: string) => {
    setTimeout(() => {
      changeDocumentTitle(title);
    }, 360);
  }, []);
  switch (subRoute) {
    case residentSubPages.wellnessData.path:
      changeTitle(residentSubPages.wellnessData.title);
      return (
        <RoleBaseRender forRole={[Roles.Admin]}>
          <Box marginTop='30px'>
            <WellnessDashboard />
          </Box>
        </RoleBaseRender>
      );
    case residentSubPages.location.path:
      changeTitle(residentSubPages.location.title);
      return (
        <RoleBaseRender forRole={[Roles.Admin]}>
          <Box marginTop='30px'>
            <SeniorLocation />
          </Box>
        </RoleBaseRender>
      );
    default:
      return <></>;
  }
};

export default ResidentSubPages;
