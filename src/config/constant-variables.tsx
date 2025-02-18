import {DimensionValue} from 'react-native';
import utils from 'src/utils';

type ConstantVariablesTypes = {
  TAB_BAR_TOTAL_HEIGHT: number;
  APP_DATE_FORMAT: string;
  API_DATE_FORMAT: string;
  API_DATE_TIME_FORMAT: string;
  APP_DATE_TIME_FORMAT: string;
  APP_DATE_FORMAT_DAY: string;
  APP_TIME_FORMAT: string;
  API_TIME_FORMAT: string;
  DYNAMIC_SCREEN_WIDTH: DimensionValue | undefined;
  DYNAMIC_COMPONENTS_WIDTH: DimensionValue | undefined;
  DYNAMIC_TAB_WIDTH: DimensionValue | undefined;
  DYNAMIC_POPUP_WIDTH: DimensionValue | undefined;
};

export var ConstantVariables: ConstantVariablesTypes = {
  TAB_BAR_TOTAL_HEIGHT: utils.normalize(76),
  APP_DATE_FORMAT: 'DD MMM, yyyy',
  API_DATE_FORMAT: 'YYYY-MM-DD',
  API_DATE_TIME_FORMAT: 'YYYY-MM-DD',
  APP_DATE_TIME_FORMAT: 'DD MMM, yyyy hh:mm A',
  APP_DATE_FORMAT_DAY: 'DD MMM, dddd',
  APP_TIME_FORMAT: 'hh:mm A',
  API_TIME_FORMAT: 'HH:mm:ss',
  DYNAMIC_SCREEN_WIDTH: utils.dimension.isPad ? '60%' : '92%',
  DYNAMIC_TAB_WIDTH: utils.dimension.isPad ? '60%' : '100%',
  DYNAMIC_COMPONENTS_WIDTH: utils.dimension.isPad ? '60%' : '87%',
  DYNAMIC_POPUP_WIDTH: utils.dimension.isPad ? '60%' : '100%',
};

export default ConstantVariables;

export const GlobalVariables = {
  IS_CART_LOAD: false,
  IS_MY_PRODUCTS_LOAD: false,
};
