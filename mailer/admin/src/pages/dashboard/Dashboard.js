import React from "react";
import { useEffect } from "react";
import "../dashboard/Dashboard.scss";
import axios from "axios";
import { AiFillDelete, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";

const Dashboard = () => {
  const [users, setUsers] = React.useState([]);
  const nameRef = React.createRef();
  const surnameRef = React.createRef();
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const [passwordShown, setPasswordShown] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const _isIncorrectEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
      return false;

    return true;
  };

  const addEmailHandler = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value,
      surname = surnameRef.current.value,
      email = emailRef.current.value,
      password = passwordRef.current.value;

    if (
      name.length < 3 ||
      surname.length < 3 ||
      password.length < 5 ||
      _isIncorrectEmail(email)
    ) {
      return;
    }

    const data = { name, surname, email, password };

    console.log(data);

    try {
      const response = await axios.post("/api/add/user?token=", data);

      if (response.data.success) {
        getUsers();
        document.getElementById("form").reset();
      }
    } catch (error) {
      alert("Error");
    }
  };

  const getUsers = async () => {
    const response = await axios.get(
      "/api/get/users?token=" + sessionStorage.getItem("token")
    );

    if (response.data.success) {
      setUsers(response.data.users);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (id) => {
    const response = await axios.delete(
      "/api/delete/user/" + id + "?token=" + sessionStorage.getItem("token")
    );

    if (response.data.success) {
      getUsers();
    }
  };

  const togglePassword = (e) => {
    e.preventDefault();

    setPasswordShown(!passwordShown);
  };

  const togglePasswordIconEyeAdd = () => {
    if (passwordShown) {
      return <AiFillEye />;
    } else {
      return <AiFillEyeInvisible />;
    }
  };

  const togglePasswordIconEyeShow = () => {
    if (showPassword) {
      return <AiFillEye />;
    } else {
      return <AiFillEyeInvisible />;
    }
  };

  return (
    <div className="Dashboard-container">
      <h1>Welcome in mailer Dashboard</h1>

      <form id="form">
        <input ref={nameRef} type="text" placeholder="Name" />
        <input ref={surnameRef} type="text" placeholder="Surname" />
        <input ref={emailRef} type="text" placeholder="Email" />
        <input
          type={passwordShown ? "text" : "password"}
          ref={passwordRef}
          placeholder="Password"
        />
        <div className="buttons">
          <button className="button" onClick={togglePassword}>
            {togglePasswordIconEyeAdd()}
          </button>
          <button className="button" onClick={addEmailHandler}>
            Dodaj
          </button>
        </div>
      </form>
      <button className="button" onClick={() => setShowPassword(!showPassword)}>
        {togglePasswordIconEyeShow()}
      </button>
      <div className="users-list">
        {users.map((user, index) => {
          return (
            <div className="user" key={user._id}>
              <p>{index}</p>
              <p>{user.name}</p>
              <p>{user.surname}</p>
              <p>{user.email}</p>
              {showPassword ? <p>{user.password}</p> : null}
              <div>
                <button className="button" onClick={() => deleteUser(user._id)}>
                  <AiFillDelete />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
