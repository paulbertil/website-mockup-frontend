import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    const fetchDataFromAPI = async () => {
      const response = await fetch('http://localhost:9000/testAPI/');
      const body = await response.json();

      console.log(body)
      setData(body);
    }

    fetchDataFromAPI()
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

      </header>
    </div >
  );
}

export default App;
