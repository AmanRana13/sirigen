export const adminBaseRoute = '/portal-admin/';

export const appRoutesEndpoints = {
  homePage: '/',
  admin: {
    baseRoute: adminBaseRoute,
    nestedRoutes: {
      announcement: {
        baseRoute: `announcement`,
      },
      careInsightReview: {
        baseRoute: `care-insight-review`,
      },
      corporateAndFacilities: {
        baseRoute: `corporate-facilities`,
      },
      facilities: {
        baseRoute: `corporate-facilities/:corporateId'`,
      },
      accounts: {
        baseRoute: `accounts`,
      },
      vimientUsers: {
        baseRoute: `vimient-users`,
      },
      corporateUsers: {
        baseRoute: `corporate-users`,
      },
      agentSchedule: {
        baseRoute: `agent-schedule`,
      },
      poaReview: {
        baseRoute: `poa-review`,
      },
      assessment: {
        baseRoute: `assessment`,
      },
      wellnesSurvey: {
        baseRoute: `wellness-survey`,
      },
      holisticAssessment: {
        baseRoute: `holistic-assessment`,
      },
      medicalCondition: {
        baseRoute: `medical-condition`,
      },
      aDLAssessment: {
        baseRoute: `adl-assessment`,
      },
      cIRangeMilestones: {
        baseRoute: `ci-range-milestones`,
      },
      assignment: {
        baseRoute: 'assignment',
      },
      seniorCoach: {
        baseRoute: 'senior-coach',
      },
      agentCoach: {
        baseRoute: 'agent-coach',
      },
    },
  },
};
