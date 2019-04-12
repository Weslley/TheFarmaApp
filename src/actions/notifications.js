export const CLEAR_ERROR = "CLEAR_ERROR";
export const CLEAR_NOTIFICATIONS = "CLEAR_NOTIFICATIONS";

export const GET_NOTIFICATIONS = "GET_NOTIFICATIONS";
export const GET_NOTIFICATIONS_ERROR = "GET_NOTIFICATIONS_ERROR";
export const GET_NOTIFICATIONS_SUCCESS = "GET_NOTIFICATIONS_SUCCESS";

export const GET_NOTIFICATIONS_NEXT_PAGE = "GET_NOTIFICATIONS_NEXT_PAGE";
export const GET_NOTIFICATIONS_NEXT_PAGE_ERROR = "GET_NOTIFICATIONS_NEXT_PAGE_ERROR";
export const GET_NOTIFICATIONS_NEXT_PAGE_SUCCESS = "GET_NOTIFICATIONS_NEXT_PAGE_SUCCESS";

export const VIEW_NOTIFICATION = "VIEW_NOTIFICATION";
export const VIEW_NOTIFICATION_ERROR = "VIEW_NOTIFICATION_ERROR";
export const VIEW_NOTIFICATION_SUCCESS = "VIEW_NOTIFICATION_SUCCESS";

export const viewNotification = params => ({
    type: VIEW_NOTIFICATION, params
});

export const getNotifications = params => ({
  type: GET_NOTIFICATIONS, params
});

export const getNotificationsNextPage = (next) => ({
  type: GET_NOTIFICATIONS_NEXT_PAGE, next
});

export const clearNotifications = () => ({
  type: CLEAR_NOTIFICATIONS
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

