import React, { useState, useEffect } from 'react'

import Form from './Form';
import MockupDisplay from './MockupDisplay';
import MaxWidthContainer from './MaxWidthContainer';
import HeroStyles from './Hero.module.scss'
import DeviceRadioGroup from './DeviceRadioGroup';



const Hero = () => {
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
        setUrl(val)
    }

    const handleDeviceChange = (device) => {
        setMockupType(device)
    }

    const handleMockupClean = () => {
        setMockupImage('')
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
        <div id="generate" className={HeroStyles.hero}>
            <MaxWidthContainer>
                <div className={HeroStyles.heroContent}>
                    {mockupImage && (
                        <MockupDisplay
                            url={url}
                            mockupImage={mockupImage}
                            handleMockupClean={handleMockupClean}
                        />
                    )}
                    {/* Show headline when no image is generated */}
                    {!mockupImage && (
                        <>
                            <div className={HeroStyles.heroHeadline}>
                                <h1>URL to High Quality Mockup</h1>
                                <p>Showcase your projects lika a professional</p>
                            </div>
                            {/* Hide device selection when form is submitted  */}
                            {!isFormSubmitted && (
                                <DeviceRadioGroup handleDeviceChange={handleDeviceChange} />
                            )}

                            {isLoading ?
                                (<div>Loading</div>) :
                                (<Form
                                    isFormSubmitted={isFormSubmitted}
                                    handleFormLoad={handleFormLoad}
                                    handleFormSubmit={handleFormSubmit}
                                    url={url}
                                    handleInputChange={handleInputChange} />)
                            }
                        </>
                    )}


                </div>
            </MaxWidthContainer>
        </div>
    )
}

export default Hero
