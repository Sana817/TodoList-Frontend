import { State, hookstate, useHookstate } from "@hookstate/core";

const host = "http://localhost:8000";

interface InitialTaskValues {
  _id: string;
  task: string;
  editing: boolean;
}
interface InitialUserValues{
  userName:string;
  email:string;
  password:string;
}

const globalTodoList = hookstate<InitialTaskValues[]>([]); 
export const useTaskState = () => useHookstate(globalTodoList);
export const taskHandler = (state: State<InitialTaskValues[]>) => {
  return {
    async getTasks() {
      try {
        const headers = new Headers({
          "Content-Type": "application/json",
        });

        const token = localStorage.getItem("user-authentication");
        if (token) {
          headers.append("user-authentication", token);
        }

        const response = await fetch(host, {
          method: "GET",
          headers,
        });

        const jsonResponse = await response.json();
        if (jsonResponse) {
          globalTodoList.set(jsonResponse);
          return jsonResponse;
        }
      } catch (error) {
        console.error("error while fetching from getting all tasks ", error);
        throw error;
      }
    },

    async addTask(newTask:InitialTaskValues) {
      try {
        const headers = new Headers({
          "Content-Type": "application/json",
        });

        const token = localStorage.getItem("user-authentication");
        if (token) {
          headers.append("user-authentication", token);
        }

        const response = await fetch(host + "/addTask", {
          method: "POST",
          headers,
          body:JSON.stringify(newTask)
        });
        const jsonResponse = await response.json();

        return jsonResponse;
      } catch (error) {
        console.error("Error in adding new Task ", error);
        throw error;
      }
    },

    async removeTask(id:string) {
      try {
        const headers = new Headers({
          "Content-Type": "application/json",
        });

        const token = localStorage.getItem("user-authentication");
        if (token) {
          headers.append("user-authentication", token);
        }

        const response = await fetch(host + `/removeTask/${id}`, {
          method: "DELETE",
          headers,
        });
        
        const jsonResponse = await response.json();

        return jsonResponse;
      } catch (error) {
        console.error("Error in removing a Task ", error);
        throw error;
      }
    },

    async updateTask(newTask:InitialTaskValues) {
      try {
        const headers = new Headers({
          "Content-Type": "application/json",
        });

        const token = localStorage.getItem("user-authentication");
        if (token) {
          headers.append("user-authentication", token);
        }

        const response = await fetch(host + `/updateTask/${newTask._id}`, {
          method: "PUT",
          headers,
          body: JSON.stringify(newTask),
        });

        const jsonResponse = await response.json();

        return jsonResponse;
      } catch (error) {
        console.error("Error in updating a Task ", error);
        throw error;
      }
    },
    async login(user:InitialUserValues) {
      try {
        const headers = new Headers({
          "Content-Type": "application/json",
        });

        const token = localStorage.getItem("user-authentication");
        if (token) {
          headers.append("user-authentication", token);
        }

        const response = await fetch(host + "/login", {
          method: "POST",
          headers,
          body: JSON.stringify(user),
        });
       
        const jsonResponse = await response.json();

        return jsonResponse.token;
      } catch (error) {
        console.error("Error in login  ", error);
        throw error;
      }
    },
    async signup(user:InitialUserValues) {
      try {
        const headers = new Headers({
          "Content-Type": "application/json",
        });

        const token = localStorage.getItem("user-authentication");
        if (token) {
          headers.append("user-authentication", token);
        }

        const response = await fetch(host + "/signup", {
          method: "POST",
          headers,
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
