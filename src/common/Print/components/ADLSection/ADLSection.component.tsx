import {
  Box,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import {InputFields} from '../InputFields';
import {adlSectionStyles} from './ADLSection.style';
import {IADLSectionProps} from './ADLSection.types';

const ADLSection = (props: IADLSectionProps) => {
  const {title = '', options = []} = props;
  const {classes} = adlSectionStyles();
  const getValue = (radioData: any) => {
    const selectedOption = radioData?.find((data: any) => data.score === 1);
    return selectedOption?.label || '';
  };

  return (
    <Box
      component='section'
      className={classes.section}
      data-testid='adl-section'>
      <Box className={classes.header}>
        <div className={classes.heading}>{title}</div>
      </Box>
      <TableContainer style={{padding: '10px'}}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align='left' style={{borderBottom: 'none'}}>
                <Box>
                  <InputFields
                    showRadioLabel={true}
                    radio={true}
                    inputProps={{
                      name: `radio`,
                      style: {
                        padding: '2px 10px 2px 2px',
                      },
                    }}
                    eventProps={{
                      value: getValue(options),
                    }}
                    radioItems={options.map((option: any) => {
                      return {
                        value: option.label,
                        label: `${option.value}-${option.label}`,
                      };
                    })}
                    className={classes.radioGroup}
                  />
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ADLSection;
