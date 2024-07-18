import React from 'react';

const Pagination = ({ total, page, pageSize, onPageChange }) => {
    const totalPages = Math.ceil(total / pageSize);

    return (
        <div>
            <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
                Previous
            </button>
            <span>
                Page {page} of {totalPages}
            </span>
            <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
