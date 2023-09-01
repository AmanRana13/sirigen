import { Box } from '@mui/material'
import HolisticSection from 'common/Print/components/HolisticSection/HolisticSection.component';
import HolisticStats from 'common/Print/components/HolisticStats/HolisticStats.component';
import {
    IHolisicAssessmentTemplateProps,
    IHolisticSectionData
} from './HolisticAssessmentTemplate.types';
import {startCase} from 'lodash';


const HolisticAssessmentTemplate = (props: IHolisicAssessmentTemplateProps) => {
    const { data = [] } = props;
    return (
        <Box data-testid='holistic-template'>
            {data?.map((section: IHolisticSectionData) => (
                <HolisticSection
                    key={section.surveyName} heading={startCase(section.surveyName)}
                    data={section.surveyData}
                />
            ))}
            <HolisticStats data={data} />
        </Box>
    )
};

export default HolisticAssessmentTemplate