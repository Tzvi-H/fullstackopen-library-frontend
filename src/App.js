import { useQuery, useApolloClient, useSubscription } from "@apollo/client";
import { useState } from "react";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";

import {
  ALL_AUTHORS,
  ALL_BOOKS,
  BOOK_ADDED,
  ALL_BOOKS_BY_GENRE,
} from "./queries";

const App = () => {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState("authors");
  const authorsResult = useQuery(ALL_AUTHORS);
  const booksResult = useQuery(ALL_BOOKS);

  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const newBook = subscriptionData.data.bookAdded;
      alert(`"${newBook.title}" was added`);

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(newBook),
        };
      });
      client.cache.updateQuery(
        { query: ALL_BOOKS_BY_GENRE, variables: { genre: "" } },
        ({ allBooks }) => {
          return {
            allBooks: allBooks.concat(newBook),
          };
        }
      );
    },
  });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("login");
  };

  if (authorsResult.loading || booksResult.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors
        show={page === "authors"}
        authors={authorsResult.data.allAuthors}
        loggedIn={!!token}
      />

      <Books show={page === "books"} books={booksResult.data.allBooks} />

      <NewBook show={page === "add"} showBooks={() => setPage("books")} />

      <LoginForm
        show={page === "login"}
        setToken={setToken}
        showAuthors={() => setPage("authors")}
      />

      {page === "recommend" && <Recommend books={booksResult.data.allBooks} />}
    </div>
  );
};

export default App;
