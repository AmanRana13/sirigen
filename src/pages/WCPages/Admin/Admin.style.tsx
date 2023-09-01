import {makeStyles} from 'tss-react/mui';

export const adminStyle = makeStyles()((theme: any) => ({
  navLinkContainer: {
    paddingLeft: 10,
    '& li': {
      padding: '22px 28px 22px 15px',
      wordBreak: 'break-word',
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
    '&>li': {
      borderLeft: `3px solid ${theme.palette.customColor.primaryLight}`,
    },
    pointerEvents: 'none',
  },
  subSelected: {
    color: theme.palette.customColor.primaryLight,
    '&>li': {
      borderLeft: `3px solid ${theme.palette.customColor.primaryLight}`,
    },
  },
  leftPanel: {
    width: '20.3%',
    backgroundColor: theme.palette.background.default,
    borderRadius: 10,
    height: 'fit-content',
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.16)',
  },
  rightPanel: {
    width: '77.5%',
    borderRadius: 10,
  },
  adminContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  subOptionsNavLinkContainer: {
    paddingLeft: 28,
  },
}));
