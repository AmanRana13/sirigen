import React from 'react';
import {Box, Grid} from '@mui/material';
import {detailStyles, metaBoxStyles} from './MetaBox.style';
import {IMetaBoxItem, IMetaBoxProps} from './MetaBox.types';
import ShowHyphen from 'common/ShowHyphen/ShowHyphen';
import PrintButton from 'common/Print/components/PrintButton/PrintButton.component';
import RoleBaseRender from 'common/RoleBaseRender/RoleBaseRender';
import {Roles} from 'globals/enums';

const MetaBox = (props: IMetaBoxProps) => {
  const {
    data = [],
    columns = 12, // columns are number of parts into which the width of parent in divided
  } = props;
  const {classes} = metaBoxStyles();
  return (
    <Box className={classes.container} data-testid='preview-meta-box'>
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
        <RoleBaseRender forRole={Roles.Admin}>
          <Grid item display='flex' alignItems='center'>
            <PrintButton show />
          </Grid>
        </RoleBaseRender>
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
        <Box gap='20px' display='flex' alignItems='stretch'>
          <Box>
            <div className={classes.firstLabel} style={{marginBottom: '20px'}}>
              {firstLabel}
            </div>
            <div className={classes.secondLabel}>{secondLabel}</div>
          </Box>
          <Box>
            <div className={classes.detailText} style={{marginBottom: '20px'}}>
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
