import React, { useEffect, useState } from 'react';
import './listingpage.css';
import { Link } from 'react-router-dom';

const Listpage = () => {
    const [data, setData] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [totalItems, setTotalItems] = useState(0); 
    const [searchType, setSearchType] = useState('name'); // Add search type state
    const [searchQuery, setSearchQuery] = useState(''); // Add search query state

    // Local state variables for form inputs
    const [formSearchType, setFormSearchType] = useState('name');
    const [formSearchQuery, setFormSearchQuery] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://dinefinder-782r.onrender.com/api/get/page/all?page=${currentPage}&limit=${itemsPerPage}&type=${searchType}&query=${searchQuery}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result.items);
                setTotalItems(result.count); 
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage, itemsPerPage, searchType, searchQuery]);

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    const handleFormSearchTypeChange = (event) => {
        setFormSearchType(event.target.value);
    };

    const handleFormSearchQueryChange = (event) => {
        setFormSearchQuery(event.target.value);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        setSearchType(formSearchType);
        setSearchQuery(formSearchQuery);
        setCurrentPage(1); // Reset to first page when a new search is made
    };

    const handleReset = (event) => {
        event.preventDefault();
        setFormSearchType('name');
        setFormSearchQuery('');
        setSearchType('name');
        setSearchQuery('');
        setCurrentPage(1); // Reset to first page when the form is reset
    };

    const totalPages = Math.ceil(totalItems / itemsPerPage); // Calculate total pages

    if (loading) {
        return <div className="head-contain">Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container">
            <div className="search-bar">
                <form onSubmit={handleSearch}>
                    <button type="button" onClick={handleReset}>Reset</button>
                    <select value={formSearchType} onChange={handleFormSearchTypeChange}>
                        <option value="name">Name</option>
                        <option value="cost">Cost</option>
                        <option value="cuisines">Cuisines</option>
                    </select>
                    <input 
                        type="text"  
                        placeholder={`Search by ${formSearchType}`} 
                        value={formSearchQuery}
                        onChange={handleFormSearchQueryChange}
                    />
                    <button type="submit">Search</button>
                </form>
            </div>
            <div className="cards-container">
                {Array.isArray(data) && data.length > 0 ? (
                    data.map(item => (
                        <div className="card" key={item._id}>
                            <img src={item.img_url} alt={item.name} className="card-image" />
                            <div className="card-content">
                                <h2 className="card-title"><Link to={`/detail/${item.id}`}>{item.name}</Link></h2>
                                <p className="card-city">{item.location.city}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No data available</div>
                )}
            </div>
            <div className="end-contain">
                <label className="items-per-page">
                    Items per page:
                    <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </label>
                <div className="pagination">
                    <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={currentPage === index + 1 ? 'active' : ''}
                        >
                            {index + 1}
                        </button>
                    )).slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, totalPages))}
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default Listpage;
