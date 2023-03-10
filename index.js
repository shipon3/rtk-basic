const store = require("./app/store");

const { fetchPosts } = require("./rtkAsyncAction");

store.dispatch(fetchPosts());
