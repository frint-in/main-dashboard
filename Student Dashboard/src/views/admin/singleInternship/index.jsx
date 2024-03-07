import { useState } from "react";
import General from "./components/General";
import { Link } from "react-router-dom";

const SingleInternship = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
  };

  return (
    <div>
      <General />
      <div className="mt-4 flex justify-end">
        {!clicked ? (
          <Link
            // to="/admin/internships"
            onClick={handleClick}
            className="linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
          >
            Apply
          </Link>
        ) : (
          <Link
            // to="/admin/internships"
            className="linear rounded-[20px] bg-cyan-500 px-4 py-2 text-base font-medium text-black transition duration-200 hover:bg-cyan-400 active:bg-cyan-300 dark:bg-cyan-300 dark:hover:bg-cyan-200 dark:active:opacity-90"
          >
            Applied !!!
          </Link>
        )}
      </div>
    </div>
  );
};

export default SingleInternship;
