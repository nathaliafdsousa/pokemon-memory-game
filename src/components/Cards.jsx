import './Cards.css';

export default function Card({ pokemon, flipped, onClick }) {
  return (
    <div className={`card ${flipped ? 'flipped' : ''}`} onClick={onClick}>
      <div className="inner">
        <div className="front">
          <img src={pokemon.image} alt={pokemon.name} />
        </div>
        <div className="back">
          <img src="/pokeball.png" alt="pokeball" />
        </div>
      </div>
    </div>
  );
}
