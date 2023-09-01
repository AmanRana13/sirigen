import {makeStyles} from 'tss-react/mui';

export const respirationStyle = makeStyles()(() => ({
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  activityContainer: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
  },
  summaryBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 10,
    border: 'solid 1px #d3d3d3',
    padding: 5,
  },
  summaryCircle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 160,
    width: 160,
    borderRadius: '50%',
    padding: 5,
    background: '#dff4f3',
  },
  summaryBoxLabel: {
    marginTop: 'auto',
    fontSize: 14,
    color: '#686868',
    textTransform: 'uppercase',
  },
  summaryBoxValue: {
    marginBottom: 'auto',
    fontSize: 14,
  },
  summaryBoxValueData: {
    fontWeight: 'Bold',
    fontSize: 20,
    color: '#2A7E9A',
  },
}));
