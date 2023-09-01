import {makeStyles} from 'tss-react/mui';
import {MUThemeOptionsV2} from 'config/theme.config';

export const CareInsightReviewStyle = makeStyles()(
  (theme: MUThemeOptionsV2) => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      padding: '30px 25px 45px 25px',
      borderRadius: '16px',
      boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.16)',
      border: `solid 1px ${theme.palette.grey.A100}`,
      backgroundColor: theme.palette.background.default,
    },
    tableContainer: {
      minHeight: '63vh',
      maxHeight: '63vh',
      '&::-webkit-scrollbar': {
        width: 8,
        height: 8,
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.primary.light,
        borderRadius: 4,
      },

      '& #senior': {
        minWidth: 180,
        paddingLeft: 4,
      },
      '& #agent': {
        minWidth: 180,
      },
      '& #date': {
        minWidth: 99,
      },
      '& #time': {
        minWidth: 99,
      },
      '& #type': {
        minWidth: 104,
      },
      '& #message': {
        minWidth: 320,
      },
      '& th:not(:last-child)': {},
      '& th:first-child': {
        paddingLeft: 4,
      },
    },

    CareInsightReviewText: {
      color: theme.palette.primary.main,
      marginBottom: '24px',
      fontWeight: 500,
    },

    tableHeadCell: {
      fontSize: '14px',
      color: theme.palette.text.primary,
      padding: '0px 0px 10px 0px',
      borderBottom: `1px solid ${theme.palette.grey.A200}`,
    },
    tableBodyCell: {
      fontSize: '16px',
      color: theme.palette.text.primary,
      padding: '15px 0px 35px 0px',
      borderBottom: `1px solid ${theme.palette.grey.A200}`,
    },
    tableExpandedSeniorCell: {
      fontSize: '16px',
      color: theme.palette.text.primary,
      padding: '15px 0px 35px 0px',
      borderBottom: 'none',
      verticalAlign: 'top',
    },
    expandIconCell: {
      width: '0%',
      padding: '19px 12px 10px 10px',
      borderBottom: 'none',
      verticalAlign: 'top',
    },
    collapsedIcon: {
      width: '0%',
      padding: '19px 15px',
      borderBottom: `1px solid ${theme.palette.grey.A200}`,
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
    noData: {
      borderBottom: 'none',
      height: '54vh',
      fontWeight: 500,
      fontSize: '26px',
    },
    hiddenMsg: {
      '& p': {
        overflow: 'hidden',
        'word-break': 'break-word',
        display: '-webkit-box',
        '-webkit-line-clamp': 2,
        '-webkit-box-orient': 'vertical',
        textOverflow: 'ellipsis',
      },
      maxHeight: '55px',
      minHeight: '55px',
      padding: '15px 0px 15px 0px',
      fontSize: '16px',
      color: theme.palette.text.primary,
    },
    messageBorder: {
      borderBottom: `1px solid ${theme.palette.grey.A200}`,
    },
    buttonsContainer: {
      fontSize: '16px',
      color: theme.palette.text.primary,
      borderBottom: 'none',
      padding: '0px 0px 20px 0px',
    },
    btns: {
      borderBottom: `1px solid ${theme.palette.grey.A200}`,
      paddingTop: '13px',
    },
    expandedView: {
      padding: 0,
      backgroundColor: '#DFF4F3',
    },
    textFieldMessage: {
      width: '-webkit-fill-available',
      backgroundColor: '#fff',
    },
    expandedAlignment: {
      alignItems: 'center',
    },
    buttonsInnerContainer: {
      display: 'flex',
      justifyContent: 'space-evenly',
      margin: 'auto',
      width: '50%',
    },
  }),
);
