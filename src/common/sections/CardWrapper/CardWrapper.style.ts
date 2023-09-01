import {makeStyles} from 'tss-react/mui';

export const cardWrapperStyle = makeStyles()((theme: any) => ({
  content: {
    '& .MuiAccordionSummary-content': {
      justifyContent: 'space-between',
    },
  },
  container: {
    backgroundColor: '#FFF',
    borderRadius: 7,
    marginBottom: theme.spacing(2),
  },
  iconStyle: {
    backgroundColor: '#00A9CF',
    borderRadius: 50,
    color: '#fff',
  },
}));
