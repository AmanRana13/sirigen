import {makeStyles} from 'tss-react/mui';
import {MUThemeOptionsV2} from 'config/theme.config';

export const useSearchBarStyles = makeStyles()((theme: MUThemeOptionsV2) => ({
  root: {
    overflow: 'hidden',
    borderRadius: 8,
    backgroundColor: theme.palette.secondary.main,
    width: '100%',
    height: 36,
    padding: '0px 0px 0px 15px',
  },
  searchList: {
    zIndex: 1,
    maxHeight: '20%',
    overflowY: 'scroll',
    position: 'absolute',
    fontSize: 16,
    padding: '5px 0px 5px 10px',
    borderRadius: 2,
    boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
    backgroundColor: '#fff',
    '&::-webkit-scrollbar': {
      width: 8,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#00a9cf',
      borderRadius: 4,
    },
  },
  searchListItems: {
    padding: '10px 0',
    borderBottom: '1px solid lightGrey',
    '&:last-child': {borderBottom: 'none'},
  },
}));
