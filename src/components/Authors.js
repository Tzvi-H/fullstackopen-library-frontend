import { useState } from "react";
import { useMutation } from "@apollo/client";

import { EDIT_BORN } from "../queries";

const Authors = (props) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [changeBorn] = useMutation(EDIT_BORN);

  if (!props.show) {
    return null;
  }

  const submit = (event) => {
    event.preventDefault();

    changeBorn({ variables: { name, setBornTo: Number(born) } });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {props.authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option disabled value="">
              --Please choose an author--
            </option>
            {props.authors.map((author) => (
              <option key={author.id}>{author.name}</option>
            ))}
          </select>
        </div>
        <div>
          born{" "}
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
