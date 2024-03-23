import React from "react";
import { ChangeEventHandler, EventHandler } from "react";

const DocsPage = () => {

const [value, setValue] = React.useState<string>()

React.useEffect(() => {
  console.log('value changed')
}, [value]);

const inputonChange = (event: any) => {
console.log(event.target.value);
setValue(event.target.value)
}



  return (
    <div>
      <p><input onChange= {inputonChange}/></p>
      <p>{value == "1" ? <>Hello, World</> : <></>}</p>
    </div>
  );
};

export default DocsPage;
