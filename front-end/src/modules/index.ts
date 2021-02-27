import {Action, applyMiddleware, compose, createStore, Store} from "redux";
import rootReducer from "./rootReducer";
import thunk, {ThunkAction} from "redux-thunk";

const store: Store = createStore(rootReducer,  compose(applyMiddleware(thunk), (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()));

export type RootState = ReturnType<typeof rootReducer>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

export default store;