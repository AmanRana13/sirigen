import { Box } from '@mui/material';
import React from 'react';
import ADLScore from 'common/Print/components/ADLScore/ADLScore.component';
import ADLSection from 'common/Print/components/ADLSection/ADLSection.component';
import {
    IKatzADLAssessmentTemplateProps,
    IKatzADLSectionData
} from './KatzADLAssessmentTemplate.types';
import { getADLScore, infoText } from 'common/Print/Print.utility';

const KatzADLAssessmentTemplate = ({
    data = []
}: IKatzADLAssessmentTemplateProps) => {
    const score = React.useMemo(() => {
        return getADLScore(data);
    }, [data])

    return (
        <Box data-testid='katz-template'>
            {data?.map((section: IKatzADLSectionData) => (
                <ADLSection
                    key={section.surveyName}
                    title={section.surveyData?.title}
                    options={section.surveyData?.options}
                />
            ))}
            <ADLScore score={score} info={infoText.katz} />
        </Box>
    )
};

export default KatzADLAssessmentTemplate