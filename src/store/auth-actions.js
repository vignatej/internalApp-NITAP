import { authActions } from "./auth-slice";

import { getInitialMsg } from "./chat-actions";
export const userSignUp = (details, username, password) => {
  return async (dispatch) => {
    console.log(username, password);
    const response = await fetch("http://127.0.0.1:8000/users/create-user/", {
      method: "POST",
      body: details,
    });
    if (!response.ok) {
      return new Error("Yep, please enter all details and correct details");
    }

    const responseN = await fetch("http://127.0.0.1:8000/users/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
    if (!responseN.ok) {
      throw new Error("err at response at responseN at userSignup");
    }
    const responseA = await responseN.json();
    localStorage.setItem("refresh", responseA.refresh);
    localStorage.setItem("access", responseA.access);

    const userDetails = await fetch("http://127.0.0.1:8000/users/getDetails/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });

    const det = await userDetails.json();
    console.log(det);
    dispatch(authActions.addAuth(det));
    localStorage.setItem("profileId",det['id']);
    
    dispatch(getInitialMsg());
  };
};

export const userLogin = (username, password) => {
  return async (dispatch) => {
    const res = await fetch("http://127.0.0.1:8000/users/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    if (!res.ok) {
      throw new Error("wrong username or password");
    }
    const response = await res.json();
    console.log(response);
    localStorage.setItem("refresh", response.refresh);
    localStorage.setItem("access", response.access);
    console.log("item is " + localStorage.getItem("access"));
    const userDetails = await fetch("http://127.0.0.1:8000/users/getDetails/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    if (!userDetails.ok) {
      throw new Error("error at userDetails ln 50");
    }
    const det = await userDetails.json();
    console.log(det);
    dispatch(authActions.addAuth(det));
    localStorage.setItem("profileId",det['id']);
    
    dispatch(getInitialMsg());
  };
};

export const startAppLogin = () => {
  return async (dispatch) => {
    console.log("dfd");
    if (localStorage.getItem("refresh") === null) {
      return;
    }
    console.log("123");
    const res = await fetch("http://127.0.0.1:8000/users/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: localStorage.getItem("refresh"),
      }),
    });
    if (!res.ok) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      throw new Error("cant get a new token");
    }
    const response = await res.json();
    localStorage.setItem("access", response["access"]);

    const userDetails = await fetch("http://127.0.0.1:8000/users/getDetails/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    if (!userDetails.ok) {
      throw new Error("error at userDetails ln startapplogin ln 92");
    }
    const det = await userDetails.json();
    console.log(det);
    dispatch(authActions.addAuth(det));
    dispatch(getInitialMsg());
    localStorage.setItem("profileId",det['id']);
  };
};
