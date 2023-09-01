import {makeStyles} from 'tss-react/mui';

export const headerStyles = makeStyles()(() => ({
  container: {
    background: '#fff',
    display: 'flex',
    gap: '60px',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '48px 144px',
    boxSizing: 'border-box',
    boxShadow: `0 1px 8px 0 rgba(0, 0, 0, 0.25)`,
    marginBottom: '60px',
  },
  logo: {
    width: '468px',
    '& > img': {
      width: 'inherit',
    },
  },
}));
