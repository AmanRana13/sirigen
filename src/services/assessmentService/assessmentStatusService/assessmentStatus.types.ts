import { AssessmentStatuses } from "globals/enums";
import { Nullable } from "globals/global.types";

export interface IAssessmentStatus {
    name: string;
    status: AssessmentStatuses;
    datetime: Nullable<string>;
}