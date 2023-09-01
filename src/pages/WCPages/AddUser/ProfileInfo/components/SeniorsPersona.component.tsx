import React, {useEffect} from 'react';
import {Grid} from '@mui/material';

import {CardWrapper} from 'common/sections/CardWrapper';
import {Fields} from 'common/Fields';
import {seniorPersonaForm} from 'forms';

const SeniorsPersona = ({
  seniorInfoData,
  setValue,
  register,
  isProfileCreated,
}: any) => {
  useEffect(() => {
    if (seniorInfoData && seniorInfoData.persona) {
      const persona = seniorInfoData.persona;
      persona.map((data: any) => {
        setValue(`persona.${data.field_id}`, data.field_value.data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seniorInfoData]);
  return (
    <CardWrapper subTitle={`Senior's Persona`} isExpanded={isProfileCreated}>
      <Grid container spacing={3}>
        {seniorPersonaForm.map((data: any) => (
          <Grid item key={data.field_id} xs={4}>
            <Fields
              name={'persona.' + data.field_id}
              label={data.label_text}
              bottomText={data.field_value.annotation}
              rows={3}
              multiline={true}
              inputProps={{style: {padding: 0}}}
              {...register('persona.' + data.field_id)}
            />
          </Grid>
        ))}
      </Grid>
    </CardWrapper>
  );
};

export {SeniorsPersona};
