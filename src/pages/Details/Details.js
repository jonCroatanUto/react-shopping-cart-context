import React, { useContext, useState } from "react";
import { Formik } from "formik";
import { Redirect } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./details.scss";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ShoppingContext from "../../context";
import Checkout from "../../hoc/withCheckoutt";
import detailsSchema from "./details-schema";
// import loadLocalStorageItems from "../../utils/loadLocalStorageItems";

function Details() {
  const { cartItems, nextProgress, updateDetails, details } = useContext(
    ShoppingContext,
  );
  const [redirect, setRedirect] = useState(false);

  if (redirect) {
    return <Redirect to="/Checkout/step-2" />;
  }
  if (cartItems.length === 0) {
    alert("Chose at least one product");
    return <Redirect to="/" />;
  }

  return (
    <>
      <h1>Details</h1>
      <Formik
        initialValues={{
          userName: details === undefined ? "" : details.userName,
          userEmail: details === undefined ? "" : details.userEmail,
          userPhone: details === undefined ? "" : details.userPhone,
        }}
        initialErrors={{ defaultIsValid: "false" }}
        validationSchema={detailsSchema}
        onSubmit={(values) => {
          updateDetails(values);
          nextProgress();
          setRedirect(true);
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          setFieldValue,
          setFieldTouched,
          errors,
          values,
          touched,
          isValidating,
          isValid,
        }) => (
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              label="Write your name"
              id="userName"
              value={values.userName}
              handleChange={handleChange}
              handleBlur={handleBlur}
              placeholder="Write your name"
              hasErrorMessage={touched.userName}
              errorMessage={errors.userName}
            />
            <Input
              type="email"
              label="Write your email"
              id="userEmail"
              value={values.userEmail}
              handleChange={handleChange}
              handleBlur={handleBlur}
              placeholder="Write your email"
              hasErrorMessage={touched.userEmail}
              errorMessage={errors.userEmail}
            />
            <div className="form-group">
              <span>Write your phone number</span>
              <PhoneInput
                type="number"
                label="Write your phone number"
                id="userPhone"
                name="userPhone"
                value={values.userPhone}
                onChange={(phone) => {
                  setFieldValue("userPhone", phone, true);
                }}
                onBlur={() => {
                  setFieldTouched("userPhone", true);
                }}
                country="es"
                placeholder="Write your phone"
                inputProps={{
                  id: "userPhone",
                  name: "userPhone",
                  className: `form-control phone-input ${
                    touched.userPhone && errors.userPhone
                      ? "is-invalid phone-is-invalid"
                      : ""
                  } ${
                    touched.userPhone && !errors.userPhone
                      ? "phone-is-checked"
                      : ""
                  }`,
                }}
              />
              {touched.userPhone && errors.userPhone && (
                <p className="invalid-feedback invalid-feedback-phone">
                  {errors.userPhone}
                </p>
              )}
            </div>
            <div className="buttonsContainer">
              <Button submitButton disabled={isValidating || !isValid}>
                Next
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}

export default Checkout(Details);
