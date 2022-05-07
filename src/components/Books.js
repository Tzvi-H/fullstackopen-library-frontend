import { useState } from "react";

const Books = (props) => {
  const [genre, setGenre] = useState("all genres");

  if (!props.show) {
    return null;
  }

  const booksToShow =
    genre === "all genres"
      ? props.books
      : props.books.filter((b) => b.genres.includes(genre));

  const genres = props.books
    .reduce((allGenres, { genres: currentGenres }) => {
      currentGenres.forEach((g) =>
        allGenres.includes(g) ? null : allGenres.push(g)
      );
      return allGenres;
    }, [])
    .concat("all genres");

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
      </div>
    </div>
  );
};

export default Books;
