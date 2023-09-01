import {makeStyles} from 'tss-react/mui';
import {MUThemeOptionsV2} from 'config/theme.config';

export const cIRangeMilestonesTableStyle = makeStyles()(
  (theme: MUThemeOptionsV2) => ({
    tableContainer: {
      minHeight: '63vh',
      marginBottom: '2%',
    },
    tableHeadCell: {
      fontSize: '14px',
      color: theme.palette.text.primary,
      padding: '30px 0px 10px 25px',
      borderBottom: `1px solid ${theme.palette.grey.A200}`,
    },
    tableBodyCell: {
      fontSize: '16px',
      color: theme.palette.text.primary,
      padding: '28px 0px 28px 25px',
      borderBottom: `1px solid ${theme.palette.grey.A200}`,
    },
    noData: {
      borderBottom: 'none',
      height: '54vh',
      fontWeight: 500,
      fontSize: '26px',
    },
    arrowButton: {
      width: '32px',
      height: '32px',
      backgroundColor: '#00a9cf',
      color: theme.palette.background.default,
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.background.default,
      },
    },
    iconCell: {
      borderBottom: `1px solid ${theme.palette.grey.A200}`,
      padding: '16px 0px 16px 16px',
    },
  }),
);
