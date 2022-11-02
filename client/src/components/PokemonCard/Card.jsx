import React from "react";
import { Link } from "react-router-dom";
import './Card.css';
import logo from '../../img/ball.png';

const Card = ({id, name, types, img, attack, weight}) =>{
    return (
        <div>
            <Link to={`pokedex/${id}`}>
            <figure className={types[1] ? types[1] : types[0]}>
              <div className="card-elements">
                <div className="image">
                  <img src={logo} alt="" id="pokeball"/>
                  <span id="number">{id}</span>
                  <img src={img} alt="poke" />
                  <h2 className="cardName">{name}</h2>
                </div>
                <div className="info">
                  <h3 className="cardName">Attack: {attack}</h3> 
                  <h3 className="cardName">Weight: {weight}</h3>
                  <br/>
                  {types.length >= 2 ? (
                  <div className="types">
                    <h3 className="cardType">{types[0]}</h3>
                    <h3 className="cardType">{types[1]}</h3>
                  </div>
                    ) : (
                      <div className="types">
                        <h3 className="cardType">{types[0]}</h3>
                      </div>
                    )
                  }  
                </div>  
              </div>  
            </figure>
            </Link>
        </div>
    );
};

export default Card;