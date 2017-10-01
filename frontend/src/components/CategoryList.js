import React from 'react'
import {Link} from 'react-router-dom';

export default function CategoryList({list}) {
    return (
        <div className='CategoryList'>
            <h3 className='subheader'>
                Categories
            </h3>
            <ul>
                {list.map(item => (
                    <li key={item.name} className="CategoryListItem">
                        <Link to={`/category/${item.name}`}>{item.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
