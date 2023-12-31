import { GEO_API_URL, geoApiOpions } from "../../api";

import {AsyncPaginate} from "react-select-async-paginate";
import React from 'react';
import { useState } from "react";

const Search = ({onSearchChange}) => {
    const [search, setSearch] = useState(null);
    const loadOptions = (inputValue) => {
        return fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOpions)
        .then ((response) => response.json())
        .then ((response) => { 
            return {
                options: response.data.map((city) => {
                    return {
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name}, ${city.countryCode}`,
                    }
                })
            }
        })
        .catch ((err) => console.error(err))
    }
    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    return (
        <AsyncPaginate
            placeholder = "Search for City"
            debounceTimeout = {600}
            value = {search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    )
}

export default Search;