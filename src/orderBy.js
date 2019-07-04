import React from 'react';
export default function OrderBy({ orderBy }) {
    return <div>
        <select onChange={(e) => orderBy(e)}>
            <option value= "">Select</option>
            <option value="low">Lowest To Highest</option>
            <option value="high">Highest To Lowest</option>
        </select>
    </div>
}
