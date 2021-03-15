import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { fork, all } from "redux-saga/effects";
import { countryDataSaga } from "../saga/countrySaga";
import { reducer as countryReducer } from "../reducers/countries";
const appReducer = combineReducers({
  countryData: countryReducer,
});
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const enhancer = applyMiddleware(...middlewares);
const rootReducer = (state, action) => {
  return appReducer(state, action);
};
const store = createStore(rootReducer, {}, enhancer);
function* rootSaga() {
  yield all([fork(countryDataSaga)]);
}
sagaMiddleware.run(rootSaga);
export default store;
