import { hookstate, useHookstate } from "@hookstate/core";

const host = "http://localhost:8000";
const globalTodoList = hookstate([]);

export const useTaskState = () => useHookstate(globalTodoList);
export const taskHandler = (state) => {
  return {
    async getTasks() {
      try {
        const response = await fetch(host, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "user-authentication": localStorage.getItem("user-authentication"),
          },
        });
        const jsonResponse = await response.json();
        if (jsonResponse) {
          globalTodoList.set(jsonResponse);
          return state.get({ noproxy: true });
        }
      } catch (error) {
        console.error("error while fetching from getting all tasks ", error);
        throw error;
      }
    },

    async addTask(newTask) {
      try {
        const response = await fetch(host + "/addTask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "user-authentication": localStorage.getItem("user-authentication"),
          },
          body: JSON.stringify(newTask),
        });
        const jsonResponse = await response.json();

        return jsonResponse;
      } catch (error) {
        console.error("Error in adding new Task ", error);
        throw error;
      }
    },

    async removeTask(id) {
      try {
        const response = await fetch(host + `/removeTask/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "user-authentication": localStorage.getItem("user-authentication"),
          },
        });
        const jsonResponse = await response.json();

        return jsonResponse;
      } catch (error) {
        console.error("Error in removing a Task ", error);
        throw error;
      }
    },

    async updateTask(newTask) {
      try {
        const response = await fetch(host + `/updateTask/${newTask._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "user-authentication": localStorage.getItem("user-authentication"),
          },
          body: JSON.stringify(newTask),
        });
        const jsonResponse = await response.json();

        return jsonResponse;
      } catch (error) {
        console.error("Error in updating a Task ", error);
        throw error;
      }
    },
    async login(user) {
      try {
        const response = await fetch(host + "/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });
        const jsonResponse = await response.json();

        return jsonResponse.token;
      } catch (error) {
        console.error("Error in login  ", error);
        throw error;
      }
    },
    async signup(user) {
      try {
        const response = await fetch(host + "/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });
        const jsonResponse = await response.json();

        return jsonResponse;
      } catch (error) {
        console.error("Error in signup  ", error);
        throw error;
      }
    },
  };
};
export const taskController = taskHandler(globalTodoList);
