/* eslint-disable max-len */
import {
  Box,
  Checkbox,
  CircularProgress,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import {ITableColumn, ITableColumnData, ITableProps} from './Table.types';
import {
  PRIMARY_COLOR,
  SelectAllStatus,
  TableSelectionType,
} from 'globals/enums';
import React from 'react';
import {blueTableStyles, greenTableStyles} from './Table.style';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import clsx from 'clsx';
import {API_LOAD_STATE} from 'globals/global.constants';

/**
 * @description Table is a customizable table component with Single & MultipleSelect Feature
 * @param {ITableColumn[]} headerData data for rendering header cells of table
 * @param {string} rowId key for uniqueId in record
 * @param {TRecord[]} data actual data array
 * @param {ITableRowData} rowData data for rendering Row & its cells of table body
 * @param {TableSelectionType} selectionType type of selection single/multiple/none
 * @param {TRecord[]} selected selected items array
 * @param onChangeSelected setter function for updated list of selected items
 * @param isSelectable function to determine whether a record is selectable or not
 * @returns render Table
 */
function Table<TRecord extends Record<string, any>>({
  headerData,
  rowId,
  data,
  rowData,
  selectionType = TableSelectionType.NONE,
  selected = [],
  onChangeSelected = (selected: TRecord[]) => {},
  isSelectable = (record: TRecord) => true,
  noDataMessage = 'No Records',
  isDataLoading = API_LOAD_STATE.SUCCESSFUL,
  isFilterLoading = false,
  primaryColor = PRIMARY_COLOR.BLUE,
}: ITableProps<TRecord>) {
  const {classes: blueTableClasses} = blueTableStyles();
  const {classes: greenTableClasses} = greenTableStyles();
  const classes = React.useMemo(
    () =>
      primaryColor === PRIMARY_COLOR.GREEN
        ? greenTableClasses
        : blueTableClasses,
    [primaryColor],
  );

  /**
   * @description function to handle single select
   * @param record record to be selected or unselected
   */
  const handleSingleSelect = React.useCallback(
    (record: TRecord, fn: any) => {
      const currentSelection = selected[0];
      if (currentSelection?.[rowId] === record[rowId]) onChangeSelected([]);
      else onChangeSelected([record]);
    },
    [selected, onChangeSelected, rowId],
  );

  /**
   * @description function to handle multiple select
   * @param record record to be selected or unselected
   */
  const handleMultipleSelect = React.useCallback(
    (record: TRecord, fn: any) => {
      const index = selected.findIndex(
        (currentRecord) => record[rowId] === currentRecord[rowId],
      );
      if (index > -1) {
        onChangeSelected([
          ...selected.slice(0, index),
          ...selected.slice(index + 1),
        ]);
      } else onChangeSelected([...selected, record]);
    },
    [selected, onChangeSelected, rowId],
  );

  /**
   * @description get the handler to be used depending on TableSelection Type
   */
  const handleSelect = React.useMemo(() => {
    switch (selectionType) {
      case TableSelectionType.SINGLE:
        return handleSingleSelect;
      case TableSelectionType.MULTIPLE:
        return handleMultipleSelect;
      case TableSelectionType.ROW:
        return (record: any, fn: any) => {
          fn(record);
        };
      default:
        return (record: TRecord) => {};
    }
  }, [selectionType, handleSingleSelect, handleMultipleSelect]);

  /**
   * @description filter out the selectable records
   */
  const selectableData = React.useMemo<TRecord[]>(() => {
    return data.filter((record: TRecord) =>
      isSelectable ? isSelectable(record) : true,
    );
  }, [data, isSelectable]);

  /**
   * @description Determine the status of SelectAll whether All, Some or None are selected
   */
  const selectAllStatus = React.useMemo<SelectAllStatus>(() => {
    if (selectableData.length) {
      const currentSelected = selectableData.filter(
        (record: TRecord) =>
          selected.filter((rec: TRecord) => rec[rowId] === record[rowId])
            .length,
      );
      if (currentSelected.length === 0) return SelectAllStatus.NONE;
      else if (currentSelected.length === selectableData.length)
        return SelectAllStatus.ALL;
      else return SelectAllStatus.SOME;
    } else return SelectAllStatus.NONE;
  }, [selected, rowId, selectableData]);

  /**
   * @description handler for selectAll button
   */
  const handleSelectAll = React.useCallback(() => {
    let newSelected = selected;
    if (selectAllStatus === SelectAllStatus.NONE) {
      newSelected = [...selected, ...selectableData];
    } else {
      newSelected = selected.filter(
        (record: TRecord) =>
          !data.filter((rec: TRecord) => rec[rowId] === record[rowId]).length,
      );
    }
    onChangeSelected(newSelected);
  }, [
    selectAllStatus,
    selectableData,
    onChangeSelected,
    selected,
    data,
    rowId,
  ]);

  /**
   * @description function to determine whether a record is selected or not
   * @param record
   */
  const isSelected = React.useCallback(
    (record: TRecord) => {
      const index = selected.findIndex(
        (currentRecord) => record[rowId] === currentRecord[rowId],
      );
      return index > -1;
    },
    [selected, rowId],
  );

  return (
    <>
      <MuiTable
        classes={{root: classes.table}}
        stickyHeader
        data-testid='table-component'>
        <TableHead>
          <TableRow>
            {selectionType === TableSelectionType.SINGLE && (
              <TableCell width='48px' style={{padding: '0'}} />
            )}
            {selectionType === TableSelectionType.MULTIPLE && (
              <TableCell width='48px' style={{padding: '0'}}>
                <Box display='flex' alignItems='center'>
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon />}
                    checkedIcon={
                      selectAllStatus === SelectAllStatus.ALL ? (
                        <CheckBoxIcon />
                      ) : (
                        <IndeterminateCheckBoxIcon />
                      )
                    }
                    checked={selectAllStatus !== SelectAllStatus.NONE}
                    onClick={handleSelectAll}
                    disabled={selectableData.length === 0}
                    sx={{
                      padding: '2px 4px',
                      transform: 'scale(1.15)',
                      color: '#000',
                    }}
                    data-testid='select-all'
                  />
                </Box>
              </TableCell>
            )}
            {headerData.map((columnData: ITableColumn) => {
              const {columnId, label, render, ...columnProps} = columnData;
              return (
                <TableCell key={columnId} {...columnProps}>
                  {render ? (
                    render()
                  ) : (
                    <Box padding='4px 4px 2px 4px'>{label}</Box>
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        {!isFilterLoading &&
          isDataLoading === API_LOAD_STATE.SUCCESSFUL &&
          data?.length > 0 && (
            <TableBody>
              {data?.map((record: TRecord) => {
                const {
                  values,
                  className,
                  onRowClick = (event: any, rowData: any) => {},
                  ...rowProps
                } = rowData;
                const active = isSelected(record);
                const selectable = isSelectable(record);
                return (
                  <TableRow
                    key={record[rowId]}
                    className={clsx(className, {
                      [classes.row]:
                        selectionType !== TableSelectionType.NONE && selectable,
                      active: selectable && active,
                    })}
                    onClick={
                      selectable
                        ? () => handleSelect(record, onRowClick)
                        : () => {}
                    }
                    {...rowProps}
                    data-testid='table-row'>
                    {selectionType === TableSelectionType.SINGLE && (
                      <TableCell
                        width='48px'
                        style={{
                          padding: '0',
                          verticalAlign: 'middle',
                        }}>
                        <Box display='flex' alignItems='center'>
                          <Checkbox
                            icon={<CheckCircleOutlineIcon />}
                            checkedIcon={<CheckCircleIcon />}
                            checked={active}
                            disabled={!selectable}
                            classes={{
                              checked: classes.singleSelectColorPrimary,
                            }}
                            sx={{
                              padding: '2px 4px',
                              transform: 'scale(1.15)',
                            }}
                          />
                        </Box>
                      </TableCell>
                    )}
                    {selectionType === TableSelectionType.MULTIPLE && (
                      <TableCell
                        width='48px'
                        style={{
                          padding: '0',
                          verticalAlign: 'middle',
                        }}>
                        <Box display='flex' alignItems='center'>
                          <Checkbox
                            icon={<CheckBoxOutlineBlankIcon />}
                            checkedIcon={<CheckBoxIcon />}
                            checked={active}
                            disabled={!selectable}
                            sx={{
                              padding: '2px 4px',
                              transform: 'scale(1.15)',
                              color: '#000',
                            }}
                          />
                        </Box>
                      </TableCell>
                    )}
                    {values.map((columnData: ITableColumnData<TRecord>) => {
                      const {dataId, dataKey, format, render, ...columnProps} =
                        columnData;
                      const value = record[dataId];
                      return (
                        <TableCell key={dataKey || dataId} {...columnProps}>
                          {render ? (
                            render(value, record)
                          ) : (
                            <Box padding='12.5px 4px'>
                              {format ? format(value) : value}
                            </Box>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          )}
      </MuiTable>
      {!isFilterLoading &&
        isDataLoading !== API_LOAD_STATE.PROGRESS &&
        !data?.length && (
          <Box
            typography='body1'
            textAlign='center'
            padding='12.5px'
            width='100%'
            style={{marginTop: 108}}>
            {noDataMessage}
          </Box>
        )}
      {(isDataLoading === API_LOAD_STATE.PROGRESS || isFilterLoading) && (
        <Box
          textAlign='center'
          padding='12.5px'
          width='100%'
          data-testid='loader'>
          <CircularProgress />
        </Box>
      )}
    </>
  );
}

export default Table;
