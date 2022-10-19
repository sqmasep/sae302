import React from "react";
import styles from "./Heading.module.styl";

interface HeadingProps {
  level: number;
  children: React.ReactNode;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({
  level,
  children,
  className = "",
}) => {
  switch (level) {
    case 1:
      return <h1 className={styles.heading}>{children}</h1>;
  }
};

export default Heading;
