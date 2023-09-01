import {makeStyles} from 'tss-react/mui';

export const assignWellnessCoachDialogStyles = makeStyles()((theme: any) => ({
  container: {
    paddingTop: '18px',
  },
  displayData: {
    display: 'flex',
    gap: '12px',
    padding: '1px',
    justifyContent: 'space-between',
  },
  label: {
    fontWeight: 'bold',
    marginRight: '8px',
  },
  pagination: {
    '& ul': {
      padding: '2% 0',
      justifyContent: 'center',
      '& .Mui-selected': {
        color: theme.palette.customColor.white,
        background: theme.palette.primary.main,
        height: 24,
        minWidth: 24,
      },
    },
  },
  paginationContainer: {
    marginTop: '18px',
    '&.MuiBox-root': {
      paddingBottom: '0',
      marginBottom: '0',
      color: theme.palette.customColor.borderGrey,
    },
  },
  searchbar: {
    '& form': {
      '& > .MuiInputBase-root.MuiInputBase-colorPrimary': {
        backgroundColor: theme.palette.customColor.activeCellBackground,
        width: '285px',
      },
    },
  },
}));

export const wellnessCoachTableStyles = makeStyles()((theme: any) => ({
  tableContainer: {
    padding: '12px 22px',
    paddingBottom: '0',
  },
}));
