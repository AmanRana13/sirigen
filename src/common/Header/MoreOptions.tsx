import React from 'react';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {Box, ClickAwayListener, List, ListItem} from '@mui/material';
import {moreOptionsStyle} from './MoreOptions.style';
import SharedStorage from 'store/SharedStorage';
import {LOGOUT_MESSAGE} from 'globals/global.constants';
import {onClickLogout} from 'pages/WCPages/Login/Login.action';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from 'hooks/reduxHooks';

const MoreOptions = () => {
  const {classes} = moreOptionsStyle();
  const dispatch: any = useAppDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(onClickLogout(LOGOUT_MESSAGE));
    SharedStorage.setNavigationEnable(false); //TODO need to check this logic
  };

  return (
    <Box component='div'>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box component='div' className={classes.root}>
          <Box className={classes.iconContainer} onClick={handleClick}>
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Box>
          {open && (
            <List
              className={classes.dropdown}
              component='nav'
              aria-label='secondary mailbox folders'>
              <ListItem button onClick={() => navigate(`/change-password`)}>
                <Typography variant='subtitle1'>Change password</Typography>
              </ListItem>
              <ListItem button onClick={handleLogout}>
                <Typography variant='subtitle1'>Logout</Typography>
              </ListItem>
            </List>
          )}
        </Box>
      </ClickAwayListener>
    </Box>
  );
};

export default MoreOptions;
