import React, { useEffect } from "react";
import users from "./users.json";
import { useFormattedData } from "./hooks/useFormattedData";
import "./App.css";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  zip: number;
  birthdate: string;
  city: string;
};

const App: React.FC = () => {
  const { formatted, sortBy, filter, search } = useFormattedData(users);

  useEffect(() => {
    search("anderson");
    filter(({ zip }) => zip > 486);
    sortBy("firstName");
  }, [search, filter, sortBy]);

  return (
    <div className="container">
      <h1 className="title">User List</h1>
      {formatted.map(({ id, firstName, lastName, birthdate }: User) => (
        <div className="user" key={id}>
          <h2>
            {firstName} {lastName}
          </h2>
          <p>{birthdate}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
