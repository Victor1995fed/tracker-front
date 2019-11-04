
// const ApiUrl = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD,EUR";
const ApiUrl = "http://tracker-api.zz/";


export const settings =  {
  API: ApiUrl,
  TASK_CREATE: ApiUrl+'task/create',
  TASK_UPDATE: ApiUrl+'task/update',
  TASK_LIST: ApiUrl+'task/index',
  TASK_VIEW: ApiUrl+'task/view',
  TASK_DELETE: ApiUrl+'task/delete',

  PROJECT_CREATE: ApiUrl+'project/create',
  PROJECT_UPDATE: ApiUrl+'project/update',
  PROJECT_LIST: ApiUrl+'project/index',
  PROJECT_VIEW: ApiUrl+'project/view',
  PROJECT_DELETE: ApiUrl+'project/delete',

  CATEGORY_CREATE: ApiUrl+'category/create',
  CATEGORY_UPDATE: ApiUrl+'category/update',
  CATEGORY_LIST: ApiUrl+'category/index',
  CATEGORY_VIEW: ApiUrl+'category/view',
  CATEGORY_DELETE: ApiUrl+'category/delete',

  NOTE_CREATE: ApiUrl+'note/create',
  NOTE_UPDATE: ApiUrl+'note/update',
  NOTE_LIST: ApiUrl+'note/index',
  NOTE_VIEW: ApiUrl+'note/view',
  NOTE_DELETE: ApiUrl+'note/delete',
};
