import {Tooltip} from '@mui/material';
import {infoTooltipStyle} from './infoTooltip.style';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {IInfoTooltipProps} from './InfoTooltip.types';

const InfoTooltip = (props: IInfoTooltipProps) => {
  const {children, ...rest} = props;
  const {classes} = infoTooltipStyle();
  return (
    <Tooltip
      title={children}
      arrow
      classes={{
        arrow: classes.tooltipArrow,
        tooltip: classes.tooltip,
      }}
      {...rest}>
      <InfoOutlinedIcon className={classes.infoIcon} />
    </Tooltip>
  );
};

export default InfoTooltip;
