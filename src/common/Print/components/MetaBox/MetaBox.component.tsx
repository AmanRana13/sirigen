import React from 'react';
import {Box, Grid} from '@mui/material';
import {detailStyles, metaBoxStyles} from './MetaBox.style';
import {IMetaBoxItem, IMetaBoxProps} from './MetaBox.types';
import ShowHyphen from 'common/ShowHyphen/ShowHyphen';

const MetaBox = (props: IMetaBoxProps) => {
  const {data = [], columns = 12} = props;
  const {classes} = metaBoxStyles();
  return (
    <Box className={classes.container} data-testid='print-meta-box'>
      <Grid container columnSpacing='30px' columns={columns}>
        {data?.map((item: IMetaBoxItem, i: number) => (
          <Details
            key={item.firstLabel || item.secondLabel || i}
            firstLabel={item?.firstLabel || ''}
            firstValue={item?.firstValue || ''}
            secondLabel={item?.secondLabel || ''}
            secondValue={item?.secondValue || ''}
            columns={item?.columns || false}
          />
        ))}
      </Grid>
    </Box>
  );
};

const Details = React.memo(
  ({
    firstLabel,
    secondLabel,
    firstValue,
    secondValue,
    columns,
  }: IMetaBoxItem) => {
    const {classes} = detailStyles();
    return (
      <Grid xl={columns} item>
        <Box gap='36px' display='flex' alignItems='stretch'>
          <Box>
            <div className={classes.firstLabel} style={{marginBottom: '36px'}}>
              {firstLabel}
            </div>
            <div className={classes.secondLabel}>{secondLabel}</div>
          </Box>
          <Box>
            <div className={classes.detailText} style={{marginBottom: '36px'}}>
              {firstLabel && <ShowHyphen>{firstValue}</ShowHyphen>}
            </div>
            <div className={classes.detailText}>
              {secondLabel && <ShowHyphen>{secondValue}</ShowHyphen>}
            </div>
          </Box>
        </Box>
      </Grid>
    );
  },
);

export default MetaBox;
