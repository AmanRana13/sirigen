import {makeStyles} from 'tss-react/mui';

export const residentDashboardStyle = makeStyles()((theme: any) => ({
  tableCard: {
    borderRadius: '16px',
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.16)',
    backgroundColor: theme.palette.background.paper,
  },
  dashboardTitle: {
    color: theme.palette.customColor.titleBlack,
  },
}));
