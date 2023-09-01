import {makeStyles} from 'tss-react/mui';

export const facilityBreadcrumbs: any = makeStyles()((theme: any) => ({
  breadcrumb: {
    backgroundColor: theme.palette.background.green,
    padding: '26px 60px',
    fontSize: '20px',
    borderRadius: '16px',
  },
  disableLink: {
    pointerEvents: 'none',
    color: 'grey',
  },
}));
