import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppContext from "./context";
import AppStore from "./stores/app";
import AppApi from "./api/app";
import HomePage from "./pages/home";
import PostPage from "./pages/post";
import UserPage from "./pages/user";

const store = new AppStore();
const api = new AppApi(store);

function App() {
  return (
    <AppContext.Provider value={{ store, api }}>
      <BrowserRouter>
        <Routes>
          <Route path="/user/:userId" element={<UserPage />} />
          <Route path="/post/:postId" element={<PostPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
