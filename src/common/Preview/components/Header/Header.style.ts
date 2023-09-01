import {makeStyles} from 'tss-react/mui';

export const headerStyles = makeStyles()(() => ({
  container: {
    background: '#fff',
    display: 'flex',
    gap: '16px',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 144px',
    boxSizing: 'border-box',
    boxShadow: `0 1px 8px 0 rgba(0, 0, 0, 0.25)`,
    marginBottom: '40px',
  },
  logo: {
    width: '196px',
    '& > img': {
      width: 'inherit',
    },
  },
}));
