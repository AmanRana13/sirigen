import { AssessmentName } from "globals/enums";
import { AssessmentStatuses } from "globals/enums";
import { Nullable } from "globals/global.types";

export interface IAssessmentStatus {
    status: AssessmentStatuses;
    datetime: Nullable<string>;
}

export interface IInitialAssessmentStatus {
    [AssessmentName.HOLISTIC]: IAssessmentStatus;
    [AssessmentName.KATZ_INDEPENDENCE]: IAssessmentStatus;
    [AssessmentName.LAWTON_BRODY]: IAssessmentStatus;
    [AssessmentName.MEDICAL_CONDITION]: IAssessmentStatus;
    [AssessmentName.CAREGIVER_STRAIN]: IAssessmentStatus;
    [AssessmentName.WELLNESS_SURVEY]: IAssessmentStatus;
    [AssessmentName.MEDICATION_LIST]: IAssessmentStatus;
}

export const initialAssessmentStatus: IInitialAssessmentStatus = {
    [AssessmentName.HOLISTIC]: {
        status: AssessmentStatuses.COMPLETE,
        datetime: null
    },
    [AssessmentName.KATZ_INDEPENDENCE]: {
        status: AssessmentStatuses.COMPLETE,
        datetime: null
    },
    [AssessmentName.LAWTON_BRODY]: {
        status: AssessmentStatuses.COMPLETE,
        datetime: null
    },
    [AssessmentName.MEDICAL_CONDITION]: {
        status: AssessmentStatuses.COMPLETE,
        datetime: null
    },
    [AssessmentName.CAREGIVER_STRAIN]: {
        status: AssessmentStatuses.COMPLETE,
        datetime: null
    },
    [AssessmentName.WELLNESS_SURVEY]: {
        status: AssessmentStatuses.COMPLETE,
        datetime: null
    },
    [AssessmentName.MEDICATION_LIST]: {
        status: AssessmentStatuses.COMPLETE,
        datetime: null
    }
}