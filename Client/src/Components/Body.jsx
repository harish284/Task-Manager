import React, { useState, useEffect } from "react";
import MaterialIcon from "material-icons-react";
import axios from "axios";
import Navbody from "../Components/Navbody";

const Card = (props) => {
  const { id, setupdate, title, description, duedate, category } = props;

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/taskmanagerdelete/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setupdate((prev) => !prev);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full flex-wrap gap-4 my-4 transition-transform transform hover:scale-105 duration-300 ease-in-out">
      <div
        className={`flex itemx-center md:flex-row gap-10 justify-between p-6 font-title rounded-lg shadow-lg w-full md:w-1/2 ${
          category === "High"
            ? "bg-gradient-to-r from-red-600 to-red-400 text-white"
            : "bg-gradient-to-r from-green-600 to-green-400 text-white"
        }`}
      >
        <div>
          <h1 className="font-semibold text-lg mb-2">{title}</h1>
          <p className="font-light text-sm mb-2">{description}</p>
          <p className="font-medium text-sm">
            {new Date(duedate).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center">
          <button
            onClick={handleDelete}
            className="bg-white bg-opacity-20 hover:bg-opacity-40 transition-colors duration-200 ease-in-out p-2 rounded-full"
          >
            <MaterialIcon icon="done" color="white" size={36} />
          </button>
        </div>
      </div>
    </div>
  );
};

const Body = () => {
  const [taskList, setTaskList] = useState([]);
  const [update, setupdate] = useState(false);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [duedate, setduedate] = useState("");
  const [category, setcategory] = useState("");

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    fetch(`${import.meta.env.VITE_SERVER_URL}/taskmanagerget/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        const sortedTasks = data.sort(
          (a, b) => new Date(a.duedate) - new Date(b.duedate)
        );
        setTaskList(sortedTasks);
      });
  }, [update]);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const currentDate = new Date();

    if (selectedDate < currentDate.toISOString().split("T")[0]) {
      alert("Please select a valid date");
      setduedate("");
    } else {
      setduedate(selectedDate);
    }
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!title || !duedate || !category) {
      window.alert("Please fill all the fields.");
      return;
    }

    const userId = sessionStorage.getItem("userId");
    const taskData = {
      title,
      description,
      duedate,
      category,
      userId,
    };

    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/taskmanagercreate`, taskData)
      .then(() => {
        settitle("");
        setdescription("");
        setduedate("");
        setcategory("");
        setupdate((prev) => !prev);
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  };

  return (
    <div>
      <Navbody />
      <div className="flex">
        <div className="w-[800px] h-screen bg-slate-200 rounded-r-lg flex flex-col items-center font-title">
          <div className="text-xl gap-2 flex font-semibold">
            <h1 className="text-violet-900">Add</h1>
            <span>
              <h1 className="text-yellow-500"> Task</h1>
            </span>
          </div>
          <div className="flex flex-col gap-4 text-xl">
            <div>
              <h1>Title</h1>
              <input
                type="text"
                placeholder="Enter your Task"
                className="p-1 text-xl rounded-lg"
                onChange={(e) => settitle(e.target.value)}
                value={title}
              />
            </div>
            <div>
              <h1>Description</h1>
              <textarea
                name="Description"
                placeholder="Enter your description"
                cols="23"
                rows="3"
                className="text-xl rounded-lg w-full"
                onChange={(d) => setdescription(d.target.value)}
                value={description}
              ></textarea>
            </div>
            <div>
              <h1>Date</h1>
              <input
                type="date"
                className="text-xl p-1 rounded-lg"
                onChange={handleDateChange}
                value={duedate}
              />
            </div>
            <div>
              <h1>Category</h1>
              <select
                name="Category"
                className="text-xl p-1 rounded-lg"
                onChange={(e) => setcategory(e.target.value)}
                value={category}
              >
                <option value="">All</option>
                <option value="High">High</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="flex items-center">
              <div className="flex justify-center items-center">
                <button
                  className="bg-yellow-500 p-1 rounded-3xl"
                  onClick={addTask}
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center">
          {taskList.map((task) => (
            <Card
              key={task._id}
              id={task._id}
              title={task.title}
              description={task.description}
              duedate={task.duedate}
              category={task.category}
              setupdate={setupdate}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Body;
