import "./components.css";
export default function Post({ caption, imageSrc }) {
  return (
    <div className="flex flex-col bg-white w-lg h-125 shadow-md rounded-xl p-2 gap-2">
      <div className="flex justify-center items-center w-full h-15 bg-gray-100 rounded-sm">
        <p>{caption}</p>
      </div>

      <div className="flex justify-center items-center bg-gray-50 w-full h-[91%] rounded-sm">
        {imageSrc ? <img className="h-full" src={imageSrc} /> : <></>}
      </div>
    </div>
  );
}
