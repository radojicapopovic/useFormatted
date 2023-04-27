import { useCallback, useState } from "react";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  zip: number;
  birthdate: string;
  city: string;
  [key: string]: string | number;
};

export const useFormattedData = (data: User[]) => {
  const [formatted, setFormatted] = useState<User[]>(data);

  const sortBy = useCallback(
    (property: keyof User | ((a: User, b: User) => number)) => {
      let newFormatted = [...formatted];

      if (typeof property === "function") {
        newFormatted.sort(property);
      } else {
        newFormatted.sort((a, b) => (a[property] > b[property] ? 1 : -1));
      }

      setFormatted(newFormatted);
    },
    [formatted]
  );

  const filter = useCallback(
    (fn: (user: User) => boolean) => {
      const newFormatted = formatted.filter(fn);
      setFormatted(newFormatted);
    },
    [formatted]
  );

  const search = useCallback(
    (searchTerm: string) => {
      const newFormatted = data.filter((user) => {
        return Object.values(user).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      });

      setFormatted(newFormatted);
    },
    [data]
  );

  return { formatted, sortBy, filter, search };
};
