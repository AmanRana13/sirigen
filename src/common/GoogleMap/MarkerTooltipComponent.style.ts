import {makeStyles} from 'tss-react/mui';

export const markerTooltipStyle = makeStyles()((theme: any) => ({
  tooltipDetailContainer: {
    display: 'flex',
    marginBottom: 15,
    '& :nth-first-child(1)': {
      marginTop: 9,
    },
    '&:nth-last-child(1)': {
      marginBottom: 0,
    },
  },
  markerNumber: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    backgroundColor: '#fa400a',
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: 18,
    borderRadius: '50%',
    height: 28,
    width: 28,
  },
  threeDigitWidth: {
    height: 35,
    width: 35,
  },
  tooltipLabel: {
    fontSize: 16,
    fontWeight: 600,
    color: '#0186a5',
  },
  tooltipValue: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'normal',
    color: '#000',
  },
  tooltipAlternateValue: {
    color: '#686868',
    fontSize: 16,
    fontWeight: 'normal',
  },
}));
