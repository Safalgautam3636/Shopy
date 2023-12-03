"use client";
function Search() {
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: filter itemgrid
    console.log("Search submitted");
  };
  return (
    <form className="mx-4 flex flex-1" onSubmit={handleSearchSubmit}>
      <input
        type="search"
        placeholder="Search..."
        className="w-full rounded-md px-4 py-2 text-black focus:outline-none focus:ring focus:ring-opacity-50"
      />
    </form>
  );
}

export default Search;
