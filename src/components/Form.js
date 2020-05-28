import React from 'react'

const Form = (props) => {

    const {
        onFormSubmit,
        url,
        handleInputChange
    } = props;

    return (
        <form
            onSubmit={onFormSubmit}
            method="POST"
            action={'http://localhost:9000/testAPI/'}
        >
            <div className="flex flex-col items-center">
                <input
                    type="text"
                    className="rounded w-2/4 h-10 bg-gray-300  mb-5 pl-3 "
                    onChange={(e) => handleInputChange(e.target.value)}
                    value={url}
                    placeholder="type any url here"
                />
            </div>

            <div className="flex justify-center">

                <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                    Create mockup
                  </button>
            </div>

        </form>
    )
}
export default Form;