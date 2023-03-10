const fetch = require("node-fetch");
const { createStore, applyMiddleware } = require("redux");
const thunkMiddleware = require("redux-thunk");
const initialState = {
	loading: false,
	posts: [],
	error: "",
};
// action creator
const fetchLoading = () => {
	return {
		type: "async/loading",
	};
};
const fetchSuccess = (posts) => {
	return {
		type: "async/success",
		payload: posts,
	};
};

const fetchFailed = (error) => {
	return {
		type: "async/failed",
		payload: error,
	};
};
// reducer
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "async/loading":
			return {
				...state,
				loading: true,
				error: "",
			};
		case "async/success":
			return {
				...state,
				loading: false,
				posts: action.payload,
				error: "",
			};
		case "async/failed":
			return {
				...state,
				loading: false,
				posts: [],
				error: action.payload,
			};

		default:
			return;
	}
};

// thun function

const fetchPosts = () => {
	return async (dispatch) => {
		try {
			dispatch(fetchLoading());
			const response = await fetch(
				"https://jsonplaceholder.typicode.com/posts?_limit=5"
			);
			const posts = await response.json();
			dispatch(fetchSuccess(posts));
		} catch (error) {
			dispatch(fetchFailed(error));
		}
	};
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware.default));

store.subscribe(() => {
	console.log(store.getState());
});

store.dispatch(fetchPosts());
