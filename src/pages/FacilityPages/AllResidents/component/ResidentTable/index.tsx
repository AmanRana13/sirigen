import React from 'react';
import {Box, TableContainer} from '@mui/material';
import {ResidentTableStyle} from './table.style';
import ZoneChip from 'common/ZoneChip/ZoneChip';
import SeniorInfo from '../../../../../assets/icons/SeniorInfo.svg';
import Table from 'common/Table/Table.component';
import {constructName, constructNameInitials} from 'globals/global.functions';
import {ITableRowData} from 'common/Table/Table.types';
import get from 'lodash.get';
import AvatarComponent from 'common/Avatar/Avatar.component';
import {PRIMARY_COLOR, TableSelectionType} from 'globals/enums';
import {useNavigate} from 'react-router-dom';

const ResidentTable = () => {
  const tableData = [
    {
      id: '1',
      userImage: SeniorInfo,
      name: {
        firstName: 'Resident',
        lastName: 'user',
      },
      LOS: '10',
      zoneType: 'Green',
      WellnessCoach: 'Harry Griffith',
      seniorId: 'senior-f137e97a909b4829adf9798b4c2cd277',
      accountId: '3fbb88bf935c4955952469e9fa9e207a',
      timezone: 'America-Chicago',
    },
    {
      id: '2',
      userImage: SeniorInfo,
      name: {
        firstName: 'David',
        lastName: 'Dobrik',
      },
      LOS: '20',
      zoneType: 'Blue',
      WellnessCoach: 'Harry Griffith',
    },
    {
      id: '3',
      userImage: SeniorInfo,
      name: {
        firstName: 'David',
        lastName: 'Dobrik',
      },
      LOS: '50',
      zoneType: 'Vimient',
      WellnessCoach: 'Harry Griffith',
    },
    {
      id: '3',
      userImage: SeniorInfo,
      name: {
        firstName: 'David',
        lastName: 'Dobrik',
      },
      LOS: '50',
      zoneType: 'White',
      WellnessCoach: 'Harry Griffith',
    },
    {
      id: '5',
      userImage: SeniorInfo,
      name: {
        firstName: 'Resident',
        lastName: 'User Test',
      },
      LOS: '10',
      zoneType: 'Green',
      WellnessCoach: 'Harry Griffith',
    },
    {
      id: '7',
      userImage: SeniorInfo,
      name: {
        firstName: 'Melissa',
        lastName: 'Rose',
      },
      LOS: '10',
      zoneType: 'Green',
      WellnessCoach: 'Harry Griffith',
      seniorId: 'senior-f300a4c4515d41ddabbac003cf07c32c',
      accountId: 'f2c3889fc0f9448d844be611578efc79',
      timezone: 'America-New_York',
    },
  ];
  const {classes} = ResidentTableStyle();

  const headerData = React.useMemo(
    () => [
      {
        columnId: 'name',
        label: 'Name',
        style: {
          paddingLeft: '40px',
        },
      },
      {columnId: 'LOS', label: 'LOS'},
      {columnId: 'zoneType', label: 'Zone'},
      {
        columnId: 'WellnessCoach',
        label: 'Wellness Coach',
      },
    ],
    [],
  );
  const navigate = useNavigate();

  const rowData = React.useMemo<ITableRowData<any>>(
    () => ({
      onRowClick: (rowData: any) => {
        navigate(
          `${rowData.seniorId}/${rowData.accountId}/${rowData.timezone}`,
        );
      },
      values: [
        {
          dataId: 'name',
          className: classes.tableCellStyle,
          style: {
            paddingLeft: '40px',
          },
          render: (name, value) => {
            return (
              <Box
                style={{
                  alignItems: 'center',
                  display: 'flex',
                }}>
                <AvatarComponent
                  style={{border: 'solid 1px #707070'}}
                  altText='senior-profile-image'
                  imageUrl={`data:image/${get(
                    value.userImage,
                    'format',
                  )};base64, ${get(value.userImage, 'image')}`}
                  child={constructNameInitials(name?.firstName, name?.lastName)}
                  className={classes.avatarStyle}
                />

                <Box component='span'>
                  {constructName(name.firstName, name.lastName)}
                </Box>
              </Box>
            );
          },
        },
        {
          dataId: 'LOS',
          className: classes.tableCellStyle,
        },
        {
          dataId: 'zoneType',
          render(zoneType) {
            return (
              <Box className='zone' display='flex' alignItems='center'>
                <ZoneChip zoneType={zoneType} />
              </Box>
            );
          },
          className: classes.tableCellStyle,
        },
        {
          dataId: 'WellnessCoach',
          className: classes.tableCellStyle,
        },
      ],
    }),
    [],
  );

  return (
    <TableContainer sx={{maxHeight: '475px', height: '475px'}}>
      <Table
        isSelectable={() => true}
        selectionType={TableSelectionType.ROW}
        headerData={headerData}
        rowId='userId'
        rowData={rowData}
        data={tableData}
        primaryColor={PRIMARY_COLOR.GREEN}
      />
    </TableContainer>
  );
};

export default ResidentTable;
