import React, {ReactNode, useState} from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface ICollapsibleContainerProps {
  heading: string;
  children: ReactNode;
}

import {collapsibleContainerStyle} from './CollapsibleContainer.style';

const CollapsibleContainer = ({
  heading,
  children,
}: ICollapsibleContainerProps) => {
  const {classes} = collapsibleContainerStyle();
  const [isCollapse, setIsCollapse] = useState(true);

  const Body = React.useMemo(() => {
    return (
      <AccordionDetails className={classes.accordionDetails}>
        {children}
      </AccordionDetails>
    );
  }, [children, classes.accordionDetails]);

  return (
    <Accordion
      data-testid='collapsible-container'
      className={isCollapse ? classes.accordianRoot : classes.accordianExpanded}
      classes={{
        root: classes.MuiAccordionroot,
      }}
      style={{borderRadius: '15px', margin: '20px 0'}}
      square={false}
      expanded={isCollapse}
      onChange={() => setIsCollapse((cl) => !cl)}>
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon className={classes.expandMoreIcon} fontSize='large' />
        }
        aria-controls={`panel-content-${heading}`}
        id={heading}
        className={classes.accordianSummaryRoot}>
        <Typography variant='h3v1'>{heading}</Typography>
      </AccordionSummary>
      {Body}
    </Accordion>
  );
};

export default CollapsibleContainer;
