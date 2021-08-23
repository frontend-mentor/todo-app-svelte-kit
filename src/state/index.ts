import { combineReducers, createStore } from 'redux';
import type { ThemeState } from './theme';
import { themeInitialState, themeReducer } from './theme';
import type { TodosState } from './todos';
import { todosInitialState, todosReducer } from './todos';
import type { Action } from './common';
import { composeWithDevTools } from 'redux-devtools-extension';

export * from './common';
export * from './todos';
export * from './theme';

// Models
export interface AppState {
	theme: ThemeState;
	todos: TodosState;
}

export const initialAppState: AppState = {
	theme: themeInitialState,
	todos: todosInitialState
};

// Reducer
export const appReducer = combineReducers<AppState, Action>({
	theme: themeReducer,
	todos: todosReducer
});

// Store

//export const store = createStore(appReducer, initialAppState, svelteStoreEnhancer);

// Helpers
export function useAppSelector<T>(selectorFn: (state: AppState) => T): T {
	const context = store.getState();
	return selectorFn(context);
}

export function useAppDispatch() {
	return store.dispatch;
}

function createCustomStoreInstance() {
	const reduxStore = createStore(appReducer, initialAppState, composeWithDevTools());

	return {
		subscribe(fn: (state: AppState) => void) {
			fn(reduxStore.getState());

			return reduxStore.subscribe(() => {
				fn(reduxStore.getState());
			});
		},
		dispatch(action) {
			reduxStore.dispatch(action);
		},
		getState() {
			return reduxStore.getState();
		},
		reset() {
			return;
		}
	};
}

export const store = createCustomStoreInstance();
