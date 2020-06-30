import { loading, endLoading, logoutSuccess } from './loginActions';

export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILED = 'FETCH_CATEGORIES_FAILED';
export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS';
export const ADD_CATEGORY_FAILED = 'ADD_CATEGORY_FAILED';
export const REMOVE_CATEGORY_SUCCESS = 'REMOVE_CATEGORY_SUCCESS';
export const REMOVE_CATEGORY_FAILED = 'REMOVE_CATEGORY_FAILED';
export const EDIT_CATEGORY_SUCCESS = 'EDIT_CATEGORY_SUCCESS';
export const EDIT_CATEGORY_FAILED = 'EDIT_CATEGORY_FAILED';

//ASync actions

export const getCategories = (token) => {
  return (dispatch) => {
    let request = {
      method: 'GET',
      mode: 'cors',
      headers: { 'Content-type': 'application/json', token: token },
    };
    let url = '/api/categories';
    dispatch(loading());
    fetch(url, request)
      .then((response) => {
        dispatch(endLoading());
        if (response.ok) {
          response
            .json()
            .then((data) => {
              console.log(`from actions data: ${data}`);
              dispatch(fetchCategoriesSuccess(data));
            })
            .catch((error) => {
              dispatch(fetchCategoriesFailed(`Failed to parse data. Try again error ${error}`));
            });
        } else {
          if (response.status === 403) {
            dispatch(fetchCategoriesFailed('Server responded with a session failure. Logging out!'));
            dispatch(logoutSuccess());
          } else {
            dispatch(fetchCategoriesFailed(`Server responded with a status: ${response.status}`));
          }
        }
      })
      .catch((error) => {
        dispatch(endLoading());
        dispatch(fetchCategoriesFailed(`Server responded with an error: ${error}`));
      });
  };
};

//Action creators

export const fetchCategoriesSuccess = (list) => {
  return {
    type: FETCH_CATEGORIES_SUCCESS,
    list: list,
  };
};

export const fetchCategoriesFailed = (error) => {
  return {
    type: FETCH_CATEGORIES_FAILED,
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