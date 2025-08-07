import { useEffect, useState } from 'react';
import Cards from './Cards';

const fetchWaterPokemons = async (limit = 8) => {
  const typeRes = await fetch('https://pokeapi.co/api/v2/type/water');
  const typeData = await typeRes.json();
  const subset = typeData.pokemon.slice(0, limit);

  const cards = await Promise.all(
    subset.map(async (p) => {
      const res = await fetch(p.pokemon.url);
      const details = await res.json();
      return {
        id: details.id,
        name: details.name,
        image: details.sprites.other['official-artwork'].front_default
      };
    })
  );

  return cards;
};

export default function GameBoard({ pairCount = 8 }) {
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    async function loadCards() {
      const pokemons = await fetchWaterPokemons(pairCount);
      const duplicated = [...pokemons, ...pokemons]
        .map(p => ({ ...p, uuid: crypto.randomUUID(), matched: false }))
        .sort(() => Math.random() - 0.5);
      setCards(duplicated);
    }

    loadCards();
  }, [pairCount]);

  const handleClick = (clicked) => {
    if (selected.length === 2 || selected.includes(clicked)) return;
    const newSelected = [...selected, clicked];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      const [a, b] = newSelected;
      if (a.id === b.id && a.uuid !== b.uuid) {
        setCards(prev =>
          prev.map(card =>
            card.id === a.id ? { ...card, matched: true } : card
          )
        );
      }
      setTimeout(() => setSelected([]), 1000);
    }
  };

  return (
    <div className="board">
      {cards.map(card => (
        <Cards
          key={card.uuid}
          pokemon={card}
          flipped={card.matched || selected.includes(card)}
          onClick={() => handleClick(card)}
        />
      ))}
    </div>
  );
}
