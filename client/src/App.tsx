import React from "react";
import styles from "./App.module.styl";
import Button from "./components/Button/Button";
import Card from "./components/Card/Card";
import Heading from "./components/Heading/Heading";

const App: React.FC = () => {
  return (
    <div style={styles.body}>
      <Button>hello</Button>
      <Card>
        <Card.body>
          <Heading level={1}>slt</Heading>
        </Card.body>
      </Card>
    </div>
  );
};

export default App;
