import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Spinner } from '../components/Spinner';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';


const URL = 'http://localhost:5555/books';

const Home = () => {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get(URL)
            .then(response => {
                setBooks(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            })
    }, []);

    return (
        <div className='p-4'>
            <div className="flex justify-between items center">
                <h1 className="text-3xl my-8">BOOKS LIST</h1>
                <Link to="/books/new">
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>

            {
                loading ?
                    (<Spinner />) :
                    (<table className='w-full border-separate border-spaceing-2'>
                        <thead>
                            <tr>
                                <th className="border border-slate-600 rounded-md">No.</th>
                                <th className="border border-slate-600 rounded-md">Title</th>
                                <th className="border border-slate-600 rounded-md max-md:hidden">Author</th>
                                <th className="border border-slate-600 rounded-md">Publish Year</th>
                                <th className="border border-slate-600 rounded-md">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book, index) => {
                                <tr key={book._id} className="h-8">
                                    <th className="border border-slate-700 rounded-md text-center">{index + 1}</th>
                                    <th className="border border-slate-700 rounded-md text-center">{book.title}</th>
                                    <th className="border border-slate-700 rounded-md text-center">{book.author}</th>
                                    <th className="border border-slate-700 rounded-md text-center">{book.publishYear}</th>
                                    <th className="border border-slate-700 rounded-md text-center">{
                                        <div className="flex justify-center gap-x-4">
                                            <Link to={`/books/details/${book._id}`}>
                                                <BsInfoCircle className='text-2xl text-green-800' />
                                            </Link>
                                            <Link to={`/books/edit/${book._id}`}>
                                                <AiOutlineEdit className='text-2xl text-yellow-800' />
                                            </Link>
                                            <Link to={`/books/details/${book._id}`}>
                                                <MdOutlineDelete text-2xl text-red-800 />
                                            </Link>
                                        </div>
                                    }</th>
                                </tr>
                            })}
                        </tbody>
                    </table>)
            }

        </div>
    )
}

export { Home }
