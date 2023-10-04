import { useNavigate } from "react-router-dom";

export const NotFoundTemplate = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <div className="absolute top-0 left-0 w-full h-full">
        <img
          className="w-full h-full object-cover object-center"
          src="/images/login_background.jpg"
        />
      </div>
      <div className="absolute z-10 flex flex-col items-center space-y-4">
        <h1 className="text-6xl font-bold text-[rgba(255,255,255,.75)]">404 Not Found</h1>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="mt-20 px-8 py-4 font-bold text-[rgba(255,255,255,.75)] bg-green-500 rounded hover:bg-green-700"
        >
          Back Home
        </button>
      </div>
    </div>
  );
};
