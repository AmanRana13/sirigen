import {Box, Button, Typography} from '@mui/material';
import Headers from './Header.style';
import {maskPhoneNumber} from 'globals/global.functions';
import {useCallback, useMemo} from 'react';
import ShowHyphen from 'common/ShowHyphen/ShowHyphen';

const Header = () => {
  const {classes} = Headers();
  const data = useMemo(
    () => [
      {label: 'Facility', value: 'Atria Tamarac Florida Florida'},
      {label: 'Location', value: 'Newburyport'},
      {label: 'Phone', value: maskPhoneNumber('8007779999')},
      {label: 'Residents', value: '13'},
    ],
    [],
  );
  const HeaderItems = useCallback(({label, value}: any) => {
    return (
      <Box gap={50}>
        <Typography component='span' variant='body1Bold'>
          {label}:&nbsp;
        </Typography>
        <Typography component='span' variant='subtitle1'>
          <ShowHyphen>{value}</ShowHyphen>
        </Typography>
      </Box>
    );
  }, []);

  return (
    <Box className={classes.container}>
      <Box className={classes.InnerContainer} display='flex'>
        {data.map((item) => {
          return (
            <HeaderItems
              key={item.label}
              label={item.label}
              value={item.value}
            />
          );
        })}
        <Button color='primary' variant='contained' className={classes.button}>
          Facility Dashboard
        </Button>
      </Box>
    </Box>
  );
};
export default Header;
