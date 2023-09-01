import {makeStyles} from 'tss-react/mui';

export const medicationListStyle = makeStyles()((theme: any) => ({
  medicationSectionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: theme.palette.background.default,
    borderRadius: 8,
    padding: '16px 28px 28px 20px',
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.16)',
    overflowX: 'auto',
  },
  medicationSectionheader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: theme.palette.background.default,
  },
  medicationSectionHeading: {
    color: theme.palette.customColor.primaryLight,
  },
  editBtn: {
    cursor: 'pointer',
    color: theme.palette.customColor.primaryLight,
    display: 'flex',
    alignItems: 'baseline',
    paddingLeft: 16,
    textDecoration: 'underline',
  },
  createIcon: {
    height: 12,
    width: 12,
  },
  deleteBtn: {
    cursor: 'pointer',
    color: theme.palette.customColor.primaryLight,
    padding: '0 0 0 15px',
    textDecoration: 'underline',
  },
  incomplete: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 500,
    justifyContent: 'center',
    color: theme.palette.error.light,
    '& img': {
      marginRight: 10,
    },
  },
}));
