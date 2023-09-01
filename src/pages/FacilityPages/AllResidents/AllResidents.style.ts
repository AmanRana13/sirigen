import {makeStyles} from 'tss-react/mui';

export const AllResidentsStyle = makeStyles()(() => ({
  searchContainer: {
    borderTopLeftRadius: '16px',
    borderTopRightRadius: '16px',
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.16)',
    height: 86,
    alignItems: 'center',
    padding: '0 34px',
    form: {
      margin: '0 0 0 24px !important',
    },
  },
  HeaderText:{
    fontSize:20,
    fontWeight:'normal',
    color:'#6ba539'
  }
}));
