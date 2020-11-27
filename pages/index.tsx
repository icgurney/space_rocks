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
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Enter a date: </label>
        <input
          type="date"
          name="date"
          id="date"
          min="1995-06-20"
          max={today}
          onChange={handleChange}
          // onBlur={handleBlur}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default HomePage;
