import { logoutSuccess } from './loginActions';

export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILED = 'FETCH_CATEGORIES_FAILED';
export const FETCH_CATEGORY_SUCCESS = 'FETCH_CATEGORY_SUCCESS';
export const FETCH_CATEGORY_FAILED = 'FETCH_CATEGORY_FAILED';
export const FETCH_THREADS_SUCCESS = 'FETCH_THREADS_SUCCESS';
export const FETCH_THREADS_FAILED = 'FETCH_THREADS_FAILED';
export const FETCH_LATEST_THREADS_SUCCESS = 'FETCH_LATEST_THREADS_SUCCESS';
export const FETCH_LATEST_THREADS_FAILED = 'FETCH_LATEST_THREADS_FAILED';
export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS';
export const ADD_CATEGORY_FAILED = 'ADD_CATEGORY_FAILED';
export const REMOVE_CATEGORY_SUCCESS = 'REMOVE_CATEGORY_SUCCESS';
export const REMOVE_CATEGORY_FAILED = 'REMOVE_CATEGORY_FAILED';
export const EDIT_CATEGORY_SUCCESS = 'EDIT_CATEGORY_SUCCESS';
export const EDIT_CATEGORY_FAILED = 'EDIT_CATEGORY_FAILED';
export const CLEAR_THREADS = 'CLEAR_THREADS';

//ASync actions

export const getCategories = (dispatch, token) => {
	let request = {
		method: 'GET',
		mode: 'cors',
		headers: { 'Content-type': 'application/json', Authorization: `bearer ${token}` },
	};
	let url = '/api/categories';
	// dispatch(loading());
	fetch(url, request).then((response) => {
		// dispatch(endLoading());
		if (response.ok) {
			response.json().then((data) => {
				dispatch(fetchCategoriesSuccess(data));
				for ( let i = 0; i < data.length; ++i )
					getLatestThreads(dispatch, token, data[i].id);
			}).catch((error) => {
				dispatch(fetchCategoriesFailed(`Failed to parse data. Try again error ${error}`));
			});
		} else {
			if (response.status === 403) {
				dispatch(fetchCategoriesFailed('Server responded with a session failure. Logging out!'));
				dispatch(logoutSuccess());
			} else {
				response.json().then((data) => {
					dispatch(fetchCategoriesFailed(`Server responded with status: ${data.error}`));
				}).catch((error) => {
					dispatch(fetchCategoriesFailed(`Server responded with status: ${response.status}`));
				});
			}
		}
	}).catch((error) => {
		// dispatch(endLoading());
		dispatch(fetchCategoriesFailed(`Server responded with an error: ${error}`));
	});
};

export const getCategory = (dispatch, token, id, loadThreads = true) => {
	let request = {
		method: 'GET',
		mode: 'cors',
		headers: { 'Content-type': 'application/json', Authorization: `bearer ${token}` },
	};
	let url = `/api/categories/${id}`;
	//	 dispatch(loading());
	fetch(url, request).then((response) => {
		//	 dispatch(endLoading());
		if (response.ok) {
			response.json().then((data) => {
				dispatch(fetchCategoryThreadsSuccess(data));
			}).catch((error) => {
				dispatch(fetchCategoryThreadsFailed(`Failed to parse data. Try again error ${error}`));
			});
		} else {
			if (response.status === 403) {
				dispatch(fetchCategoryThreadsFailed('Server responded with a session failure. Logging out!'));
				dispatch(logoutSuccess());
			} else {
				response.json().then((data) => {
					dispatch(fetchCategoryThreadsFailed(`Server responded with status: ${data.error}`));
				}).catch((error) => {
					dispatch(fetchCategoryThreadsFailed(`Server responded with status: ${response.status}`));
				});
			}
		}
	}).catch((error) => {
		//dispatch(endLoading());
		dispatch(fetchCategoryThreadsFailed(`Server responded with an error: ${error}`));
	});
};

export const getThreads = (dispatch, token, id, page) => {
	let request = {
		method: 'GET',
		mode: 'cors',
		headers: { 'Content-type': 'application/json', Authorization: `bearer ${token}` },
	};
	let url = `/api/threads/pages?page=${page}&limit=5&category_id=${id}`;
	// dispatch(loading());
	fetch(url, request).then((response) => {
			// dispatch(endLoading());
			if (response.ok) {
				response.json().then((data) => {
					dispatch(fetchThreadsSuccess(data));
				}).catch((error) => {
					dispatch(fetchThreadsFailed(`Failed to parse data. Try again error ${error}`));
				});
			} else {
				if (response.status === 403) {
					dispatch(fetchThreadsFailed('Server responded with a session failure. Logging out!'));
					dispatch(logoutSuccess());
				} else {
					response.json().then((data) => {
						dispatch(fetchThreadsFailed(`Server responded with status: ${data.error}`));
					}).catch((error) => {
						dispatch(fetchThreadsFailed(`Server responded with status: ${response.status}`));
					});
				}
			}
	}).catch((error) => {
		// dispatch(endLoading());
		dispatch(fetchThreadsFailed(`Server responded with an error: ${error}`));
	});
}

export const getLatestThreads = (dispatch, token, id) => {
	let request = {
		method: 'GET',
		mode: 'cors',
		headers: { 'Content-type': 'application/json', Authorization: `bearer ${token}` },
	};
	let url = `/api/threads/pages?page=1&limit=3&category_id=${id}`;
	fetch(url, request).then((response) => {
			if (response.ok) {
				response.json().then((data) => {
					dispatch(fetchLatestThreadsSuccess({threads:data.docs,id:id}));
				}).catch((error) => {
					dispatch(fetchLatestThreadsFailed(`Failed to parse data. Try again error ${error}`));
				});
			} else {
				if (response.status === 403) {
					dispatch(fetchLatestThreadsFailed('Server responded with a session failure. Logging out!'));
					dispatch(logoutSuccess());
				} else {
					response.json().then((data) => {
						dispatch(fetchLatestThreadsFailed(`Server responded with status: ${data.error}`));
					}).catch((error) => {
						dispatch(fetchLatestThreadsFailed(`Server responded with status: ${response.status}`));
					});
				}
			}
	}).catch((error) => {
		dispatch(fetchLatestThreadsFailed(`Server responded with an error: ${error}`));
	});
}

//Action creators

export const clearCategories = () => {
	return {
		type: CLEAR_THREADS
	};
}

export const fetchCategoriesSuccess = (categories) => {
	return {
		type: FETCH_CATEGORIES_SUCCESS,
		categories: categories,
	};
};

export const fetchCategoriesFailed = (error) => {
	return {
		type: FETCH_CATEGORIES_FAILED,
		error: error,
	};
};

export const fetchCategoryThreadsSuccess = (category) => {
	return {
		type: FETCH_CATEGORY_SUCCESS,
		category: category,
	};
};
	
export const fetchCategoryThreadsFailed = (error) => {
	return {
		type: FETCH_CATEGORY_FAILED,
		error: error,
	};
};

export const fetchThreadsSuccess = (threads) => {
	return {
		threads: threads,
		type: FETCH_THREADS_SUCCESS
	};
};
	
export const fetchThreadsFailed = (error) => {
	return {
		type: FETCH_THREADS_FAILED,
		error: error,
	};
};

export const fetchLatestThreadsSuccess = (data) => {
	return {
		data: data,
		type: FETCH_LATEST_THREADS_SUCCESS
	};
};
	
export const fetchLatestThreadsFailed = (error) => {
	return {
		type: FETCH_LATEST_THREADS_FAILED,
		error: error,
	};
};

export const addCategorySuccess = () => {
	return {
		type: ADD_CATEGORY_SUCCESS,
	};
};

export const addCategoryFailed = (error) => {
	return {
		type: ADD_CATEGORY_FAILED,
		error: error,
	};
};

export const removeCategorySuccess = () => {
	return {
		type: REMOVE_CATEGORY_SUCCESS,
	};
};

export const removeCategoryFailed = (error) => {
	return {
		type: REMOVE_CATEGORY_FAILED,
		error: error,
	};
};

export const editCategorySuccess = () => {
	return {
		type: EDIT_CATEGORY_SUCCESS,
	};
};

export const editCategoryFailed = (error) => {
	return {
		type: EDIT_CATEGORY_FAILED,
		error: error,
	};
};