const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      favorites: [],
      items: [],
      message: null,
      token: sessionStorage.getItem("token"),
      user: null,
    },
    actions: {
      addFavorites: (fav) => {
        setStore({ favorites: [...getStore().favorites, fav] });
      },
      removeFavorites: (fav) => {
        setStore({
          favorites: [...getStore().favorites.filter((item) => item !== fav)],
        });
      },
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      loadSomeData: () => {
        /**
               fetch().then().then(data => setStore({ "foo": data.bar }))
           */
      },
      getMessage: async () => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      signUp: async (form) => {
        const url = process.env.BACKEND_URL + "/api/signup";
        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "*",
            },
            body: JSON.stringify({
              email: form.email,
              password: form.password,
              is_active: true,
            }),
          });
          const data = await response.json();
          if (!response.ok) {
            alert("User already exists or other error.");
            return false;
          }
          return true;
        } catch (error) {
          console.error("Sign up error:", error);
          alert("An error occurred during sign up.");
          return false;
        }
      },
      login: async (form) => {
        const url = `${process.env.BACKEND_URL}/api/login`;
        try {
          const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          });
          if (!response.ok) {
            throw new Error("Incorrect username or password");
          }
          const data = await response.json();
          sessionStorage.setItem("token", data.token);
          setStore({ user: data.user, token: data.token });
        } catch (error) {
          console.error("Login error:", error);
          alert(error.message);
        }
      },
      authenticateUser: () => {
        const store = getStore();
        const url = process.env.BACKEND_URL + "/api/private";

        fetch(url, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + store.token,
            "Access-Control-Allow-Origin": "*",
          },
        })
          .then((resp) => {
            if (!resp.ok) {
              alert("Please login to continue");
            }
            return resp.json();
          })
          .then((data) => {
            setStore({ user: data });
          })
          .catch((error) => {
            console.log(error);
          });
      },
      tokenFromStore: () => {
        let store = getStore();
        const token = sessionStorage.getItem("token");
        if (token && token != null && token != undefined)
          setStore({ token: token });
      },
      logout: () => {
        sessionStorage.removeItem("token");
        setStore({ user: null, token: null });
      },
      changeColor: (index, color) => {
        const store = getStore();
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });
        setStore({ demo: demo });
      },
      getUser: async () => {
        const store = getStore();
        if (store.user || !store.token) {
          // alert("Authentication token not found. Please log in.");
          return;
        }
        const url = `${process.env.BACKEND_URL}/api/user`;
        try {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${store.token}`,
            },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          const data = await response.json();
          setStore({ user: data });
        } catch (error) {
          console.error("Get User error:", error);
          alert(error.message);
        }
      },
      updateUser: async (email, weight, activity_level, password) => {
        const token = sessionStorage.getItem("token");
        const url = process.env.BACKEND_URL + "/api/user";
        fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            email: email,
            weight: weight,
            activity_level: activity_level,
            password: password,
          }),
        })
          .then(async (resp) => {
            console.log(resp.json());
          })
          .catch((error) => {
            console.log(error);
          });
      },

      changePassword: async (token, password) => {
        console.log(token, password);
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            password: password,
          }),
        };
        const res = await fetch(
          process.env.BACKEND_URL + "/api/recoverPassword",
          opts
        );
        if (res.status < 200 || res.status >= 300) {
          throw new Error("There was an error changing password");
        }
        const data = await res.json();

        console.log("USER INFO HERE", data);
        return true;
      },
    },
  };
};

export default getState;
