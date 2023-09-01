import {makeStyles} from 'tss-react/mui';

export const profileInfoStyle = makeStyles()((theme: any) => ({
  formInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  formInfoColumn: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  inlineFormField: {
    display: 'flex',
    position: 'relative',
  },
  inlineFormFieldDesc: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  inputFile: {
    display: 'none',
  },
  avatarStyle: {
    height: 40,
    margin: 5,
    width: 40,
  },
  imageUploadCardContainer: {
    paddingTop: 15,
    border: '2px solid #16A9D0',
    flex: 1,
    marginTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
  },
  uploadButton: {
    borderRadius: 20,
    color: '#fff',
    width: 180,
    backgroundColor: theme.palette.customColor.primary,
  },
  addIcon: {
    color: theme.palette.customColor.primary,
    cursor: 'pointer',
  },
  disableButton: {
    color: '#D3D3D3',
  },
  errorText: {
    color: '#CC0000',
    paddingTop: 2,
  },
  radiusBox: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  radiusMeasurement: {
    marginTop: 30,
    width: '30%',
    '&li': {
      textTransform: 'capitalize',
    },
  },
}));
