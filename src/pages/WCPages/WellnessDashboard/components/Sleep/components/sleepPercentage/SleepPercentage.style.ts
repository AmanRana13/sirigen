import {makeStyles} from 'tss-react/mui';

export const sleepPercentage = makeStyles()((theme: any) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    height: '52px',
    padding: '8px 15px',
    borderRadius: '8px',
    border: 'solid 2px #707070',
    justifyContent: 'space-between',
  },
  percentage: {
    fontSize: '30px',
    fontWeight: 'normal',
    color: theme.palette.customColor.percentBlue,
    marginLeft: '20px',
  },
}));
