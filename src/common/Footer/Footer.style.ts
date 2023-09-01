import {makeStyles} from 'tss-react/mui';

export const footerStyle = makeStyles()((theme: any) => ({
  container: {
    borderTop: `1px solid ${theme.palette.common.border}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    clear: 'both',
    position: 'relative',
    height: theme.footerHeight,
    marginTop: theme.footerHeight,
    padding: `0 5%`,
  },
}));
