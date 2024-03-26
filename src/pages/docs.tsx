import React from "react";
import { ChangeEventHandler, EventHandler } from "react";
import { request } from "@umijs/max";

const DocsPage = () => {

const [value, setValue] = React.useState<string>()

request('http://localhost:15301/Student/GetAll', {method: 'POST', data:{ }}).then(data => {
  console.log(data)
})

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
