import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import InputErrorMessage from "../Components/ErrMessage";
import { API_BASE_URL } from "../BaseUrl";

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required(),
  age: Yup.number().required(),
  email: Yup.string().required(),
});

const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      email: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values) => {
      try {
        await axios
          .post(API_BASE_URL + "/create", values, {
            headers: { "Content-Type": "application/json" },
          })
          .then(() => {
            navigate("/home");
          })
          .catch((error) => {
            return error;
          });
      } catch (e) {
        return;
      }
    },
  });

  const handleChange = (e) => {
    formik.handleChange(e);
  };

  const { values, touched, errors, handleSubmit } = formik;
  return (
    <div>
      <form className='' onSubmit={handleSubmit}>
        <h1>User Form</h1>
        <label>Name</label>
        <input
          className='form-control'
          placeholder='Please enter your name'
          name='name'
          value={values.name}
          onChange={handleChange}
        />
        <InputErrorMessage error={touched.name && errors.name} />
        <label>Age</label>
        <input
          className='form-control'
          placeholder='Please enter your age'
          name='age'
          type='text'
          value={values.age}
          onChange={handleChange}
        />
        <InputErrorMessage error={touched.age && errors.age} />
        <label>Email</label>
        <input
          className='form-control'
          placeholder='Please enter your email'
          name='email'
          value={values.email}
          onChange={handleChange}
        />
        <InputErrorMessage error={touched.email && errors.email} />
        <div className='d-flex justify-content-between'>
          <button className='btn btn-primary' type='submit'>
            Submit
          </button>
          <Link to='/home' className='btn btn-success'>
            Go to home
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
