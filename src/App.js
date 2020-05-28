import React from 'react';


//components
import Layout from './components/Layout';
import Form from './components/Form';

import './styles/tailwind.generated.css';

// filesystem
import heroImg from './images/followcoronaapp.svg';




function App() {
  const [data, setData] = React.useState(null);
  const [url, setUrl] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);



  React.useEffect(() => {
    const fetchDataFromAPI = async () => {
      const response = await fetch('http://localhost:9000/mockup/');
      const body = await response.json();

      console.log(body)
      setData(body);
      setIsLoading(false)
    }

    fetchDataFromAPI()
  }, []);



  const handleInputChange = (val) => {
    console.log(val)
    setUrl(val)
  }


  const onFormSubmit = () => {

    console.log('form submitted');
  }





  return (
    <div className="App">

      <Layout>


        <section className="text-gray-700 body-font  flex justify-center items-center">
          <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
            <img className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src={heroImg} />
            <div className="text-center lg:w-2/3 w-full">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold text-gray-900">Fast high quality mockup design</h1>
              <p className="mb-8 leading-relaxed">Create a high quaility mockup image to showcase any website</p>

              {isLoading && (<div>Loading</div>)}
              {!isLoading && (
                <Form handleFromSubmit={onFormSubmit} url={url} handleInputChange={handleInputChange} />
              )}

            </div>
          </div>
        </section>
      </Layout>

    </div >
  );
}

export default App;
