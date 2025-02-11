import React, { useContext, useState } from "react";
import { Redirect, NavLink } from "react-router-dom";

import { Formik } from "formik";
import Checkout from "../../hoc/withCheckoutt";
import adressSchema from "./adress-schema";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ShoppingContext from "../../context";
import "./adressStyles.scss";

function Adress() {
  const { updateAdress, nextProgress, adressData } = useContext(
    ShoppingContext,
  );
  const [redirect, setRedirect] = useState(false);
  if (redirect) {
    return <Redirect to="/Checkout/step-3" />;
  }

  return (
    <>
      <h1>Adress</h1>
      <Formik
        initialValues={{
          streetName: adressData === undefined ? "" : adressData.streetName,
          cityName: adressData === undefined ? "" : adressData.cityName,
          postCode: adressData === undefined ? 0 : adressData.postCode,
          country: adressData === undefined ? "" : adressData.country,
        }}
        initialErrors={{ defaultIsValid: "false" }}
        validationSchema={adressSchema}
        onSubmit={(values) => {
          updateAdress(values);
          setRedirect(true);
          nextProgress();
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          errors,
          values,
          touched,
          isValidating,
          isValid,
        }) => (
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              label="Write your street adress"
              id="streetName"
              value={values.streetName}
              handleChange={handleChange}
              handleBlur={handleBlur}
              placeholder="Write your street adress"
              hasErrorMessage={touched.streetName}
              errorMessage={errors.streetName}
            />
            <Input
              type="text"
              label="Write your city name"
              id="cityName"
              value={values.cityName}
              handleChange={handleChange}
              handleBlur={handleBlur}
              placeholder="Write your city name"
              hasErrorMessage={touched.cityName}
              errorMessage={errors.cityName}
            />
            <Input
              type="number"
              label="Write your post code"
              id="postCode"
              value={values.postCode}
              handleChange={handleChange}
              handleBlur={handleBlur}
              placeholder="Write your post code "
              hasErrorMessage={touched.postCode}
              errorMessage={errors.postCode}
            />
            <Input
              type="text"
              label="Write your country"
              id="country"
              value={values.country}
              handleChange={handleChange}
              handleBlur={handleBlur}
              placeholder="Write your country "
              hasErrorMessage={touched.country}
              errorMessage={errors.country}
            />
            <div className="buttonsContainer">
              <NavLink to="/Checkout/step-1">
                <Button>Previous</Button>
              </NavLink>

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

export default Checkout(Adress);
