import {makeStyles} from 'tss-react/mui';

export const metaBoxStyles = makeStyles()((theme: any) => ({
  container: {
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
    border: 'solid 1px rgba(0, 0, 0, 0.25)',
    backgroundColor: theme.palette.customColor.white,
    margin: '0 144px',
    gap: '20px',
  },
}));

export const detailStyles = makeStyles()((theme: any) => ({
  firstLabel: {
    ...theme.customTypography.normal,
    textAlign: 'left',
    fontWeight: 'bold',
    color: theme.palette.customColor.black,
  },
  secondLabel: {
    ...theme.customTypography.normal,
    textAlign: 'left',
    fontWeight: 'bold',
    color: theme.palette.customColor.black,
  },
  detailText: {
    ...theme.customTypography.normal,
    textAlign: 'left',
    color: theme.palette.customColor.black,
    wordBreak: 'break-word',
  },
}));
