import { Link } from "react-router-dom";
import notFound from "../assets/404_illustration.svg";

const NotFound = () => {
  return (
    <div>
      <img src={notFound} alt="" className="h-[650px] w-full" />
      <div className="font-display text-3xl font-bold text-center">
        404 Not found
      </div>
      <div className="text-xl font-bold text-center">
        Take me{" "}
        <Link to="/" className="text-primary underline">
          home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
