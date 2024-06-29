const Pokemon = ({ pokemon }) => {
  return (
    <div className="pokemon-bio">
      <div className="pokemon-header">
        <img src={pokemon.image} alt={pokemon.name} />
        <h2>{pokemon.name}</h2>
      </div>
      <div className="pokemon-details" style={{ marginTop: '20px' }}> {/* Inline style for gap */}
        <p>Types - {pokemon.types.join(", ")}</p>
        <p>hp - {pokemon.hp}</p>
        <p>Attack - {pokemon.attack}</p>
        <p>Defense - {pokemon.defense}</p>
      </div>
    </div>
  );
};

export default Pokemon;