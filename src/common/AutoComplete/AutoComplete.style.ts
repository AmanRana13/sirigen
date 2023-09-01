import {makeStyles} from 'tss-react/mui';

export const autoCompleteSearchStyle: any = makeStyles()((theme: any) => ({
  root: {
    border: `1px solid ${theme.palette.customColor.borderGrey}`,
    overflow: 'hidden',
    borderRadius: 8,
    backgroundColor: theme.palette.background.default,
    minWidth: '270px',
    height: '35px',
  },
  inputRoot: {
    paddingTop: '2px',
    paddingLeft: '15px',
  },
  popupIndicator: {
    color: theme.palette.customColor.primaryLight,
    marginRight: 2,
  },
  popper: {
    marginTop: '1px !important',
    minHeight: '80px !important',
  },
  popperDisablePortal: {
    position: 'relative',
  },
}));
