import "./App.css";
import Movies from "./components/movies";

function App() {
  return (
    <main className="container">
      <h1 className="text-secondary mb-4 font-weight-bold">
        VIDLY Movies Rental Service
      </h1>
      <Movies />
    </main>
  );
}

export default App;
