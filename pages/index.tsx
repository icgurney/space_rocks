import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { format } from "date-fns";

const HomePage = () => {
  const router = useRouter();
  const today = format(new Date(), "yyyy-MM-dd");
  const [inputField, setInputField] = useState({
    date: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setInputField({ date: target.value });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/apod/${inputField.date}`);
  };
  return (
    <nav className="">
      <p className="mx-auto">Space Rocks</p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <label htmlFor="date" className="text-lg text-center py-1 px-2 mx-auto">
          Enter a date:{" "}
        </label>
        <input
          type="date"
          name="date"
          id="date"
          min="1995-06-20"
          max={today}
          onChange={handleChange}
          className="text-lg text-center py-1 px-2 rounded shadow-lg mb-2 mx-auto focus:outline-none focus:ring focus:ring-indigo-700 border-gray-300 border"
          // onBlur={handleBlur}
        />
        <input
          type="submit"
          value="Submit"
          className="text-lg text-center text-white py-1 px-4 rounded shadow-lg mx-auto focus:outline-none focus:ring focus:ring-indigo-700 bg-indigo-500 hover:bg-indigo-600 "
        />
      </form>
    </nav>
  );
};

export default HomePage;
