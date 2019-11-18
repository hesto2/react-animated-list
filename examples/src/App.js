import React, { useState } from "react";
import "./App.css";
import { Card, CardContent, CardActions } from "@material-ui/core";
import { AnimatedList } from "react-mui-animated-list";
import { Button } from "@material-ui/core";

function TestCard({ onDismiss, children }) {
  return (
    <Card style={{ margin: "10px" }}>
      <CardContent>{children}</CardContent>
      <CardActions>
        <Button onClick={onDismiss} variant={"contained"}>
          Remove
        </Button>
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
        Data: {JSON.stringify(cards)}
        <Button
          onClick={addItem}
          style={{ position: "absolute", left: "25%" }}
          variant={"contained"}
          color="primary"
        >
          Add
        </Button>
        <AnimatedList animation={"grow"}>
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
