import { logoutSuccess } from './loginActions';
import { getCategory } from './categoryActions';

export const FETCH_THREAD_SUCCESS = 'FETCH_THREAD_SUCCESS';
export const FETCH_THREAD_FAILED = 'FETCH_THREAD_FAILED';
export const FETCH_COMMENT_SUCCESS = 'FETCH_COMMENT_SUCCESS';
export const FETCH_COMMENT_FAILED = 'FETCH_COMMENT_FAILED';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_FAILED = 'FETCH_COMMENTS_FAILED';
export const ADD_THREAD_SUCCESS = 'ADD_THREAD_SUCCESS';
export const ADD_THREAD_FAILED = 'ADD_THREAD_FAILED';
export const REMOVE_THREAD_SUCCESS = 'REMOVE_THREAD_SUCCESS';
export const REMOVE_THREAD_FAILED = 'REMOVE_THREAD_FAILED';
export const EDIT_THREAD_SUCCESS = 'EDIT_THREAD_SUCCESS';
export const EDIT_THREAD_FAILED = 'EDIT_THREAD_FAILED';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILED = 'ADD_COMMENT_FAILED';
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_FAILED = 'REMOVE_COMMENT_FAILED';
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';
export const EDIT_COMMENT_FAILED = 'EDIT_COMMENT_FAILED';
export const CLEAR_THREAD_AND_COMMENTS = 'CLEAR_THREAD_AND_COMMENTS';


export const getThread = (dispatch, token, id, fetchCategory = false) => {
	let request = {
		method: 'GET',
		mode: 'cors',
		headers: { 'Content-type': 'application/json', Authorization: `bearer ${token}` },
	};
	let url = `/api/threads/${id}`;
	//dispatch(loading());
	fetch(url, request).then((response) => {
		//dispatch(endLoading());
		if (response.ok) {
			response.json().then((data) => {
				dispatch(fetchThreadSuccess(data));
				if (fetchCategory)
					getCategory(dispatch, token, data.category_id, false);
			}).catch((error) => {
				dispatch(fetchThreadFailed(`Failed to parse data. Try again error ${error}`));
			});
		} else {
			if (response.status === 403) {
			dispatch(fetchThreadFailed('Server responded with a session failure. Logging out!'));
			dispatch(logoutSuccess());
			} else {
			response.json().then((data) => {
				dispatch(fetchThreadFailed(`Server responded with status: ${data.error}`));
			}).catch((error) => {
				dispatch(fetchThreadFailed(`Server responded with status: ${response.status}`));
			});
			}
		}
	}).catch((error) => {
		//dispatch(endLoading());
		dispatch(fetchThreadFailed(`Server responded with an error: ${error}`));
	});
};

export const getComment = (dispatch, token, id) => {
	let request = {
		method: 'GET',
		mode: 'cors',
		headers: { 'Content-type': 'application/json', Authorization: `bearer ${token}` },
	};
	let url = `/api/comments/${id}`;
	//dispatch(loading());
	fetch(url, request).then((response) => {
		//dispatch(endLoading());
		if (response.ok) {
			response.json().then((data) => {
				dispatch(fetchCommentSuccess(data));
			}).catch((error) => {
				dispatch(fetchCommentFailed(`Failed to parse data. Try again error ${error}`));
			});
		} else {
			if (response.status === 403) {
			dispatch(fetchCommentFailed('Server responded with a session failure. Logging out!'));
			dispatch(logoutSuccess());
			} else {
			response.json().then((data) => {
				dispatch(fetchCommentFailed(`Server responded with status: ${data.error}`));
			}).catch((error) => {
				dispatch(fetchCommentFailed(`Server responded with status: ${response.status}`));
			});
				}
		}
	}).catch((error) => {
		//dispatch(endLoading());
		dispatch(fetchCommentFailed(`Server responded with an error: ${error}`));
	});
};

export const getComments = (dispatch, token, id, page) => {
	let request = {
		method: 'GET',
		mode: 'cors',
		headers: { 'Content-type': 'application/json', Authorization: `bearer ${token}` },
	};
	let url = `/api/comments/pages?page=${page}&limit=5&thread_id=${id}`;
	//dispatch(loading());
		fetch(url, request).then((response) => {
		//dispatch(endLoading());
		if (response.ok) {
			response.json().then((data) => {
				dispatch(fetchCommentsSuccess(data));
			}).catch((error) => {
				dispatch(fetchCommentsFailed(`Failed to parse data. Try again error ${error}`));
			});
		} else {
			if (response.status === 403) {
			dispatch(fetchCommentsFailed('Server responded with a session failure. Logging out!'));
			dispatch(logoutSuccess());
			} else {
			response.json().then((data) => {
				dispatch(fetchCommentsFailed(`Server responded with status: ${data.error}`));
			}).catch((error) => {
				dispatch(fetchCommentsFailed(`Server responded with status: ${response.status}`));
			});
			}
		}
	}).catch((error) => {
		//dispatch(endLoading());
		dispatch(fetchCommentsFailed(`Server responded with an error: ${error}`));
	});
};

export const newThread = (dispatch, token, thread, history) => {
	let request = {
		method: 'POST',
		mode: 'cors',
		headers: { 'Content-type': 'application/json', Authorization: `bearer ${token}` },
		body: JSON.stringify(thread)
	};
	let url = '/api/threads';
	//dispatch(loading());
	fetch(url, request).then((response) => {
		//dispatch(endLoading());
		if (response.ok) {
		response.json().then((data) => {
			dispatch(addThreadSuccess());
			history.push(`/t/${data.id}`);
		}).catch((error) => {
			dispatch(addThreadFailed(`Failed to parse data. Try again error ${error}`));
		});
		} else {
		if (response.status === 403) {
			dispatch(addThreadFailed('Server responded with a session failure. Logging out!'));
			dispatch(logoutSuccess());
		} else {
			response.json().then((data) => {
			dispatch(addThreadFailed(`Server responded with status: ${data.error}`));
			}).catch((error) => {
			dispatch(addThreadFailed(`Server responded with status: ${response.status}`));
			});
		}
		}
	}).catch((error) => {
		//dispatch(endLoading());
		dispatch(addThreadFailed(`Server responded with an error: ${error}`));
	});
};

export const editThread = (dispatch, token, thread, history) => {
	let request = {
		method: 'PUT',
		mode: 'cors',
		headers: { 'Content-type': 'application/json', Authorization: `bearer ${token}` },
		body: JSON.stringify(thread)
	};
	let url = '/api/threads';
	//dispatch(loading());
	fetch(url, request).then((response) => {
		//dispatch(endLoading());
		if (response.ok) {
		dispatch(editThreadSuccess());
		history.push(`/t/${thread.id}`);
		} else {
		if (response.status === 403) {
			dispatch(editThreadFailed('Server responded with a session failure. Logging out!'));
			dispatch(logoutSuccess());
		} else {
			response.json().then((data) => {
			dispatch(editThreadFailed(`Server responded with status: ${data.error}`));
			}).catch((error) => {
			dispatch(editThreadFailed(`Server responded with status: ${response.status}`));
			});
		}
		}
	}).catch((error) => {
		//dispatch(endLoading());
		dispatch(editThreadFailed(`Server responded with an error: ${error}`));
	});
};

export const newComment = (dispatch, token, comment, history) => {
	let request = {
		method: 'POST',
		mode: 'cors',
		headers: { 'Content-type': 'application/json', Authorization: `bearer ${token}` },
		body: JSON.stringify(comment)
	};
	let url = '/api/comments';
	//dispatch(loading());
	fetch(url, request).then((response) => {
		//dispatch(endLoading());
		if (response.ok) {
		response.json().then((data) => {
			dispatch(addCommentSuccess());
			history.push(`/t/${data.thread_id}`);
		}).catch((error) => {
			dispatch(addCommentFailed(`Failed to parse data. Try again error ${error}`));
		});
		} else {
		if (response.status === 403) {
			dispatch(addCommentFailed('Server responded with a session failure. Logging out!'));
			dispatch(logoutSuccess());
		} else {
			response.json().then((data) => {
			dispatch(addCommentFailed(`Server responded with status: ${data.error}`));
			}).catch((error) => {
			dispatch(addCommentFailed(`Server responded with status: ${response.status}`));
			});
		}
		}
	}).catch((error) => {
		//dispatch(endLoading());
		dispatch(addCommentFailed(`Server responded with an error: ${error}`));
	});
};

export const editComment = (dispatch, token, comment, history) => {
	let request = {
		method: 'PUT',
		mode: 'cors',
		headers: { 'Content-type': 'application/json', Authorization: `bearer ${token}` },
		body: JSON.stringify(comment)
	};
	let url = '/api/comments';
	////dispatch(loading());
	fetch(url, request).then((response) => {
		//dispatch(endLoading());
		if (response.ok) {
		dispatch(editCommentSuccess());
		history.push(`/t/${comment.thread_id}`);
		} else {
		if (response.status === 403) {
			dispatch(editCommentFailed('Server responded with a session failure. Logging out!'));
			dispatch(logoutSuccess());
		} else {
			response.json().then((data) => {
			dispatch(editCommentFailed(`Server responded with status: ${data.error}`));
			}).catch((error) => {
			dispatch(editCommentFailed(`Server responded with status: ${response.status}`));
			});
		}
		}
	}).catch((error) => {
		//dispatch(endLoading());
		dispatch(editCommentFailed(`Server responded with an error: ${error}`));
	});
};

export const clearThreadAndComments = () => {
	return {
		type: CLEAR_THREAD_AND_COMMENTS
	};
}

export const fetchThreadSuccess = (thread) => {
	return {
		type: FETCH_THREAD_SUCCESS,
		thread: thread,
	};
};
	
export const fetchThreadFailed = (error) => {
	return {
		type: FETCH_THREAD_FAILED,
		error: error,
	};
};

export const fetchCommentSuccess = (comment) => {
	return {
		type: FETCH_COMMENT_SUCCESS,
		comment: comment,
	};
};
	
export const fetchCommentFailed = (error) => {
		return {
		type: FETCH_COMMENT_FAILED,
		error: error,
		};
};
	
export const fetchCommentsSuccess = (comments) => {
	return {
		type: FETCH_COMMENTS_SUCCESS,
		comments: comments,
	};
};
	
export const fetchCommentsFailed = (error) => {
		return {
		type: FETCH_COMMENTS_FAILED,
		error: error,
		};
};
	
export const addThreadSuccess = () => {
	return {
		type: ADD_THREAD_SUCCESS,
	};
};
	
export const addThreadFailed = (error) => {
	return {
		type: ADD_THREAD_FAILED,
		error: error,
	};
};
	
export const removeThreadSuccess = () => {
	return {
		type: REMOVE_THREAD_SUCCESS,
	};
};
	
export const removeThreadFailed = (error) => {
	return {
		type: REMOVE_THREAD_FAILED,
		error: error,
	};
};
	
export const editThreadSuccess = () => {
	return {
		type: EDIT_THREAD_SUCCESS,
	};
};
	
export const editThreadFailed = (error) => {
	return {
		type: EDIT_THREAD_FAILED,
		error: error,
	};
};

export const addCommentSuccess = () => {
	return {
		type: ADD_COMMENT_SUCCESS,
	};
};
	
export const addCommentFailed = (error) => {
	return {
		type: ADD_COMMENT_FAILED,
		error: error,
	};
};
	
export const removeCommentSuccess = () => {
	return {
		type: REMOVE_COMMENT_SUCCESS,
	};
};
	
export const removeCommentFailed = (error) => {
	return {
		type: REMOVE_COMMENT_FAILED,
		error: error,
	};
};
	
export const editCommentSuccess = () => {
	return {
		type: EDIT_COMMENT_SUCCESS,
	};
};
	
export const editCommentFailed = (error) => {
	return {
		type: EDIT_COMMENT_FAILED,
		error: error,
	};
};

// export const fetchAuthorSuccess = (author) => {
// 	return {
// 		type: FETCH_AUTHOR_SUCCESS,
// 		author: author,
// 	};
// };
	
// export const fetchAuthorFailed = (error) => {
// 	return {
// 		type: FETCH_AUTHOR_FAILED,
// 		error: error,
// 	};
// };