import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import InputErrorMessage from "../Components/ErrMessage";
import { API_BASE_URL } from "../BaseUrl";

const EditForm = () => {
  const [state, setState] = useState("");
  const location = useLocation();
  const dataId = location.state.id;

  const getDataById = async (id) => {
    const res = await axios.get(`${API_BASE_URL}/getDataById?id=${id}`, {
      "Content-Type": "application/json",
    });

    if (res.status === 200) {
      setState(res.data.data);
    }
  };

  const FormEdit = useFormik({
    initialValues: {
      name: "",
      age: "",
      email: "",
    },
    validationSchema: "",
    onSubmit: async (values) => {
      try {
        await axios.put(`${API_BASE_URL}/updateById?id=${dataId}`, values, {
          "Content-Type": "application/json",
        });
        window.history.back();
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleChange = (e) => {
    FormEdit.handleChange(e);
  };

  useEffect(() => {
    getDataById(dataId);
  }, []);

  useEffect(() => {
    if (state !== "") {
      FormEdit.setValues(() => ({
        name: state.name,
        age: state.age,
        email: state.email,
      }));
    }
  }, [state]);

  const { values, touched, errors, handleSubmit } = FormEdit;

  return (
    <div>
      <form className='' onSubmit={handleSubmit}>
        <h1>Edit Form</h1>
        <h5> Id : {dataId} </h5>
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
          type='number'
          value={values.age}
          onChange={handleChange}
        />{" "}
        <InputErrorMessage error={touched.age && errors.age} />
        <label>Email</label>
        <input
          className='form-control'
          placeholder='Please enter your email'
          name='email'
          value={values.email}
          onChange={handleChange}
        />{" "}
        <InputErrorMessage error={touched.email && errors.email} />
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditForm;
