export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const setCurrentUser = decoded => {//si se loguea , setear datos del usuario
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = () => {//logout

  sessionStorage.removeItem("token");
  sessionStorage.removeItem("id");
  window.location.reload();
  //dispatch(setCurrentUser({}));
};
