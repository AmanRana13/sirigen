import React, {useMemo, useState} from 'react';
import moment from 'moment-timezone';
import clsx from 'clsx';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Box,
  Button,
  Tooltip,
} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import {DATE_FORMAT, ERROR_MESSAGE} from 'globals/global.constants';
import {InputFields} from 'common/InputFields';

import {resourcesDialogTableStyle} from './ResourcesDialogTable.style';
import InfoOutlined from '@mui/icons-material/InfoOutlined';

import {
  IResourcesTableProps,
  IResourcesTableRowProps,
  IResourcesTableRowsProps,
  IResource,
} from './ResourcesDialog.types';
import {resourcesDialogLayoutStyle} from './ResourcesDialogLayoutStyle';
import {showTextWithEllipsis} from 'globals/global.functions';
import {ResourceFormats} from 'globals/enums';

const Rows = React.memo((props: IResourcesTableRowProps) => {
  const {row, index, isError, handleChange, handleRemove, isDisabled} = props;
  const [remove, setRemove] = useState<string>('');
  const {classes} = resourcesDialogTableStyle();
  const {classes: rdClasses} = resourcesDialogLayoutStyle();
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    row: IResource,
  ) => {
    const description = e.target.value;
    handleChange(row.resourceId, description);
  };
  return (
    <React.Fragment>
      <TableRow
        data-testid='resourcesRow'
        className={clsx({
          [classes.root]: true,
          [classes.rowActive]: Boolean(remove),
        })}>
        <TableCell
          className={classes.tableBodyCell}
          align='center'
          component='th'
          scope='row'
          style={{
            width: '56px',
            maxWidth: '56px',
          }}>
          <Typography>{index + 1}</Typography>
        </TableCell>
        <TableCell
          className={clsx({
            [classes.tableBodyCell]: true,
            [classes.resourcesInputBox]: true,
          })}
          align='left'
          style={{
            width: '285px',
            maxWidth: '285px',
          }}>
          <InputFields
            isError={isError && row.description === ''}
            errorText={
              isError && row.description === ''
                ? ERROR_MESSAGE.REQUIRED_FIELD
                : ''
            }
            eventProps={{
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                handleDescriptionChange(e, row),
              value: row.description,
            }}
            key={row.name}
            inputProps={{
              name: `description`,
              placeholder: 'Please enter your description here',
              required: true,
              maxLength: 50,
              disabled: isDisabled,
              style: {padding: 0},
            }}
            multiline={true}
            rows={2}
          />
        </TableCell>
        <TableCell
          className={classes.tableBodyCell}
          align='left'
          style={{
            width: '264px',
            maxWidth: '264px',
            wordWrap: 'break-word',
          }}>
          {row.format === ResourceFormats.URL ? (
            <Box>
              <Tooltip
                title={<Typography variant='body1'>{row.name}</Typography>}
                arrow
                classes={{
                  arrow: rdClasses.tooltipArrow,
                  tooltip: `${rdClasses.tooltip} ${classes.url}`,
                }}>
                <div>
                  <a
                    href={row.name}
                    target='_blank'
                    rel='noreferrer'
                    className={classes.url}
                    style={{width: 'inherit'}}>
                    {showTextWithEllipsis(row.name, 81)}
                  </a>
                </div>
              </Tooltip>
            </Box>
          ) : (
            row.name
          )}
        </TableCell>
        <TableCell
          className={classes.tableBodyCell}
          align='left'
          style={{
            width: '99px',
            maxWidth: '99px',
          }}>
          {moment(row.date).format(`${DATE_FORMAT}`)}
        </TableCell>
        <TableCell
          align='left'
          className={classes.deleteIconCell}
          style={{
            width: '64px',
            maxWidth: '64px',
          }}>
          <HighlightOffIcon
            onClick={() => setRemove(row.name)}
            data-testid='handleRemove'
            className={clsx({
              [classes.removeIcon]: true,
              [classes.disabledRemove]: isDisabled,
            })}
          />
        </TableCell>
      </TableRow>
      {remove ? (
        <TableRow>
          <TableCell
            colSpan={6}
            align='center'
            className={classes.deleteAction}>
            <Box>
              <Typography
                display='flex'
                paddingBottom='12px'
                alignItems='center'
                justifyContent='center'
                gap='4px'>
                <InfoOutlined />
                Are you sure you want to delete this resource?
              </Typography>
              <Box display='flex' justifyContent='center' gap='22px'>
                <Button
                  data-testid='confirmDelete'
                  size='small'
                  variant='outlined'
                  onClick={() => setRemove('')}>
                  No
                </Button>
                <Button
                  data-testid='cancelDelete'
                  size='small'
                  color='primary'
                  variant='contained'
                  onClick={() => {
                    handleRemove(row.resourceId);
                    setRemove('');
                  }}>
                  Yes
                </Button>
              </Box>
            </Box>
          </TableCell>
        </TableRow>
      ) : null}
    </React.Fragment>
  );
});

const ResourcesTableRows = ({
  listInnerRef,
  data,
  isError,
  handleChange,
  handleRemove,
  isDisabled,
}: IResourcesTableRowsProps) => {
  const {classes} = resourcesDialogTableStyle();
  const {resourcesRowsData: resourcesTableData} = data;

  const headerData = useMemo(
    () => [
      {
        props: {
          className: classes.tableHeadCell,
          align: 'left',
          style: {
            width: '56px',
            maxWidth: '56px',
          },
        },
        label: 'No.',
      },
      {
        props: {
          className: classes.tableHeadCell,
          required: true,
          align: 'left',
          style: {
            width: '309px',
            maxWidth: '309px',
          },
        },
        label: 'Resource Description',
      },
      {
        props: {
          className: classes.tableHeadCell,
          align: 'left',
          style: {
            width: '264px',
            maxWidth: '264px',
          },
        },
        label: 'Resource',
      },
      {
        props: {
          className: classes.tableHeadCell,
          align: 'left',
          style: {
            width: '99px',
            maxWidth: '99px',
          },
        },
        label: 'Date',
      },
      {
        props: {
          className: classes.tableHeadCell,
          align: 'left',
          style: {
            width: '64px',
            maxWidth: '64px',
          },
        },
        label: '',
      },
    ],
    [classes],
  );

  return (
    <TableContainer
      className={classes.tableContainer}
      component={Paper}
      ref={listInnerRef}
      data-testid='resourcesTable'>
      <Table stickyHeader aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            {headerData.map((head: any, i) => (
              <TableCell key={head.label} {...head?.props}>
                {head.label}
                {head?.props.required && (
                  <Box component='span' className={classes.errorText}>
                    *
                  </Box>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {resourcesTableData?.length ? (
            resourcesTableData.map((data: IResource, index: number) => (
              <Rows
                key={data.resourceId}
                row={data}
                index={index}
                isError={isError}
                handleChange={handleChange}
                handleRemove={handleRemove}
                isDisabled={isDisabled}
              />
            ))
          ) : (
            <TableRow>
              <TableCell className={classes.noRecords} colSpan={5}>
                <Typography variant='body1'>No Records</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const ResourcesDialogTable = ({
  data,
  isError,
  handleChange,
  handleRemove,
  isDisabled,
}: IResourcesTableProps) => {
  const listInnerRef = React.useRef<HTMLTableElement>(null);
  return (
    <ResourcesTableRows
      listInnerRef={listInnerRef}
      data={data}
      isError={isError}
      handleChange={handleChange}
      handleRemove={handleRemove}
      isDisabled={isDisabled}
    />
  );
};

export default ResourcesDialogTable;
