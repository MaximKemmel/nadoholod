import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios";

export const sendMail = createAsyncThunk(
  "api/sendMail",
  async ({ name, phone, description, message }: { name: string; phone: string; description: string; message: string }) => {
    return await axios
      .post("/api/send_mail", {
        params: {
          name: name,
          phone: phone,
          description: description,
          message: message,
        },
      })
      .then((response) => response.data);
  }
);
