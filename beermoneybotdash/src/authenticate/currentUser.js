export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const setCurrentUser = decoded => {//si se loguea , setear datos del usuario
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = (dispatch) => {//logout

  sessionStorage.removeItem("token");
  console.log("logout",sessionStorage.getItem("token"));
  dispatch(setCurrentUser({}));
};
