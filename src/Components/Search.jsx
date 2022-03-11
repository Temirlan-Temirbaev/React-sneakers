import React from 'react';

const Search = ({onChange}) => {
    return <>
        <h1 className="contentTitle">Все кроссовки</h1>
        <div className="searchBlock">
            <img src="/img/search.svg" alt="search"/>
            <input onChange={onChange} type="text" maxLength={20} className="search" placeholder="Поиск..."/>
        </div>
    </>;
};

export default Search;
