import React from "react";
// import "./Card.module.styl";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

type CardType = React.FC<CardProps> & { body: React.FC<CardProps> };

const Card: CardType = ({ children, className = "" }) => {
  return (
    <div className={`${className} card`.trim()}>card component {children}</div>
  );
};

Card.body = ({ children }) => <div>{children}</div>;

export default Card;
