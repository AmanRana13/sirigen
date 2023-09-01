import {makeStyles} from 'tss-react/mui';

export const headerDataStyles = makeStyles()((theme: any) => ({
  headerData: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    textAlign: 'right',
    gap: '12px',
  },
  heading: {
    ...theme.customTypography.heading,
    color: `${theme.palette.customColor.primaryLight}`,
  },
  subheading: {
    ...theme.customTypography.subheading,
    color: `${theme.palette.customColor.black}`,
  },
}));
