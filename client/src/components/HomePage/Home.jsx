import React from "react";
import { getAllPokemons, getAllTypes, filterPokesByType, orderByName, filterPokesByCreated, orderByAttack } from "../../redux/actions";
import { useDispatch , useSelector} from "react-redux";
import { useEffect } from "react";
import Card from "../PokemonCard/Card";
import './home.css';
import { useState } from "react";
import NavBar from "../NavBar/NavBar";
import Paginado from "../Paginado/Paginado";
import loading from '../../img/pikachu.gif';
import loader from '../../img/loading1.gif'

const Home = () => {
    const allPokemons = useSelector(state => state.pokemons);
    const allTypes = useSelector(state => state.allTypes);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [pokesPerPage] = useState(12);
    const lastPoke = currentPage * pokesPerPage;
    const firstPoke = lastPoke - pokesPerPage;
    const currentPokes = allPokemons.slice(firstPoke, lastPoke);
    const pages = Math.ceil(allPokemons.length/pokesPerPage);
    const paginado = (numberPage) => setCurrentPage(numberPage);
    const [order, setOrder] = useState('');
    console.log(order)

    useEffect(()=>{
        dispatch(getAllTypes());
        dispatch(getAllPokemons());
    },[dispatch]);

    const handleFilterByTypes = (e) => {
        dispatch(filterPokesByType(e.target.value));
        setCurrentPage(1);
    };

    const handlerOrderByName = (e) => {
        dispatch(orderByName(e.target.value));
        setOrder(e.target.value);
        setCurrentPage(1);
    };

    const handlerFilterCreated = (e) => {
        dispatch(filterPokesByCreated(e.target.value));
        setCurrentPage(1);
    }

    const handlerOrderByAttack = (e) => {
        dispatch(orderByAttack(e.target.value));
        setOrder(e.target.value);
        setCurrentPage(1);
    };

    const handleReset = (e) => {
        e.preventDefault();
        dispatch(getAllTypes());
        dispatch(getAllPokemons());
        document.getElementById('order').value = 'order';
        document.getElementById('created').value = 'all';
        document.getElementById('types').value = 'type';
        setCurrentPage(1);
        alert('Recargando, esto puede demorar unos segundos...');
    };

    return (
        <>
            <NavBar />
            <div className="filtros">
                    <button type="submit" className="reset" onClick={(e) => handleReset(e)}>Reset</button>
                    <select id="order" defaultValue="Select the order" onChange={(e) => handlerOrderByName(e)}>
                        <option value="order">Select the order</option>
                        <option value="asc">A - Z</option>
                        <option value="des">Z - A</option>
                    </select>
                    <select id="attack-order" defaultValue="Order by attack" onChange={handlerOrderByAttack}>
                        <option value="attack">Order by attack</option>
                        <option value="minAttack">Min attack</option>
                        <option value="maxAttack">Max attack</option>
                    </select>
                    <select id="types" defaultValue="Select the type" onChange={(e) => handleFilterByTypes(e)}>
                        <option value="type">Select the type</option>
                        <option value="All">All</option>
                        { allTypes?.map(type => (
                            <option key={type.id} value={type.name}>{type.name}</option>
                        ))}
                    </select>
                    <select id="created" onChange={(e) => handlerFilterCreated(e)}>
                        <option value="all">All</option>
                        <option value="created">Created</option>
                        <option value="api">Api</option>
                    </select>
                </div>

            <div className="container-pokemon">
                <div className="container-home">
                    { !currentPokes.length  ? 
                        <div className="loading">
                            <img src={loading} alt="cargando" />
                            <br />
                            <img src={loader} alt="" />
                        </div> : 
                    
                        currentPokes.length ? currentPokes.map(poke=>{
                            return <Card
                                id={poke.id}
                                name={poke.name}
                                types={poke.types?.[0] ? poke.types.map(t => t.name) : poke.types.map(t=> t.name + (' '))}
                                img={poke.imgUrl}
                                attack={poke.attack}
                                weight={poke.weight}
                                key={poke.id}
                            />
                        })
                    : null}
                </div>
                {currentPokes.length > 0 && allPokemons.length > 12 ?
                    <div className="pag">
                         <Paginado pokesPerPage={pokesPerPage} allPokes={allPokemons.length} paginado={paginado} currentPage={currentPage}/>
                        </div>:null}
            </div>
        </>
    )
};

export default Home;