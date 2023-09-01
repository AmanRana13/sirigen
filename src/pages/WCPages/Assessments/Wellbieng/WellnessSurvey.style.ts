import {makeStyles} from 'tss-react/mui';

export const wellnessSurveyStyle = makeStyles()(() => ({
  info: {
    textAlign: 'left',
    padding: '0 43px 0 0',
  },
  radioField: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioLabel: {
    '& label': {
      width: 135,
      margin: 0,
    },
  },
  errorText: {
    color: '#cc0000',
  },
  disabledText: {
    color: '#a7a7a7',
  },
  scoreTable: {
    marginTop: 80,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 204,
    height: 59.3,
    border: '1px solid #c9c9c9',
    borderRadius: 10,
    color: '#0186a5',
  },
}));
