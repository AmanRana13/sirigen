import {makeStyles} from 'tss-react/mui';

export const eventMinDialogStyle = makeStyles()((theme: any) => ({
  cardContentHeader: {
    display: 'flex',
    backgroundColor: theme.palette.customColor.summaryHeader,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '10px 8px',
    overflow: 'hidden',
  },
  alertHeader: {
    backgroundColor: `${theme.palette.customColor.alertHeader}!important`,
  },
  eventNameWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  eventName: {
    paddingRight: 12,
  },
  headingTextWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '0 15px',
    marginBottom: 6,
    marginTop: 6,
    width: '92%',
  },
  eventTextBox: {
    margin: '10px 15px 15px 15px',
    border: '1px solid #A0A1A5',
    padding: 3,
    textOverflow: 'ellipsis',
    maxHeight: '57px',
    minHeight: '57px',
    '& p': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      '-webkit-line-clamp': 3,
      '-webkit-box-orient': 'vertical',
    },
  },
  eventText: {
    lineHeight: 1.1,
  },
  maximizeIcon: {cursor: 'pointer', width: '15px'},
}));
