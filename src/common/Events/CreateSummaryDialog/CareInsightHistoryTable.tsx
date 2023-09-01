import React from 'react';

import {
  TableContainer,
  TableHead,
  TableCell,
  Table,
  TableRow,
  TableBody,
} from '@mui/material';
import {createSummaryMaximizeStyle} from './CreateSummaryMaximize.style';
import {
  ICareInsightHistoryTableProps,
  ITableBodyRowDataProps,
  tableColumns,
} from './CreateSummaryMaximize.types';
import {ICareInsightHistory} from '../../../pages/WCPages/SeniorCareInsights/SeniorCareInsight.state';
import {capitalizeFirstLetter} from 'globals/global.functions';
import {getFormatedDateTime} from 'globals/date.functions';
import {CareInsightStatus} from 'globals/enums';

/**
 * @description show data of care insight history table.
 * @returns {JSX}
 */
const TableBodyRowData = ({rowData, columnData}: ITableBodyRowDataProps) => {
  const {classes} = createSummaryMaximizeStyle();

  let value: any = rowData[columnData.id];
  switch (columnData.id) {
    case 'dateGenerated':
      value = getFormatedDateTime(value);
      break;

    case 'status':
      value =
        value === CareInsightStatus.Approved ||
        value === CareInsightStatus.Sent ||
        value === CareInsightStatus.ApprovedWithEdit
          ? 'Yes'
          : 'No';
      break;

    case 'vitalSign':
      value = rowData.vitalLabel;
      break;

    case 'range':
      if (!rowData.range.goodLower || !rowData.range.goodUpper) {
        value = '-';
      } else {
        value = `${rowData.range.goodLower}-${rowData.range.goodUpper} ${rowData.meassurementUnit}`;
      }
      break;

    case 'variable':
      value = value ? capitalizeFirstLetter(String(value)) : '-';
      break;

    case 'reading':
      value = value ? `${value} ${rowData.meassurementUnit}` : '-';
      break;

    default:
      value = rowData[columnData.id];
      break;
  }

  return (
    <TableCell
      component='th'
      scope='row'
      key={columnData.id}
      align='center'
      className={classes.tableDataCell}>
      {value}
    </TableCell>
  );
};

/**
 * @description show header of care insight history table.
 * @param {ICareInsightHistoryTableProps} historyData
 * @returns {JSX}
 */
const CareInsightHistoryTable = ({
  historyData,
}: ICareInsightHistoryTableProps) => {
  const {classes} = createSummaryMaximizeStyle();
  return (
    <TableContainer className={classes.tableContainer}>
      <Table stickyHeader aria-label='sticky table'>
        <TableHead>
          <TableRow>
            {tableColumns.map((column) => (
              <TableCell
                key={column.id}
                align='center'
                style={{minWidth: column.minWidth}}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {historyData.map((row: ICareInsightHistory) => {
            return (
              <TableRow hover key={row.careInsightId}>
                {tableColumns.map((column) => (
                  <TableBodyRowData
                    key={column.id}
                    rowData={row}
                    columnData={column}
                  />
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CareInsightHistoryTable;
