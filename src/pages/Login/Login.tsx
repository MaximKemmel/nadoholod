import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSeletor";

import styles from "./Login.module.sass";

import { ServerStatusType } from "../../enums/serverStatusType";
import { initServerStatus } from "../../types/main/serverStatus";

const Login = () => {
  const { login, authMe, setLoginStatus } = useActions();
  const navigate = useNavigate();
  const isAuth = useTypedSelector((state) => state.userReducer.isAuth);
  const loginStatus = useTypedSelector((state) => state.userReducer.loginStatus);
  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");
  const [errorForm, setErrorForm] = useState("");

  useEffect(() => {
    document.title = "Панель управления | Авторизация";
    authMe();
  }, []);

  useEffect(() => {
    setErrorForm("");
  }, [loginValue, password]);

  useEffect(() => {
    if (isAuth) {
      navigate("/admin");
    }
  }, [isAuth]);

  useEffect(() => {
    if (loginStatus.status === ServerStatusType.Error) {
      if (loginStatus.error !== "Ошибка") {
        setErrorForm(loginStatus.error);
        setLoginStatus(initServerStatus());
      }
    }
  }, [loginStatus]);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (loginValue !== "" && password.length > 5) {
      login({ login: loginValue, password: password });
    }
  };

  return (
    <div className={styles.wrapper_content}>
      <div className={styles.title}>Авторизация</div>
      <form onSubmit={handleOnSubmit}>
        <input
          placeholder={"Логин"}
          type="login"
          required
          onChange={(event) => setLoginValue(event.target.value.trim())}
          value={loginValue}
        />
        <input
          placeholder={"Пароль"}
          type="password"
          required
          onChange={(event) => setPassword(event.target.value.trim())}
          value={password}
          minLength={6}
        />
        {errorForm !== "" ? <div className={styles.error}>{errorForm}</div> : null}
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default Login;
