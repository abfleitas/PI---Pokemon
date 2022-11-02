import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName, getAllPokemons } from "../../redux/actions";
import './search.css';

const SearchBar = () => {
    const dispatch = useDispatch();
    const [inputName, setInputName] = useState('');

    const handleChange = (e) => {
        setInputName(e.target.value);
    };

    const handleSubmit = (e) => {
        if(!inputName.length){
            dispatch(getAllPokemons());
            return alert('Please insert a name');
        }else{
            e.preventDefault();
            dispatch(getPokemonByName(inputName));
            setInputName('');
        }
    };

    return (
        <div>
            <input type='text' placeholder='Search pokemon...' onChange={(e) => handleChange(e)} value={inputName} className="search"/>
            <button type= "submit" onClick={(e) => handleSubmit(e)} className="btn-search">Search</button>
        </div>
    )
};

export default SearchBar;