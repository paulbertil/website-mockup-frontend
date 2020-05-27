import React from 'react';


//components
import Layout from './components/Layout';

import './styles/tailwind.generated.css';




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

      <Layout>
        <p className="">Hej</p>
      </Layout>

    </div >
  );
}

export default App;
