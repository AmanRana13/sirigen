import {makeStyles} from 'tss-react/mui';

export const callEntryStyle = makeStyles()((theme: any) => ({
  container: {
    width: '100%',
    backgroundColor: theme.palette.background.default,
    borderRadius: 10,
    padding: 15,
    bordeRadius: '16px',
    boxShadow: '0 8px 24px 0 rgba(0, 0, 0, 0.16)',
    border: 'solid 1px #d3d3d3',
    minHeight: 605,
    '& textarea': {
      resize: 'vertical',
    },
  },
  addTaskButton: {
    borderRadius: 20,
    padding: '6px 30px',
    color: theme.palette.common.white,
  },
  callType: {
    padding: '1px 8.8px 1px 8px',
    borderRadius: '6px',
    backgroundColor: theme.palette.background.green,
  },
  textarea: {
    minHeight: 34,
    borderRadius: '8px',
    border: 'solid 1px #cbcbcb',
    backgroundColor: '#fafafa',
  },
}));
