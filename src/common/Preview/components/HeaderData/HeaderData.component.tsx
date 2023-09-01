import {Box, Typography} from '@mui/material';
import {headerDataStyles} from './HeaderData.style';
import {IHeaderDataProps} from './HeaderData.types';

const HeaderData = (props: IHeaderDataProps) => {
  const {classes} = headerDataStyles();
  const {heading, subheading} = props;
  return (
    <Box className={classes.headerData} data-testid='preview-header-data'>
      <Typography component='h1' className={classes.heading}>
        {heading}
      </Typography>
      <Typography component='h2' className={classes.subheading}>
        {subheading}
      </Typography>
    </Box>
  );
};

export default HeaderData;
