import { useState, useEffect } from "react";
import { ALL_BOOKS_BY_GENRE } from "../queries";
import { useQuery } from "@apollo/client";

const Books = (props) => {
  const [genre, setGenre] = useState("");
  const [booksToShow, setBooksToShow] = useState([]);

  const booksResult = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genre },
  });

  useEffect(() => {
    if (booksResult.data) {
      setBooksToShow(booksResult.data.allBooks);
    }
  }, [booksResult.data]); // eslint-disable-line

  if (!props.show) {
    return null;
  }

  const genres = props.books.reduce((allGenres, { genres: currentGenres }) => {
    currentGenres.forEach((g) =>
      allGenres.includes(g) ? null : allGenres.push(g)
    );
    return allGenres;
  }, []);

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {genres.map((g, i) => (
          <button key={g} onClick={() => setGenre(g)}>
            {g}
          </button>
        ))}
        <button onClick={() => setGenre("")}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
