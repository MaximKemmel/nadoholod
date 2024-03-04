import * as nodemailer from "nodemailer";

const sendMail = async (request, response) => {
  try {
    const mailOptions = {
      from: "sexavenuex@gmail.com",
      to: "sexavenuex@gmail.com",
      subject: request.body.params.emailSubject,
      html: request.body.params.html,
    };
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.ru",
      port: 587,
      secure: false,
      service: "gmail",
      auth: {
        user: "sexavenuex@gmail.com",
        pass: "hfqarnmrocxwvxpp",
      },
    });
    transporter.sendMail(mailOptions, (error, _info) => {
      if (error) {
        response.status(500).json({
          success: false,
          message: "Ошибка при отправке письма",
          error: error,
        });
      } else {
        return response.status(200).json({
          success: true,
        });
      }
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "Ошибка при отправке письма",
      error: error,
    });
  }
};

export { sendMail };
