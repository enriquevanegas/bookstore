import React from 'react';
import { Link } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi';

const ShowBook = () => {
    return (
        <div className='w-100 p-4'>
            <div className="flex items-center">
                <Link to="/">
                    <BiArrowBack className='text-sky-800 text-4xl ml-3' />
                </Link>
                <h1 className="text-3xl my-8">BOOK DETAILS</h1>
            </div>
        </div>
    )
}

export { ShowBook }
