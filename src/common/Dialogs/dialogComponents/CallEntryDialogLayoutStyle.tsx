import {makeStyles} from 'tss-react/mui';

export const callEntryDialogLayoutStyle = makeStyles()((theme: any) => ({
  line: {
    borderTop: 'solid 2px #16A9D0',
    width: '100%',
    marginLeft: 10,
  },
  actionLine: {
    borderTop: 'solid 2px #16A9D0',
    width: '45%',
    marginLeft: 10,
    marginRight: 10,
  },
  actionBox: {
    marginTop: 20,
    paddingBottom: 20,
    borderRadius: 8,
    boxShadow: `0 2px 8px 0 rgba(0, 0, 0, 0.16)`,
  },
  radioField: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',

    '& label': {
      margin: 0,
    },
  },
  actionItems: {
    minWidth: '100%',
    marginLeft: 2,
    borderRadius: 10,
  },
  dialogTitle: {
    backgroundColor: theme.palette.customColor.callEntryHeader,
    padding: '8px 30px',
    textAlign: 'end',
    height: 70,
  },
  dialogTitleName: {
    display: 'flex',
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  titleColor: {
    color: '#585757',
  },
  errorText: {
    color: theme.palette.customColor.error,
  },
}));
