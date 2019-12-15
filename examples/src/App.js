import React, { useState } from "react";
import "./App.css";
import { Card, CardContent, CardActions } from "@material-ui/core";
import { AnimatedList } from "react-animated-list";
import { Button } from "@material-ui/core";
import { withStyles, createStyles } from "@material-ui/core";

const styles = theme =>
  createStyles({
    cardRow: { display: "flex", maxWidth: theme.spacing(75), flexWrap: "wrap" },
  });

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

const App = ({ classes }) => {
  const [cards, setCards] = useState([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
  ]);

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
        <div className={classes.cardRow}>
          <AnimatedList animation={"grow"} initialAnimationDuration={1000}>
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
        </div>
      </header>
    </div>
  );
};

export default withStyles(styles)(App);
