import {Box, Link} from '@mui/material';
import {resendOtp} from 'pages/WCPages/Admin/Accounts/AgentAccount/CareAgentAccount.actions';
import React from 'react';
import {careCircleStyle} from './CareCircle.style';
import {useAppDispatch} from 'hooks/reduxHooks';

interface IResendOTPProps {
  data: any;
  getValues: any;
  index: string | number;
  inputFieldInfo: any;
  watch: any;
}

/**
 * @description React component to handle Resend OTP text for care giver
 */
const ResendOTP = React.memo(
  ({data, getValues, index, inputFieldInfo, watch}: IResendOTPProps) => {
    const {classes} = careCircleStyle();
    const [disableResendOTP, setDisableResendOTP] = React.useState(false);
    const dispatch: any = useAppDispatch();

    const handleResendOtp = (email: string) => {
      setDisableResendOTP(true);
      dispatch(resendOtp(getValues(email), true, true));
      setTimeout(() => {
        setDisableResendOTP(false);
      }, 30000);
    };

    const showResendOTP = React.useMemo(() => {
      return (
        data?.basic_info?.otp_require &&
        watch(`caregivers[${index}].[${inputFieldInfo.name}]`) ==
          data?.basic_info?.email
      );
    }, [
      data?.basic_info?.email,
      data?.basic_info?.otp_require,
      watch,
      index,
      inputFieldInfo.name,
    ]);

    if (!showResendOTP || !inputFieldInfo.isResendOTP) {
      return <></>;
    }

    return (
      <Box
        display='flex'
        justifyContent='flex-end'
        className={
          disableResendOTP ? classes.resendOTPDisbale : classes.resendOTP
        }>
        <Link
          onClick={() =>
            handleResendOtp(`caregivers[${index}].[${inputFieldInfo.name}]`)
          }>
          Resend OTP
        </Link>
      </Box>
    );
  },
);

export default ResendOTP;
