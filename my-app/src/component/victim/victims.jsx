import React from "react";
import Victim from "./victim";

const Victims = (props) => (
  <ul>
    {props.victimc.map((victim) => (
      <Victim victim={victim} />
    ))}
  </ul>
);

export default Victims;
