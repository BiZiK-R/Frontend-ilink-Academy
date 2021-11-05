import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../../../validations/authorization";
import { InputForm } from "../../molecules/inputForm";
import { Button } from "../../atoms/Button";
import { SecurityCode } from "../../molecules/securityCode";
import captchaSrc from "../../../assets/captcha.png";
import { SCREENS } from "../../../routes/endpoints";

import "./formLogin.scss";

export const FormLogin: FC = () => {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
      captcha: "",
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values));
    },
    validationSchema: loginSchema,
  });

  return (
    <div className="form-login">
      <form className="form-login__form" onSubmit={formik.handleSubmit}>
        <div className="form-login__inputs">
          <InputForm
            onChange={formik.handleChange}
            inValidInput={formik.touched.login && Boolean(formik.errors.login)}
            value={formik.values.login}
            name="login"
            description="User name"
            placeholder="Input user name"
            type="text"
            errorText={formik.errors.login}
          />
          <InputForm
            onChange={formik.handleChange}
            inValidInput={
              formik.touched.password && Boolean(formik.errors.password)
            }
            value={formik.values.password}
            name="password"
            description="Password"
            placeholder="Input password"
            type="password"
            errorText={formik.errors.password}
          />
          <div className="form-login__security-code">
            <SecurityCode
              onChange={formik.handleChange}
              inValidInput={
                formik.touched.captcha && Boolean(formik.errors.captcha)
              }
              value={formik.values.captcha}
              name="captcha"
              theme="last-input"
              description="Security code"
              placeholder="Security code"
              type="text"
              errorText={formik.errors.captcha}
              src={captchaSrc}
            />
          </div>
        </div>
        <div className="form-login__buttons">
          <Button theme="submit-auth" type="submit">
            Log in
          </Button>
          <Button
            onClick={() => {
              history.push(SCREENS.SCREEN_SIGNUP);
            }}
            theme="nav-auth"
            type="button"
          >
            Registration
          </Button>
        </div>
      </form>
    </div>
  );
};
