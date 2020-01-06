const ApiUrl = "http://tracker-api.zz/";

export const settings = {
  API: ApiUrl,

  TASK_CREATE: ApiUrl + "task/create",
  TASK_UPDATE: ApiUrl + "task/update",
  TASK_LIST: ApiUrl + "task/index",
  TASK_VIEW: ApiUrl + "task/view",
  TASK_DELETE: ApiUrl + "task/delete",
  TASK_GET_HISTORY: ApiUrl + "task/get-history",
  TASK_FILE_DELETE:ApiUrl+"task/file-delete",

  PROJECT_CREATE: ApiUrl + "project/create",
  PROJECT_UPDATE: ApiUrl + "project/update",
  PROJECT_LIST: ApiUrl + "project/index",
  PROJECT_VIEW: ApiUrl + "project/view",
  PROJECT_DELETE: ApiUrl + "project/delete",

  CATEGORY_CREATE: ApiUrl + "category/create",
  CATEGORY_UPDATE: ApiUrl + "category/update",
  CATEGORY_LIST: ApiUrl + "category/index",
  CATEGORY_VIEW: ApiUrl + "category/view",
  CATEGORY_DELETE: ApiUrl + "category/delete",

  NOTE_CREATE: ApiUrl + "note/create",
  NOTE_UPDATE: ApiUrl + "note/update",
  NOTE_LIST: ApiUrl + "note/index",
  NOTE_VIEW: ApiUrl + "note/view",
  NOTE_DELETE: ApiUrl + "note/delete",
  //COMMENT
  COMMENT_LIST: ApiUrl + "comment/list",
  COMMENT_CREATE: ApiUrl + "comment/create",
  COMMENT_UPDATE: ApiUrl + "comment/update",
  COMMENT_DELETE: ApiUrl + "comment/delete",

  //Tags
  TAG_LIST: ApiUrl+"tag/list",
  TAG_CREATE: ApiUrl+"tag/create",
  TAG_UPDATE: ApiUrl+"tag/update",
  TAG_DELETE: ApiUrl + "tag/delete",

  //SEARCH
  APP_SEARCH: ApiUrl + "app/search",
  //Constants for sort
  TASK_SORT_ID: 1,
  TASK_SORT_THEME: 2,
  TASK_SORT_PROJECT: 3,
  TASK_SORT_STATUS: 4,
  TASK_SORT_PRIORITY: 5,
  TASK_SORT_DATE_END: 6,






  //Files
  //  DATE FORMAT
  //   DATE_FORMAT:"YYYY-MM-DD"
  DATE_FORMAT: "DD-MM-YYYY",
  DATE_FORMAT_TO_SERVER: "YYYY-MM-DD",

  //PRIORITY

};
