import React from "react";

function SearchField() {
  const [search, setSearch] = React.useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <div>
      <div className="form-control ">
        <input
          type="text"
          placeholder="Search"
          className="input-bordered input"
          value={search}
          onChange={handleSearch}
        />
      </div>
    </div>
  );
}

export default SearchField;
