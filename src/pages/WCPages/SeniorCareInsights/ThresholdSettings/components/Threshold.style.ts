import {makeStyles} from 'tss-react/mui';

export const thresholdsStyle = makeStyles()((theme: any) => ({
  thresholdHistory: {
    width: '100%',
    height: '500px',
    margin: '50px 12px 52px 0',
    padding: '15px 52px 23px 53px',
    borderRadius: '16px',
    boxShadow: ' 0 4px 19px 0 rgba(0, 0, 0, 0.16)',
    backgroundColor: '#b8edf4',
  },
  thresholdHistoryBox: {
    width: '100%',
    height: '375px',
    margin: '17px 0 0',
    padding: '15px 30px 0',
    borderRadius: '16px',
    boxShadow: '0 4px 19px 0 rgba(0, 0, 0, 0.16)',
    backgroundColor: '#fff',
  },
  downloadLink: {
    cursor: 'pointer',
    fontSize: '20px',
    fontWeight: '500',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '2px',
    alignItem: 'center',
    textAlign: 'center',
    color: '#05809b',
    padding: '2px',
    textDecoration: 'underline',
  },
  tableContainer: {
    height: '375px',
    margin: '17px 0 0',
    padding: '15px 0 0',
    boxShadow: '0 4px 19px 0 rgba(0, 0, 0, 0.16)',
    borderRadius: 10,
  },
  table: {
    padding: 0,
    '& .MuiTableCell-sizeSmall': {
      padding: '6px 0 6px 16px',
    },
  },
  thresholdGraph: {
    width: '100%',
    height: '570px',
    margin: '70px 12px 52px 0px',
    padding: '15px 52px 23px 53px',
    borderRadius: '16px',
    boxShadow: '0 4px 19px 0 rgba(0, 0, 0, 0.16)',
    backgroundColor: '#b8edf4',
  },
  thresholdGraphComponent: {
    width: '100%',
    display: 'flex',
    overflowX: 'scroll',
    whiteSpace: 'nowrap',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '420px',
    marginTop: '20px',
    borderRadius: '16px',
    boxShadow: '0 4px 19px 0 rgba(0, 0, 0, 0.16)',
  },
  noData: {
    fontSize: 28,
    fontWeight: 600,
    color: '#a3aaa9',
  },
  thresholdGraphBox: {
    width: 136,
    height: 80,
    margin: '0 35px 2px 1px',
    borderRadius: '16px',
    backgroundColor: '#fff',
  },
  thresholdGraphBoxContent: {
    display: 'block',
    alignItems: 'center',
    margin: '4px 1px 1px 0',
    fontSize: '16px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontSyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    textAlign: 'center',
    color: '#686868',
  },
  valueSetter: {
    width: '57%',
    height: '1px',
    marginLeft: '18%',
    justifyItems: 'center',
  },
  thresholdGraphBoxLast: {
    width: 150,
    height: 71,
    margin: '8px 32px 2px 30px',
    borderRadius: '16px',
    backgroundColor: 'transparent',
  },
  identifierLabel: {
    width: '34px',
    height: '6px',
    borderRadius: '3px',
    alignItems: 'center',
  },
  identifierLabelText: {
    alignItems: 'center',
    width: '100px',
    height: '17px',
    marginLeft: '10px',
    fontSize: '11px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    textAlign: 'left',
    color: '#686868',
  },
  thresholdContainer: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  headContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  options: {
    width: 267,
    display: 'flex',
    justifyContent: 'space-between',
    textDecoration: 'underline',
    color: theme.palette.customColor.grey,
  },
  thresholdFieldsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    marginTop: 40,
  },
  disabledFieldsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  activeFieldsContainer: {
    /* Chrome, Safari, Edge, Opera */
    '& input::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },

    '& input::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },

    /* Firefox */
    '& input[type=number]': {
      '-moz-appearance': 'textfield',
    },
    marginTop: 40,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  //Threshold range
  thresholdRangeContainer: {
    marginTop: 40,
    display: 'flex',
    flexWrap: 'wrap',
    height: 100,
    borderRadius: 10,
    width: '100%',
    overflow: 'hidden',
  },
  thresholdRange: {
    padding: 8,
    width: '20%',
    display: 'block',
    height: 100,
    textAlign: 'center',
    '&.actionRange': {
      backgroundColor: theme.palette.customColor.red,
    },
    '&.attentionRange': {
      backgroundColor: theme.palette.customColor.amber,
    },
    '&.goodNewsRange': {
      backgroundColor: theme.palette.customColor.green,
    },

    //colours are hard coded for disable ranges.
    //since we are not going to use anywhere else in the application
    '&.diabledActionRange': {
      backgroundColor: '#BFBFBF',
    },
    '&.diabledAttentionRange': {
      backgroundColor: '#D9D9D9',
    },
    '&.diabledGoodNewsRange': {
      backgroundColor: '#F5F5F5',
    },
  },
  thresholdRangeValues: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  //Threshold action buttons
  thresholdActionContainer: {
    margin: '60px 0 20px 0',
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    columnGap: '30px',
  },
  detailedData: {
    cursor: 'pointer',
  },
  smallButton: {
    width: 117,
    height: 34,
    padding: '8px 18px',
    borderRadius: 46,
    fontSize: 18,
    fontWeight: 600,
    color: theme.palette.common.white,
  },
  disableIcon: {
    pointerEvents: 'none',
    color: '#00000042',
  },
  cutOffValueContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    fontSize: '14px',
    height: '44px',
    color: '#aaa5a5',
  },
}));
