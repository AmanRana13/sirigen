/* eslint-disable max-len */
import {makeStyles} from 'tss-react/mui';

export const moreOptionsStyle = makeStyles()(() => ({
  iconContainer: {
    display: 'flex',
    cursor: 'pointer',
  },
  root: {
    position: 'relative',
    zIndex: 1001,
  },
  dropdown: {
    position: 'absolute',
    top: 28,
    right: 0,
    zIndex: 1,
    padding: `10px`,
    boxShadow: `3px 2px 3px -9px rgb(242 238 238 / 90%), -1px 12px 19px -1px rgb(243 235 235 / 48%), -1px 6px 17px -3px rgb(198 191 191 / 92%)`,
    borderRadius: 5,
    width: 'max-content',
    backgroundColor: 'white',
  },
}));
