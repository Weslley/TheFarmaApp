export const CLEAR_ERROR = "CLEAR_ERROR";
export const CLEAR_ORDER = "CLEAR_ORDER";
export const CLEAR_ORDERS = "CLEAR_ORDERS";
export const CLEAR_PROPOSAL = "CLEAR_PROPOSAL";

export const GET_ORDER = "GET_ORDER";
export const GET_ORDER_ERROR = "GET_ORDER_ERROR";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";

export const LIST_ORDER = "LIST_ORDER";
export const LIST_ORDER_ERROR = "LIST_ORDER_ERROR";
export const LIST_ORDER_SUCCESS = "LIST_ORDER_SUCCESS";

export const LIST_ORDER_NEXT_PAGE = "LIST_ORDER_NEXT_PAGE";
export const LIST_ORDER_NEXT_PAGE_ERROR = "LIST_ORDER_NEXT_PAGE_ERROR";
export const LIST_ORDER_NEXT_PAGE_SUCCESS = "LIST_ORDER_NEXT_PAGE_SUCCESS";

export const CREATE_ORDER = "CREATE_ORDER";
export const CREATE_ORDER_ERROR = "CREATE_ORDER_ERROR";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";

export const UPDATE_ORDER = "UPDATE_ORDER";
export const UPDATE_ORDER_ERROR = "UPDATE_ORDER_ERROR";
export const UPDATE_ORDER_SUCCESS = "UPDATE_ORDER_SUCCESS";

export const CANCEL_ORDER = "CANCEL_ORDER";
export const CANCEL_ORDER_ERROR = "CANCEL_ORDER_ERROR";
export const CANCEL_ORDER_SUCCESS = "CANCEL_ORDER_SUCCESS";

export const SELECT_PROPOSAL = "SELECT_PROPOSAL";

export const GET_PROPOSALS = "GET_PROPOSALS";
export const GET_PROPOSALS_ERROR = "GET_PROPOSALS_ERROR";
export const GET_PROPOSALS_SUCCESS = "GET_PROPOSALS_SUCCESS";

export const CHECKOUT = "CHECKOUT";
export const CHECKOUT_ERROR = "CHECKOUT_ERROR";
export const CHECKOUT_SUCCESS = "CHECKOUT_SUCCESS";

export const getOrder = params => ({
    type: GET_ORDER, params
});

export const getOrders = params => ({
    type: LIST_ORDER, params
});

export const getOrdersNextPage = (params) => ({
    type: LIST_ORDER_NEXT_PAGE, params
});

export const selectProposal = params => ({
    type: SELECT_PROPOSAL, params
});

export const clearProposal = () => ({
    type: CLEAR_PROPOSAL
});

export const getProposals = params => ({
    type: GET_PROPOSALS, params
});

export const checkout = params => ({
    type: CHECKOUT, params
});

export const createOrder = params => ({
    type: CREATE_ORDER, params
});

export const updateOrder = params => ({
    type: UPDATE_ORDER, params
});

export const cancelOrder = params => ({
    type: CANCEL_ORDER, params
});

export const clearOrder = () => ({
    type: CLEAR_ORDER
});

export const clearOrders = () => ({
    type: CLEAR_ORDERES
});

export const clearError = () => ({
    type: CLEAR_ERROR
});

/** Action results body */
export const responseSuccess = (type, data) => ({
    type, data
});

export const responseError = (type, error) => ({
    type, error
});

