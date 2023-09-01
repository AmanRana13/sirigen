import {makeStyles} from 'tss-react/mui';

export const memberDirectoryStyle = makeStyles()((theme: any) => ({
  innerTable: {
    backgroundColor: '#DFF4F3',
  },
  arrowIcon: {
    backgroundColor: theme.palette.customColor.primary,
    color: '#FFF',
    '&:hover': {
      backgroundColor: theme.palette.customColor.primary,
      color: '#FFF',
    },
  },
  action: {
    backgroundColor: '#FF6932',
    color: '#fff',
  },
  attention: {
    backgroundColor: '#FEDD00',
  },
  unack: {
    backgroundColor: '#FFC7C7',
  },
  goodNews: {
    backgroundColor: '#00E6FF',
  },
  valueContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    height: 30,
    width: 30,
    margin: '0 auto',
  },
  pagination: {
    '& ul': {
      padding: '2% 0',
      justifyContent: 'center',
      '& .Mui-selected': {
        color: theme.palette?.customColor?.white || 'white',
        background: theme.palette?.customColor?.primary || '#16a9d0',
        height: 24,
        minWidth: 24,
      },
    },
  },
  tableHeading: {
    fontWeight: 800,
    fontSize: 15,
  },
  tableBody: {
    fontSize: 13,
  },
}));
