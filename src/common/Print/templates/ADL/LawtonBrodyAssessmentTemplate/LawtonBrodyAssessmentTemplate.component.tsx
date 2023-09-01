import React from 'react';
import { Box } from '@mui/material'
import ADLScore from 'common/Print/components/ADLScore/ADLScore.component';
import ADLSection from 'common/Print/components/ADLSection/ADLSection.component';
import { getADLScore, infoText } from 'common/Print/Print.utility';
import {
    ILawtonBrodyAssessmentTemplateProps,
    ILawtonBrodySectionData
} from './LawtonBrodyAssessmentTemplate.types';

const LawtonBrodyAssessmentTemplate = ({data = []}: ILawtonBrodyAssessmentTemplateProps) => {
    const score = React.useMemo(() => {
        return getADLScore(data);
    }, [data])
    
    return (
        <Box data-testid='lawton-template'>
            {data?.map((section: ILawtonBrodySectionData) => (
                <ADLSection
                    key={section.surveyName}
                    title={section.surveyData?.title}
                    options={section.surveyData?.options}
                />
            ))}
            <ADLScore score={score} info={infoText.lawton}/>
        </Box>
    )
};

export default LawtonBrodyAssessmentTemplate