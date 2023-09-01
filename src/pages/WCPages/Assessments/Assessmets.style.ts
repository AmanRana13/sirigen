import {makeStyles} from 'tss-react/mui';

export const assessmentsStyle = makeStyles()((theme: any) => ({
  assessmentContainer: {
    display: 'flex',
    marginTop: 30,
  },
  assessmentTabContainer: {
    display: 'flex',
    width: 400,
    marginTop: 30,
    height: 20,
    backgroundColor: '#FFF',
    borderRadius: 16,
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.16)',
  },
  leftPanel: {
    width: 351,
    backgroundColor: theme.palette.background.default,
    borderRadius: 10,
    height: 'fit-content',
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.16)',
  },
  navLinkContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    width: 351,
    '& li': {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '30px 40px 30px 31.1px',
    },
  },
  links: {
    color: theme.palette.customColor.primaryLight,
  },
  disabledLink: {
    color: theme.palette.text.disabled,
    pointerEvents: 'none',
  },
  selected: {
    color: theme.palette.customColor.primaryLight,
    '& li': {
      borderLeft: `3px solid ${theme.palette.customColor.primaryLight}`,
    },
    pointerEvents: 'none',
  },
  assessmentRouteContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: '#FFF',
    marginLeft: 29,
    borderRadius: 16,
    padding: '30px 45px',
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.16)',
    overflowX: 'auto',
  },
  assessmentTitle: {
    fontSize: 20,
    color: '#0186a5',
    fontWeight: 'bold',
  },
  subOptionsNavLinkContainer: {
    paddingLeft: 28,
  },
  subSelected: {
    color: theme.palette.customColor.primaryLight,
    '&>li': {
      borderLeft: `3px solid ${theme.palette.customColor.primaryLight}`,
    },
  },
  note: {
    alignItems: 'center',
    fontSize: 14,
    marginBottom: 0,
  },
}));
