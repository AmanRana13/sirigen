import {makeStyles} from 'tss-react/mui';

export const homeStyle = makeStyles()((theme: any) => ({
  dateHeader: {
    border: `1px solid ${theme?.palette?.customColor?.borderGrey}`,
    borderRadius: 8,
    backgroundColor: theme?.palette?.customColor?.white,
    fontWeight: 'normal',
    marginBottom: 10,
    cursor: 'default',
    color: theme?.palette?.customColor?.dateHeader,
    '&:hover': {
      backgroundColor: theme?.palette?.customColor?.white,
      border: `1px solid ${theme?.palette?.customColor?.borderGrey}`,
    },
    fontSize: '14px',
  },
  memberDirectory: {
    minWidth: '700px',
    '& .MuiPaper-rounded': {
      borderRadius: 10,
    },
  },
}));
