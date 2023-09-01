import {Box} from '@mui/material';
import InputRadioWrapper from './component/InputRadioWrapper';

const InputFields = (props: any) => {
  return (
    <Box width='100%'>
      <Box>
        <RenderComponent {...props} />
      </Box>
    </Box>
  );
};

const RenderComponent = (props: any) => {
  if (props.radio) {
    return <InputRadioWrapper {...props} />;
  }
  return <></>;
};

export {InputFields};
