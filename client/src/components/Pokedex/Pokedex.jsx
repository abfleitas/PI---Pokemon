import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link} from "react-router-dom";
import { getPokemonDetail, clearDetail } from "../../redux/actions";
import loading from '../../img/pikachu.gif';
import './pokedex.css';

const Pokedex = (props) => {
    const idPokemon = props.match.params.id;
    const dispatch = useDispatch();
    const pokeDetails = useSelector(state => state.detailPokemon);
    

    useEffect(()=>{
        dispatch(getPokemonDetail(idPokemon));
        return () => {
            dispatch(clearDetail())
        }
    }, [dispatch, idPokemon]);

    // const handleDelete = () => {
    //     dispatch(deletePokemon(idPokemon ));
    //     history.push('/home');
    // }

    return (
        <div className="container-detail">
            {!pokeDetails.name ? <div className="top-loader"><img src={loading} alt="loading"/></div> :
            <div>
                <div className="container_detail">
                    <div className="top">
                        <h3>{pokeDetails.name}</h3>
                        <img src={pokeDetails.imgUrl} alt="poke-detail" />
                    </div>
                    <div className="container_types">
                        {pokeDetails.types ? pokeDetails?.types.map(type => <h2 key ={type.name} id={type.name}>{type.name.toUpperCase()}</h2>) : null}
                    </div>
                    <div className="stats">
                        <div className="stats_1">
                            <h2>Life: {pokeDetails.hp}</h2>
                            <meter min="0" max="200" value={pokeDetails.hp} low="40" high="150" optimun="200"/>
                            <h2>Speed: {pokeDetails.speed}</h2>
                            <meter min="0" max="200" value={pokeDetails.speed} low="40" high="150" optimun="200"/>
                        </div>
                        <div className="stats_2">
                            <h2>Defense: {pokeDetails.defense}</h2>
                            <meter min="0" max="200" value={pokeDetails.defense} low="40" high="150" optimun="200"/>
                            <h2>Attack: {pokeDetails.attack}</h2>
                            <meter min="0" max="200" value={pokeDetails.attack} low="40" high="150" optimun="200"/>
                        </div>
                        <div className="stats_3">
                            <h2>Weight: {pokeDetails.weight}</h2>
                            <meter min="0" max="200" value={pokeDetails.weight} low="40" high="150" optimun="200"/>
                        </div>
                    </div>
                </div>
                <div className="home">
                    <span><Link to="/home">Back to Home</Link></span>
                </div>
            </div>}
        </div>
    );
};

export default Pokedex;