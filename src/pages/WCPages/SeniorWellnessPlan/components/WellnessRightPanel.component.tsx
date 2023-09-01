import React from 'react';
import {useAppSelector} from 'hooks/reduxHooks';
import clsx from 'clsx';
import {Box, Typography, Button} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import {InputFields} from 'common/InputFields';
import SortIcon from 'assets/icons/SortIcon.svg';

import {wellnessRightPanelStyle} from './WellnessRightPanel.style';

const WellnessRightPanel = React.memo(
  ({name, item, updateItem, cardTitle, buttonLabel, inputPlaceholder}: any) => {
    const {classes} = wellnessRightPanelStyle();
    const {isLatestVersion} = useAppSelector(
      (state: any) => state.wellnessPlan,
    );
    const memberPriorityRef: any = React.useRef<HTMLButtonElement>(null);
    const challengesRef: any = React.useRef<HTMLButtonElement>(null);

    const generateRef = () => {
      switch (name) {
        case 'memberPriority':
          return memberPriorityRef;
        case 'challenges':
          return challengesRef;
        default:
          return null;
      }
    };

    const handleChange = (seq: number, e: any) => {
      updateItem(
        [...item].map((data) => {
          if (data.seq === seq) {
            return {
              seq: seq,
              value: e.target.value,
              error: false,
              errorText: '',
            };
          } else return data;
        }),
      );
    };

    const handleAddItem = () => {
      updateItem((prevState: any) => [
        ...prevState,
        {
          seq: prevState.length + 1,
          value: '',
          error: false,
          errorText: '',
        },
      ]);
      setTimeout(() => {
        if (name == 'memberPriority') {
          memberPriorityRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
          });
        } else if (name == 'challenges') {
          challengesRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start',
          });
        }
      }, 100);
    };

    const handleRemoveItem = (seq: number) => {
      if (!isLatestVersion) return;
      let filteredArray = item.filter(
        (filterData: any) => filterData.seq !== seq,
      );
      updateItem(
        [...filteredArray].map((data, index: number) => {
          return {
            ...data,
            seq: index + 1,
          };
        }),
      );
    };

    return (
      <Box
        display='flex'
        flexDirection='column'
        style={{width: '100%'}}
        data-testid='wellnessRightPanel'>
        <Box className={classes.rightSideFieldsContainer}>
          <Box
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            style={{
              width: '92%',
              position: 'absolute',
              zIndex: 999,
              backgroundColor: '#fff',
            }}>
            <Typography
              className={classes.fieldsHeading}
              variant='h6'
              style={{fontWeight: 500}}>
              {cardTitle}
              <Box component='span' className={classes.errorText}>
                *
              </Box>
            </Typography>
            <Button
              variant='contained'
              color='primary'
              size='large'
              disabled={!isLatestVersion}
              onClick={handleAddItem}>
              {buttonLabel}
            </Button>
          </Box>
          <Box className={classes.itemContainer}>
            {item.map((itemData: any, index: any) => (
              <div
                className={classes.itemData}
                ref={item.length == index + 1 ? generateRef() : null}
                key={`${name}-${itemData.seq}`}>
                {name == 'memberPriority' && item.length != 1 && (
                  <img src={SortIcon} style={{marginRight: 10}} />
                )}
                <InputFields
                  isError={itemData.error}
                  errorText={itemData.errorText}
                  eventProps={{
                    onChange: (e: any) => handleChange(itemData.seq, e),
                    value: itemData.value || '',
                  }}
                  inputProps={{
                    name: `${name}-${itemData.seq}`,
                    placeholder: inputPlaceholder,
                    required: true,
                    maxLength: 250,
                    disabled: !isLatestVersion,
                    style: {padding: 0},
                  }}
                  multiline={true}
                  rows={2}
                />

                <HighlightOffIcon
                  onClick={() => handleRemoveItem(itemData.seq)}
                  data-testid='handleRemove'
                  className={clsx({
                    [classes.removeIcon]: true,
                    [classes.removeIconDisable]:
                      item.length == 1 || !isLatestVersion,
                  })}
                />
              </div>
            ))}
          </Box>
        </Box>
      </Box>
    );
  },
);

export default WellnessRightPanel;
