import { connectionPool } from "../../connectionPool";

import { IUser } from "../../../types/user/user";

const mysql = require("mysql");
const jwt = require("jsonwebtoken");

const login = (request, response) => {
  try {
    const sql = "SELECT * FROM users WHERE login = ? AND password = ?";
    const query = mysql.format(sql, [request.body.params.login, request.body.params.password]);
    connectionPool.query(query, (error, data) => {
      if (error) {
        return response.status(200).json({
          success: false,
          message: "Ошибка авторизации",
          error: error,
        });
      } else {
        const auth = data as IUser[];
        if (auth.length === 0) {
          return response.status(200).json({
            success: false,
            message: "Неверный логин и/или пароль",
          });
        } else {
          const token = jwt.sign(
            {
              _id: auth[0].id,
            },
            "nadoholod_secret",
            {
              expiresIn: "30d",
            }
          );
          response.json({
            ...auth[0],
            token,
            success: true,
          });
        }
      }
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "Ошибка авторизации",
      error: error,
    });
  }
};

const authMe = (request, response) => {
  try {
    connectionPool.query('SELECT * FROM users WHERE id="' + request.id + '"', async (error, data) => {
      if (error) {
        return response.status(404).json({
          success: false,
          message: "Пользователь не найден",
          error: error,
        });
      } else {
        if ((data as IUser[]).length > 0) {
          return response.status(200).json({
            success: true,
            user: (data as IUser[])[0],
            date: new Date(),
          });
        } else {
          return response.status(200).json({
            success: false,
            message: "Пользователь не найден",
          });
        }
      }
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "Не удалось проверить пользователя",
      error: error,
    });
  }
};

export { login, authMe };
