import {makeStyles} from 'tss-react/mui';

export const collapsibleContainerStyle = makeStyles()((theme: any) => ({
  accordianRoot: {
    marginBottom: 20,
    background: theme.palette.background.primary,
    boxShadow: '0 0 0 0',
  },
  accordianExpanded: {
    background: theme.palette.background.collapseItem,
    padding: 0,
  },
  accordianSummaryRoot: {
    padding: '0 6px',
    '& .MuiIconButton-root': {
      padding: '0 12px',
    },
    '& .MuiAccordionSummary-content': {
      margin: '0',
    },
  },
  accordionDetails: {
    padding: '8px 6px 16px',
    display: 'block',
  },
  expandMoreIcon: {
    fontSize: '45px',
    padding: 0,
    color: '#00A9CF',
  },
  MuiAccordionroot: {
    '&.MuiAccordion-root:before': {
      backgroundColor: 'transparent',
    },

    '&.MuiPaper-elevation1': {
      boxShadow: 'none',
    },
  },
}));
