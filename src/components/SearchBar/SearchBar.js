import { useState } from "react";
import { toast } from "react-toastify";
import s from "./SearchBar.module.css";

export default function SearchBar({ onSubmit }) {
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (name.trim() === "") {
      toast.error("Please enter something!");
      return;
    }

    onSubmit(name);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <input
        type="text"
        value={name}
        onChange={handleChange}
        className={s.input}
      />
      <button type="submit" className={s.button}>
        Search
      </button>
    </form>
  );
}