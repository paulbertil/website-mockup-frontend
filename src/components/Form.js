import React, { useState } from 'react';
import LoadingIcon from '../components/loadingIcon';


const Form = (props) => {
    const {
        handleFormSubmit,
        url,
        handleInputChange,
        handleFormLoad,
        isFormSubmitted
    } = props;

    const onSubmitForm = (e) => {
        handleFormLoad(true);
        handleFormSubmit(e);
    }

    return (
        <form
            onSubmit={(e) => onSubmitForm(e)}
        >
            <div className="flex flex-col items-center">
                <input
                    type="text"
                    name="url"
                    className="rounded w-2/4 h-10 bg-gray-300  mb-5 pl-3 "
                    onChange={(e) => handleInputChange(e.target.value)}
                    value={url}
                    placeholder="type any url here"
                />
            </div>
            <div className="flex justify-center">
                {!isFormSubmitted && (
                    <button
                        className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded-full text-lg">
                        Create mockup
                    </button>
                )}
                {isFormSubmitted && (
                    // loading icon
                    <LoadingIcon />
                )}
            </div>
        </form>
    )
}
export default Form;