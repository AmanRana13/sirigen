import {makeStyles} from 'tss-react/mui';

export const sectionsWrapperStyle = makeStyles()((theme) => ({
  content: {
    '& .MuiAccordionSummary-content': {
      justifyContent: 'space-between',
    },
  },
  accordianSummary: {
    paddingBottom: 10,
    marginBottom: 7,
  },
  container: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: theme.spacing(4),
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.16)',
  },
  iconStyle: {
    fontSize: 50,
    color: '#00A9CF',
  },
}));
