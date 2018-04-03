export const RANKING_VIEW = "RANKING_VIEW";

export const CLEAR_ERROR = "CLEAR_ERROR";
export const CLEAR_APRESENTATIONS = "CLEAR_APRESENTATIONS";

export const GET_APRESENTATIONS = "GET_APRESENTATIONS";
export const GET_APRESENTATIONS_ERROR = "GET_APRESENTATIONS_ERROR";
export const GET_APRESENTATIONS_SUCCESS = "GET_APRESENTATIONS_SUCCESS";

export const GET_APRESENTATIONS_NEXT_PAGE = "GET_APRESENTATIONS_NEXT_PAGE";
export const GET_APRESENTATIONS_NEXT_PAGE_ERROR = "GET_APRESENTATIONS_NEXT_PAGE_ERROR";
export const GET_APRESENTATIONS_NEXT_PAGE_SUCCESS = "GET_APRESENTATIONS_NEXT_PAGE_SUCCESS";

export const getApresentations = (uf, name, page) => ({
  type: GET_APRESENTATIONS,
  uf, name, page
});

export const getApresentationsNextPage = (next) => ({
  type: GET_APRESENTATIONS_NEXT_PAGE,
  next
});

export const rankingView = (apresentation_id) => ({
  type: RANKING_VIEW, apresentation_id
});

export const clearApresentations = () => ({
  type: CLEAR_APRESENTATIONS
});

/** Action results body */
export const responseSuccess = (type, data) => ({
  type, data
});

export const responseError = (type, error) => ({
  type, error
});

export const clearError = () => ({
  type: CLEAR_ERROR
});
