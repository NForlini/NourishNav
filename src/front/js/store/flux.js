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
        await fetch(url, {
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
        })
          .then(async (resp) => {
            if (!resp.ok) {
              alert("user already exists");
              return false;
            }
            await resp.json();
          })
          .catch((error) => {
            console.log(error);
          });
      },
      login: (form) => {
        const store = getStore();
        const url = process.env.BACKEND_URL + "/api/login";
        fetch(url, {
          method: "Post",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        })
          .then(async (resp) => {
            if (!resp.ok) {
              alert("wrong username or password");
              return false;
            }
            const data = await resp.json();
            sessionStorage.setItem("token", data.token);
            setStore({ user: data.user });
          })
          .catch((error) => {
            console.log(error);
          });
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
        setStore({ user: null });
        sessionStorage.removeItem("token");
        setStore({ token: null });
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
        const token = sessionStorage.getItem("token");
        const opts = {
          method: "GET",
          headers: {
            // "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        const res = await fetch(process.env.BACKEND_URL + "/api/user", opts);
        const data = await res.json();
        setStore({ user: data });
        return true;
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
    },
  };
};

export default getState;
