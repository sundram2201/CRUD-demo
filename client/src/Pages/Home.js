import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../BaseUrl";
import { toast } from "react-hot-toast";

const Home = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();

  const getAllData = async () => {
    try {
      const res = await axios.get(API_BASE_URL + "/getdata", { "Content-Type": "application/json" });
      if (res.status === 200) {
        setData(res.data.data);
        toast.success(res?.data?.message, { id: "001" });
      }
    } catch (err) {
      console.log(err);
      toast.success(err?.response?.message, { id: "002" });
    }
  };

  const handleDel = async (id) => {
    try {
      const res = await axios.delete(`${API_BASE_URL}/deleteById?id=${id}`, id, {
        "Content-Type": "application/json",
      });

      if (res.status === 200) {
        getAllData();
        toast.success(res?.data?.message, { id: "003" });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDup = async (id) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/duplicateById?id=${id}`, id, {
        "Content-Type": "application/json",
      });

      if (res.status === 200) {
        getAllData();
        toast.success(res?.data?.message, { id: "004" });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div>
      <Link to='/' className='btn btn-primary'>
        Add user +
      </Link>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Age</th>
            <th scope='col'>Email</th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((el, i) => {
              return (
                <tr key={`list-${i}`}>
                  <th scope='row'>{el.name}</th>
                  <td>{el.age}</td>
                  <td>{el.email}</td>
                  <td>
                    <button
                      className='btn btn-outline-dark px-2 py-1 ms-2'
                      onClick={() => navigate("/edit-form", { state: { id: el._id } })}>
                      Edit
                    </button>
                    <button className='btn btn-outline-danger px-2 py-1 ms-2' onClick={() => handleDel(el._id)}>
                      Delete
                    </button>
                    <button className='btn btn-outline-success px-2 py-1 ms-2' onClick={() => handleDup(el._id)}>
                      Duplicate
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
