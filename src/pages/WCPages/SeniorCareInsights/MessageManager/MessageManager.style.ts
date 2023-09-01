import {makeStyles} from 'tss-react/mui';

export const messageManagerStyle = makeStyles()((theme: any) => ({
  container: {
    backgroundColor: theme.palette.customColor.white,
    boxShadow: `0 8px 12px ${theme.palette.customColor.boxShadow}`,
    borderRadius: `0 0 16px 16px`,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 3,
    padding: 20,
  },
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  tableContainer: {
    maxHeight: '75vh',
  },
  insightHistoryHeader: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  insightHistoryText: {
    fontSize: '30px',
    color: theme.palette.customColor.black,
    opacity: 1,
    flex: 0.5,
  },
  createSummaryButton: {
    backgroundColor: '#00A9CF',
    borderRadius: `24px`,
    color: theme.palette.customColor.white,
    opacity: 1,
    fontSize: '23px',
    position: 'absolute',
    right: 60,
  },
  insightHistory: {
    border: '1px solid #707070',
    borderRadius: `16px`,
    overflow: 'hidden',
  },
  tableHeadCell: {
    fontSize: '16px',
    fontWeight: 800,
    color: theme.palette.customColor.black,
    opacity: 1,
    paddingLeft: 0,
    paddingRight: 0,
  },
  tableBodyCell: {
    fontSize: '16px',
    color: theme.palette.customColor.black,
    opacity: 1,
  },
  expandIconCell: {
    width: '8%',
  },
  arrowButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.customColor.white,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.customColor.white,
    },
  },
  createSummaryBtn: {
    fontSize: 19,
    borderRadius: '30px',
    fontWeight: 500,
    height: '5vh',
  },
  abondoned: {
    '& th,td': {
      color: '#FF0202',
    },
  },
  highlighted: {
    backgroundColor: '#fffad8',
    '& th': {
      borderLeft: '7px solid #00a9cf',
    },
  },
}));
