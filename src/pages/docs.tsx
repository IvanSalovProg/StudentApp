import { ChangeEventHandler, EventHandler } from "react";

const DocsPage = () => {
const func1 = () => {
  return 'Hello World!'
}

const param2 = "My property";

const inputonChange = (event: any) => (
console.log(event)
)



  return (
    <div>
      <p><input onChange= {inputonChange}/></p>
      <p>{func1()}</p>
      <p>{param2}</p>
    </div>
  );
};

export default DocsPage;
