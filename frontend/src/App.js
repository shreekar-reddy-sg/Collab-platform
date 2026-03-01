import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("http://localhost:5000/")
      .then(res => res.text())
      .then(data => console.log(data));
  }, []);

  return <h1>Frontend Connected</h1>;
}

export default App;
