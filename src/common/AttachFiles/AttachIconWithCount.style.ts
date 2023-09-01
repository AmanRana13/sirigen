import {makeStyles} from 'tss-react/mui';

export const attachIconWithCountStyle = makeStyles()((theme: any) => ({
  attachFileIcon: {
    color: '#000',
    width: '36px',
    height: '36px',
  },
  attachFileText: {
    color: '#000',
  },
  attachDisableText: {
    color: '#A7A7A7!important',
    pointerEvents: 'none',
  },
}));
