import React, { useState } from "react";
import "./App.css";
import { Card, CardContent, CardActions } from "@material-ui/core";
import { AnimatedList } from "react-mui-animated-list";
import Test from "./test";

function TestCard({ onDismiss, children }) {
  return (
    <Card>
      <CardContent>{children}</CardContent>
      <CardActions>
        <button onClick={() => onDismiss(children)}>x</button>
      </CardActions>
    </Card>
  );
}

const App = () => {
  const [cards, setCards] = useState([1, 2, 3]);
  const addItem = () => {
    setCards([...cards, new Date().getMilliseconds()]);
  };
  const onDismiss = (card, cards) => {
    const newCards = cards.filter(c => {
      return card !== c;
    });
    setCards(newCards);
  };
  return (
    <div className="App">
      <header className="App-header">
        {JSON.stringify(cards)}
        <button onClick={addItem}>Add</button>
        <AnimatedList>
          {cards.map((c, i) => (
            <TestCard
              key={c}
              onDismiss={() => onDismiss(c, cards)}
              cards={cards}
            >
              {c}
            </TestCard>
          ))}
        </AnimatedList>
      </header>
    </div>
  );
};

export default App;
