import { clearContactReducerState, getContacts } from './contactActions';

//Action constants

export const LOADING = 'LOADING';
export const END_LOADING = 'END_LOADING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

//Async Actions

export const onLogin = (user, history) => {
  return (dispatch) => {
    let request = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(user),
    };
    dispatch(loading());
    fetch('/api/users/login', request)
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((data) => {
              dispatch(loginSuccess(data.token));
			  history.push('/');
            })
            .catch((error) => {
              dispatch(loginFailed('Failed to parse response. Reason:', error));
            });
        } else {
          dispatch(loginFailed('Server responded with status:', response.status));
        }
      })
      .catch((error) => {
        dispatch(loginFailed('Server responded with an error:', error));
      });
  };
};

export const onLogout = (token) => {
  return (dispatch) => {
    let request = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-type': 'application/json', token: token },
    };
    dispatch(loading());
    fetch('/logout', request)
      .then((response) => {
        dispatch(logoutSuccess());
        dispatch(clearContactReducerState());
      })
      .catch((error) => {
        dispatch(logoutFailed('Server responded with an error', error));
        dispatch(clearContactReducerState());
      });
  };
};
// Action Creators

export const loading = () => {
  return {
    type: LOADING,
  };
};

export const endLoading = () => {
  return {
    type: END_LOADING,
  };
};

export const loginSuccess = (token) => {
  return {
    type: LOGIN_SUCCESS,
    token: token,
  };
};

export const loginFailed = (error) => {
  return {
    type: LOGIN_FAILED,
    error: error,
  };
};

export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const logoutFailed = (error) => {
  return {
    type: LOGOUT_FAILED,
  };
};
