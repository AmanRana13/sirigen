import {makeStyles} from 'tss-react/mui';

export const previewStyles = makeStyles()((theme: any) => ({
  toolbar: {
    height: '80px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  close: {
    margin: '0 36px',
  },
}));
