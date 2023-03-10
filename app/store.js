const configureStore = require("@reduxjs/toolkit").configureStore;
const { createLogger } = require("redux-logger");
const postSlice = require("../asyncAction");
const logger = createLogger();

const store = configureStore({
	reducer: {
		post: postSlice,
	},
	middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(logger),
});

module.exports = store;
