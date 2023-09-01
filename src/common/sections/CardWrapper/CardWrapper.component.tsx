/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {cardWrapperStyle} from './CardWrapper.style';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const CardWrapper = ({
  children,
  subTitle,
  isExpanded,
  infoMsg = '',
  fullDetails,
}: any) => {
  const {classes} = cardWrapperStyle();
  const [expanded, setExpanded] = useState(true);
  const [disable, setDisable] = useState(false);
  useEffect(() => {
    const hidePanel = isExpanded !== undefined && !isExpanded;
    setExpanded(!hidePanel);
    setDisable(hidePanel);
  }, [isExpanded]);

  const handleChange = () => () => {
    setExpanded(!expanded);
  };
  return (
    <Box className={classes.container} data-testid = 'cardWrapperContainer'>
      <Accordion expanded={expanded} onChange={handleChange()} data-testid = 'cardWrapperAccordian'>
        <AccordionSummary
          disabled={disable}
          expandIcon={<ExpandMoreIcon className={classes.iconStyle} data-testid = 'expandMore'/>}
          className={clsx({[classes.content]: infoMsg})}>
          <Box display='flex' alignItems='center'>
            <Typography variant='h4' color='primary'>
              {!expanded && fullDetails
                ? fullDetails?.title || subTitle
                : subTitle}
            </Typography>
            {fullDetails && !expanded && (
              <>
                <Typography fontSize={20} ml={1}>
                  {fullDetails?.contact || ''}
                </Typography>
                <Typography fontSize={20} ml={3}>
                  {`${fullDetails?.address.street}${
                    fullDetails?.address.street !== ' ' &&
                    fullDetails?.address.city !== ''
                      ? ', '
                      : ''
                  } ${fullDetails?.address.city}${
                    fullDetails?.address.city !== '' &&
                    fullDetails?.address.state !== ''
                      ? ', '
                      : ''
                  } ${fullDetails?.address.state}`}
                </Typography>
              </>
            )}
          </Box>
          {infoMsg && (
            <Box style={{display: 'flex', flexDirection: 'row'}}>
              <InfoOutlinedIcon style={{marginRight: 5}} />
              <Typography variant='body1' style={{marginRight: 15}}>
                {infoMsg}
              </Typography>
            </Box>
          )}
        </AccordionSummary>
        <AccordionDetails>
          <Box>{children}</Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export {CardWrapper};
