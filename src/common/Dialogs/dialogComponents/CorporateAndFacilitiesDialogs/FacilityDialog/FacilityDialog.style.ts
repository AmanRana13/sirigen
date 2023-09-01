import {makeStyles} from 'tss-react/mui';

export const facilityDialogStyle = makeStyles()((theme: any) => ({
  form: {
    padding: '30px 0',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  errorText: {
    color: theme.palette.customColor.error,
  },
}));
