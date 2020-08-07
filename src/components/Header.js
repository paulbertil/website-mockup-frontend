import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

const Header = () => {

    const [product, setProduct] = React.useState({
        name: "Mockup Pro",
        price: 10,
        productBy: "Facebook"
    });

    const makePayment = token => {
        const body = {
            token,
            product
        }

        const headers = {
            "Content-Type": "application/json"
        }

        return fetch('http://localhost:9000/payment', {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        }).then(response => {
            console.log('Response: ', response);
            const { status } = response;
            console.log('Status: ', status);
        }).catch(error => console.log(error.message))
    }

    return (
        <header className="text-gray-700 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" href="/">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="mr-2 w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                    mockupdesign
                </a>
                <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                    <button className="mr-5 hover:text-gray-900">About</button>

                </nav>

                <StripeCheckout
                    stripeKey={process.env.REACT_APP_KEY}
                    token={makePayment}
                    name="Buy Premium"
                    amount={product.price * 100}
                >
                    <button className="inline-flex items-center text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded-full text-lg">
                        Go Premuim
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </button>

                </StripeCheckout>
            </div>
        </header>
    )
}

export default Header;