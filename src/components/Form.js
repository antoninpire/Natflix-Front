import * as React from "react";
import { Input } from "../components/Input";
import { Btn } from "./Btn";
import { v4 as uuid } from "uuid";

export function Form({
  title,
  inputs = [],
  links = [],
  actions = [],
  inputContainerHeight = "8rem",
}) {
  return (
    <div className="form-container">
      <div className="form-title-container">
        <h3 className="form-title">{title}</h3>
      </div>
      <div
        className="form-inputs-container"
        style={{ height: inputContainerHeight }}
      >
        {inputs.map((input) => (
          <Input {...input} />
        ))}
      </div>
      <div className="form-btns-container">
        {actions.map((action) => (
          <Btn key={uuid()} {...action}></Btn>
        ))}
      </div>
      <div className="form-links-container">
        {links.map((link) => (
          <a key={uuid()} className="form-link" href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
