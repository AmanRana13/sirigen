import {makeStyles} from 'tss-react/mui';

export const sosFallDialogStyle = makeStyles()((theme: any) => ({
  line: {
    borderTop: 'solid 2px #16A9D0',
    width: '37%',
    marginLeft: 10,
    marginRight: 10,
  },
  fallLine: {
    borderTop: 'solid 2px #16A9D0',
    width: '20%',
    marginLeft: 10,
    marginRight: 10,
  },
  label: {
    color: 'black',
    opacity: 0.7,
    lineHeight: 1.15,
  },
  value: {
    color: 'black',
    lineHeight: 1.15,
  },
}));
