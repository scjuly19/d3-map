export const DEFAULT_STATE = {
  data: null,
  isLoading: false,
};
export const types = {
  REQUEST_COUNTRY_DATA: "COUNTRY/REQUEST_COUNTRY_DATA",
  COUNTRY_DATA_SUCCESS: "COUNTRY/COUNTRY_DATA_SUCCESS",
  COUNTRY_DATA_FAILURE: "COUNTRY/COUNTRY_DATA_FAILURE",
};

export const reducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case types.REQUEST_COUNTRY_DATA:
      return { ...state, isLoading: true };
    case types.COUNTRY_DATA_SUCCESS:
      return { ...state, data: action.payload, isLoading: false };
    case types.COUNTRY_DATA_FAILURE:
      return { ...state, isLoading: false,error:action.payload };
    default:
      return state;
  }
};
export const actions={
    requestCountriesData(){
        return{
            type:types.REQUEST_COUNTRY_DATA
        }
    },
    countryDataSuccess(payload){
        return{
            type:types.COUNTRY_DATA_SUCCESS,
            payload
        }
    },
    countryDataFailure(payload){
        return{
            type:types.COUNTRY_DATA_FAILURE,
            payload
        }
    }
}
