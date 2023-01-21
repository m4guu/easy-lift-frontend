import { useGetUserIdAndExpirationDate } from "../../store/redux-store/slices/user/user.hooks";
import { useAppDispatch } from "../../store/redux-store/hooks";
import { login, logout } from "../../store/redux-store/slices/user/user.slice";

type UseAuthReturnType = { autoLogin: () => void; autoLogout: () => void };

const useAuth = (): UseAuthReturnType => {
  const { id, expirationDate } = useGetUserIdAndExpirationDate();
  const dispatch = useAppDispatch();

  let logOutTimer: number;

  const autoLogin = () => {
    const storedData = JSON.parse(localStorage.getItem("userData")!);
    if (
      storedData &&
      storedData.id &&
      new Date(storedData.expirationDate) > new Date()
    ) {
      dispatch(login({ ...storedData }));
    }
  };
  const autoLogout = () => {
    if (id && expirationDate) {
      const remainingTime =
        new Date(expirationDate).getTime() - new Date().getTime();
      logOutTimer = setTimeout(dispatch(logout), remainingTime);
    } else {
      clearTimeout(logOutTimer);
    }
  };

  return { autoLogin, autoLogout };
};

export default useAuth;
