import {TableContainer} from '@mui/material';
import Table from 'common/Table/Table.component';
import {ITableColumn, ITableRowData} from 'common/Table/Table.types';
import {PRIMARY_COLOR} from 'globals/enums';
import {DATE_FORMAT} from 'globals/global.constants';
import moment from 'moment';
import {ICareInsightHistory} from 'pages/WCPages/SeniorCareInsights/SeniorCareInsight.state';

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
    columnId: 'message',
    label: 'Message',
    style: {
      paddingRight: '40px',
    },
  },
];

const ROW_DATA: ITableRowData<ICareInsightHistory> = {
  values: [
    {
      dataId: 'dateUpdated',
      dataKey: 'date',
      format: (value) => moment(value).format(DATE_FORMAT),
      style: {
        paddingLeft: '40px',
        width: '160px',
        maxWidth: '160px',
      },
    },
    {
      dataId: 'dateUpdated',
      dataKey: 'time',
      format: (value) => moment(value).format('hh:mm'),
      style: {
        width: '80px',
        maxWidth: '80px',
      },
    },
    {
      dataId: 'message',
      style: {
        paddingRight: '40px',
      },
    },
  ],
};

const FacilitySummaryTable = ({
  data = [],
  loading = false,
}: {
  data: ICareInsightHistory[];
  loading?: boolean;
}) => {
  return (
    <TableContainer
      sx={{maxHeight: '475px', height: '475px'}}
      data-testid='facilitySummaryTableContainer'>
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

export default FacilitySummaryTable;
