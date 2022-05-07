import { useQuery } from "@apollo/client";
import { ME } from "../queries";

const Recommend = (props) => {
  const meResult = useQuery(ME);

  const recommendations = () => {
    if (!meResult.data.me) return null;

    const genreToShow = meResult.data.me.favoriteGenre;
    const booksToShow = props.books.filter((b) =>
      b.genres.includes(genreToShow)
    );

    return (
      <>
        <p>
          books in your favorite genre <b>{genreToShow}</b>
        </p>

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
      </>
    );
  };

  return (
    <div>
      <h2>recommendations</h2>
      {meResult.data && recommendations()}
    </div>
  );
};

export default Recommend;
