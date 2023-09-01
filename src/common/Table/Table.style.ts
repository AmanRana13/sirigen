import {makeStyles} from 'tss-react/mui';

export const blueTableStyles = makeStyles()((theme: any) => ({
  table: {
    '& th, td': {
      fontSize: '16px',
      padding: '0',
    },
    '& th': {
      borderBottom: `1px solid ${theme.palette.customColor?.darkSeparator}`,
      padding: 0,
    },
    '& td': {
      verticalAlign: 'top',
      fontWeight: 'normal',
    },
  },
  row: {
    cursor: 'pointer',
    '&.active': {
      '& > td': {
        backgroundColor: theme.palette.customColor?.activeCellBackground,
      },
    },
  },
  singleSelectColorPrimary: {
    '&.Mui-checked': {
      color: theme.palette.customColor?.primaryLight,
    },
  },
}));

export const greenTableStyles = makeStyles()((theme: any) => ({
  table: {
    '& > thead > tr > th': {
      backgroundColor: theme.palette.background.green,
      fontWeight: 'bold',
    },
    '& th, td': {
      fontSize: '16px',
      padding: '0',
    },
    '& th': {
      borderBottom: `1px solid ${theme.palette.border.main}`,
      padding: '16px 0',
    },
    '& td': {
      verticalAlign: 'top',
      fontWeight: 'normal',
    },
    '& tbody tr:nth-child(even)': {
      backgroundColor: theme.palette.background.default,
    },
    '& tbody tr:nth-child(odd)': {
      backgroundColor: theme.palette.background.paper,
    },
  },
  row: {
    cursor: 'pointer',
    '&.active': {
      '& > td': {
        backgroundColor: theme.palette.background.green,
      },
    },
  },
  singleSelectColorPrimary: {
    '&.Mui-checked': {
      color: theme.palette.primary.light,
    },
  },
}));
