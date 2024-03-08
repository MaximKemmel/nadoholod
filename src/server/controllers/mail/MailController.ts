import * as nodemailer from "nodemailer";

const sendMail = async (request, response) => {
  try {
    const mailOptions = {
      from: "kemmel7007@mail.ru",
      to: "maximkemmel@yandex.ru",
      subject: request.body.params.description,
      html: `<b>${request.body.params.description}</b><br/><br/><b>Имя</b>: ${request.body.params.name}<br/><b>Номер телефона</b>: ${request.body.params.phone}<br/><b>Сообщение</b>: ${request.body.params.message}`,
    };
    const transporter = nodemailer.createTransport({
      host: "smtp.mail.ru",
      port: 465,
      secure: true,
      service: "Mail",
      auth: {
        user: "kemmel7007@mail.ru",
        pass: "vpHufVRShcJP0gbiW27C",
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
