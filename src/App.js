import { useQuery, useApolloClient } from "@apollo/client";
import { useState } from "react";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";

import { ALL_AUTHORS } from "./queries";
import { ALL_BOOKS } from "./queries";

const App = () => {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState("authors");
  const authorsResult = useQuery(ALL_AUTHORS);
  const booksResult = useQuery(ALL_BOOKS);

  const client = useApolloClient();

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
