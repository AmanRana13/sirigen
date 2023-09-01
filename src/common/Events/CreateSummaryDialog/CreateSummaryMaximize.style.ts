import {makeStyles} from 'tss-react/mui';

export const createSummaryMaximizeStyle = makeStyles()((theme: any) => ({
  innerContainer: {
    padding: '12px 0 0 0',
  },
  clearButton: {
    marginLeft: 'auto',
    '& button': {
      borderRadius: 30,
      padding: '2px 41px',
    },
  },
  tableContainer: {
    border: '1px solid grey',
    height: 300,
    maxHeight: 300,
    width: '100%',
    marginTop: 7,
  },
  tableDataCell: {
    padding: '10px 0px',
    alignContent: 'center',
  },
  summaryDescription: {
    borderRadius: 20,
    margin: '8px 0',
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: '30px',
  },
  errorText: {
    color: theme.palette.customColor.error,
  },
  insightTitle: {marginTop: '30px'},
}));
