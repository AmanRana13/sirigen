import {makeStyles} from 'tss-react/mui';

export const resourcesDialogTableStyle = makeStyles()((theme: any) => ({
  container: {
    backgroundColor: theme.palette.customColor.white,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 3,
    padding: 20,
  },
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  tableContainer: {
    height: '488px',
    border: `1px solid ${theme.palette.customColor.borderGrey}`,
    borderRadius: '16px',
    padding: '0 20px 10px 20px',
    '&::-webkit-scrollbar': {
      width: 8,
      padding: '90px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.customColor.highlight,
      borderRadius: 4,
    },
    overflowX: 'hidden',
  },
  createSummaryButton: {
    backgroundColor: theme.palette.customColor.highlight,
    borderRadius: `24px`,
    color: theme.palette.customColor.white,
    opacity: 1,
    fontSize: '23px',
    position: 'absolute',
    right: 60,
  },
  tableHeadCell: {
    fontSize: '16px',
    color: theme.palette.customColor.black,
    opacity: 1,
    padding: '12px',
    borderBottom: `1px solid ${theme.palette.customColor.borderGrey}`,
  },
  tableBodyCell: {
    fontSize: '16px',
    padding: '12px',
    color: theme.palette.customColor.black,
    opacity: 1,
    borderBottom: `1px solid ${theme.palette.customColor.borderDark}`,
  },
  deleteIconCell: {
    width: '8%',
    color: theme.palette.customColor.highlight,
    borderBottom: `1px solid ${theme.palette.customColor.borderDark}`,
  },
  noRecords: {
    borderBottom: 'none',
    height: '27vh',
    textAlign: 'center',
  },
  removeIcon: {
    width: 40,
    height: 40,
    cursor: 'pointer',
  },
  disabledRemove: {
    color: theme.palette.customColor.disabledRemove,
    pointerEvents: 'none',
    cursor: 'auto',
  },
  resourcesInputBox: {
    minWidth: 285,
  },
  rowActive: {
    '& > td, th': {
      border: 'none',
      paddingBottom: 0,
      backgroundColor: theme.palette.customColor.activeCellBackground,
    },
  },
  deleteAction: {
    backgroundColor: theme.palette.customColor.activeCellBackground,
    '& .MuiButtonBase-root.MuiButton-root': {
      borderRadius: '25px',
      padding: '6px 49px',
      '&.MuiButton-outlinedPrimary': {
        borderRadius: 25,
        border: `1px solid ${theme.palette.customColor.borderGrey}`,
        backgroundColor: theme.palette.customColor.white,
        color: theme.palette.customColor.borderGrey,
        boxShadow: '0 0 0 0',
        fontWeight: 'normal',
        '&:hover': {
          boxShadow: '0 0 0 0',
          border: `1px solid ${theme.palette.customColor.borderGrey}`,
        },
      },
    },
  },
  url: {
    color: theme.palette.customColor.highlight,
  },
  errorText: {
    color: theme.palette.error.light,
  },
}));
