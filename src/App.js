import React, { useState, useEffect } from 'react';
import StripeCheckout from 'react-stripe-checkout';

//components
import Layout from './components/Layout';
import Form from './components/Form';

import './styles/tailwind.generated.css';

// filesystem
import heroImg from './images/followcoronaapp.svg';




const App = () => {
  const [data, setData] = useState(null);
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [mockupImage, setMockupImage] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [mockupType, setMockupType] = useState('phone')




  useEffect(() => {
    const fetchDataFromAPI = async () => {
      const response = await fetch('http://localhost:3001/mockup/');
      const body = await response.json();
      setData(body);
      setIsLoading(false)
    }

    fetchDataFromAPI()
  }, []);


  const handleFormLoad = (formLoading) => {
    setIsFormSubmitted(formLoading);
  }

  const handleInputChange = (val) => {
    console.log(val)
    setUrl(val)
  }

  const handleDeviceChange = (device) => {
    setMockupType(device)
    console.log(device)
  }


  const handleFormSubmit = async (event) => {
    console.log('submitting...')
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/mockup/', {
        method: 'POST',
        body: JSON.stringify({ url: url, device: mockupType }),
        headers: { 'Content-type': 'application/json' }
      });

      const data = await response.json();
      console.log(data);
      handleFormLoad(false);
      setMockupImage(data.image);

    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div className="App">
      <Layout>
        <section className="text-gray-700 body-font  flex justify-center items-center">
          <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">

            {mockupImage && (
              <div className="w-40">
                <img className="w-full object-cover object-center rounded" alt={`mockup of ${url}`} src={mockupImage} />
              </div>
            )}

            {!mockupImage && (
              <img className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src={heroImg} />
            )}
            <div className="text-center lg:w-2/3 w-full">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold text-gray-900">Fast high quality mockup design</h1>
              <p className="mb-8 leading-relaxed">Create a high quaility mockup image to showcase any website</p>

              <div>
                <input
                  onClick={(e) => handleDeviceChange(e.target.value)}
                  defaultChecked
                  type="radio" id="phone" name="device" value="phone" />
                <label for="phone">Phone</label>
                <input
                  onClick={(e) => handleDeviceChange(e.target.value)}
                  type="radio" id="laptop" name="device" value="laptop" />
                <label for="laptop">Laptop</label>
                <input
                  onClick={(e) => handleDeviceChange(e.target.value)}
                  type="radio" id="desktop" name="device" value="desktop" />
                <label for="desktop">Desktop</label>
              </div>

              {isLoading ?
                (<div>Loading</div>) :
                (<Form
                  isFormSubmitted={isFormSubmitted}
                  handleFormLoad={handleFormLoad}
                  handleFormSubmit={handleFormSubmit}
                  url={url}
                  handleInputChange={handleInputChange} />)
              }
            </div>
          </div>
        </section>
      </Layout>

    </div >
  );
}

export default App;
