import React, { useState } from "react";

const Search = (props) => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    props.handleSubmit(search);
    e.target.reset();
    setSearch("");
  };

  return (
    <form  onSubmit={onSubmit}>
      <div>
        <input
          type="text"
          value={search}
          onChange={handleChange}
        />
        <button
          class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded "
          type="submit"
        >
          add
        </button>
      </div>
    </form>
  );
};

export default Search;
