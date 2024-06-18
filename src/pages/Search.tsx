import React, { useEffect } from 'react'
import {useSearchParams } from "react-router-dom";
import PackageDispalyer from '../components/PackageDispalyer';

function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    var keyword = searchParams.get('keyword') as string;
    useEffect(() => {
    }, [keyword])
    return (
        <PackageDispalyer keyword={keyword} />
    )
}
export default Search
