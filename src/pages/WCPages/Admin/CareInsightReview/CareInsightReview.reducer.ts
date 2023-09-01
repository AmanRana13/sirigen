// eslint-disable-next-line max-len
import {
  GET_CARE_INSIGHT_REVIEW,
  RESET_CARE_INSIGHT_REVIEWS,
  CARE_INSIGHT_REVIEWS_RESET_PAGINATION,
  CARE_INSIGHT_REVIEWS_END_PAGINATION,
} from './CareInsightReview.action';

const careInsightReviewInitialStates = {
  allCareInsightReviews: [],
  isPaginate: true,
};

/**
 * @description admin careInsightReview reducer
 * @returns care insight states
 */
export const careInsightReviewReducer = (
  state = careInsightReviewInitialStates,
  action: any,
) => {
  switch (action.type) {
    case GET_CARE_INSIGHT_REVIEW: {
      return {
        ...state,
        allCareInsightReviews: [
          ...state.allCareInsightReviews,
          ...action.payload.data,
        ],
      };
    }
    case RESET_CARE_INSIGHT_REVIEWS: {
      return {
        ...state,
        allCareInsightReviews: [],
      };
    }
    case CARE_INSIGHT_REVIEWS_RESET_PAGINATION: {
      return {...state, isPaginate: true};
    }
    case CARE_INSIGHT_REVIEWS_END_PAGINATION: {
      return {...state, isPaginate: false};
    }

    default: {
      return state;
    }
  }
};
