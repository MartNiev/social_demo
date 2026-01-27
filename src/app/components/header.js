import "./components.css";
export default function Header() {
  return (
    <div className="flex items-center justify-center w-full bg-white h-12.5 shadow-sm">
      <p className="w-45 flex-1 pl-5">The Social</p>
      <nav className="flex justify-center gap-5 w-50 h-full">
        <button className="bt">Home</button>
        <button className="bt">Create</button>
        <button className="bt">Follow</button>
      </nav>
      <div className="w-45 text-right flex-1 pr-5">
        <input
          className="w-37.5 text-center hover:bg-gray-100 active:bg-gray-200 rounded-sm "
          type="text"
          id="search"
          name="search"
          placeholder="Search"
        />
      </div>
    </div>
  );
}
