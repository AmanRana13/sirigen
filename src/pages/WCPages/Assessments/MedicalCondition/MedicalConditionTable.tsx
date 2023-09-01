import React from 'react';
import {useAppSelector} from 'hooks/reduxHooks';
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {
  IMedicalConditionData,
  IMedicalConditionTableProps,
} from './MedicalCondition.types';
import MedicalConditionTableRow from './MedicalConditionTableRow';

const tableHeaderData = [
  {
    label: 'Medical Condition',
    width: 210,
  },
  {
    label: 'Severity Level',
    width: 115,
  },
  {
    label: 'Date of Onset',
    width: 161,
  },
  {
    label: 'Notes',
    width: 550,
  },
  {
    label: '',
    width: 30,
  },
];
const MedicalConditionTable = ({
  disabled,
  data: medicalConditionData,
  setMedicalConditionData,
  setDeletedMedicalConditions,
  setModifiedMedicalConditions,
  setError,
}: IMedicalConditionTableProps) => {
  const {loading} = useAppSelector((state: any) => state.assessments);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {tableHeaderData.map((column: any): any => {
              return (
                <TableCell
                  key={column.label}
                  align='left'
                  width={column?.width}
                  style={{
                    borderBottom: '1px solid #707070',
                    paddingLeft: 0,
                  }}>
                  <Typography variant='body1Bold'>{column.label}</Typography>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow
              style={{
                height: '32vh',
                textAlign: 'center',
              }}>
              <TableCell colSpan={8} align='center'>
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : medicalConditionData?.length === 0 ? (
            <TableRow
              style={{
                height: '32vh',
                textAlign: 'center',
              }}>
              <TableCell colSpan={8} align='center'>
                No Record Found
              </TableCell>
            </TableRow>
          ) : (
            medicalConditionData?.map(
              (medicalCondition: IMedicalConditionData) => {
                return (
                  <MedicalConditionTableRow
                    key={`${medicalCondition.condition}_${medicalCondition.modification_date}`}
                    {...medicalCondition}
                    disabled={disabled}
                    setError={setError}
                    setMedicalConditionData={setMedicalConditionData}
                    setDeletedMedicalConditions={setDeletedMedicalConditions}
                    setModifiedMedicalConditions={setModifiedMedicalConditions}
                  />
                );
              },
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MedicalConditionTable;
