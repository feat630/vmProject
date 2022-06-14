import React from "react";

const Victim = (props) => (
  <tr key={props.victim_id}>
    <td>{props.name}</td>
    <td>{props.gender}</td>
    <td>{props.age}</td>
  </tr>
);

export default Victim;
