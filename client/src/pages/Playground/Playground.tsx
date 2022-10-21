import React from "react";
import { useLevelContext } from "../../contexts/LevelContext";
import styles from "./Playground.module.styl";

const Card: React.FC<{ card: string }> = props => (
  <div>
    <pre>{JSON.stringify(props, null, 2)}</pre>
  </div>
);

const Playground: React.FC = () => {
  const { data } = useLevelContext();
  return (
    <div>
      Playground
      <div>
        {data.map(card => (
          <Card card={card} />
        ))}
      </div>
    </div>
  );
};

export default Playground;
