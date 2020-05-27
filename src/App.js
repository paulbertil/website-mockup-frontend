import React from 'react';

import Layout from './components/Layout';




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
        hej
      </Layout>

    </div >
  );
}

export default App;
