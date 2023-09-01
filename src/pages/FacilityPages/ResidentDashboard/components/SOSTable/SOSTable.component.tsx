import {TableContainer} from '@mui/material';
import Table from 'common/Table/Table.component';
import {ITableColumn, ITableRowData} from 'common/Table/Table.types';
import {PRIMARY_COLOR} from 'globals/enums';
import {DATE_FORMAT} from 'globals/global.constants';
import {getTimestamp} from 'globals/global.functions';
import moment from 'moment';

const HEADER_DATA: ITableColumn[] = [
  {
    columnId: 'date',
    label: 'Date',
    style: {
      paddingLeft: '40px',
    },
  },
  {
    columnId: 'time',
    label: 'Time',
  },
  {
    columnId: 'type',
    label: 'Type',
    style: {
      paddingRight: '40px',
    },
  },
];

const ROW_DATA: ITableRowData<any> = {
  values: [
    {
      dataId: 'time',
      dataKey: 'date',
      format: (value) => {
        return moment(getTimestamp(value)).format(DATE_FORMAT);
      },
      style: {
        paddingLeft: '40px',
      },
    },
    {
      dataId: 'time',
      dataKey: 'time',
      format: (value) => moment(getTimestamp(value)).format('hh:mm'),
    },
    {
      dataId: 'type',
      style: {
        paddingRight: '40px',
      },
    },
  ],
};

const SOSTable = ({
  data = [],
  loading = false,
  width = '370px',
  height = '475px',
}: {
  data: any[];
  loading?: boolean;
  width?: string;
  height?: string;
}) => {
  return (
    <TableContainer
      sx={{height: height, width: width}}
      data-testid='SOSTableContainer'>
      <Table
        rowId='careInsightId'
        rowData={ROW_DATA}
        headerData={HEADER_DATA}
        primaryColor={PRIMARY_COLOR.GREEN}
        data={data}
        isFilterLoading={loading}
      />
    </TableContainer>
  );
};

export default SOSTable;
