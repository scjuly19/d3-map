import { put, takeLatest } from "redux-saga/effects";
import { types, actions as countryActions } from "../reducers/countries";

function* getCountryData() {
  try {
    const response = yield fetch(
      "https://www.trackcorona.live/api/countries"
    ).then((res) =>
      res
        .json()
        .then((data) => ({ data: data, status: res.status }))
        .then((res) => {
          return res.data;
        })
    );
    yield put(countryActions.countryDataSuccess(response));
  } catch (err) {
    yield put(countryActions.countryDataFailure(err));
  }
}

export function* countryDataSaga(){
    yield takeLatest(types.REQUEST_COUNTRY_DATA,getCountryData);
}
