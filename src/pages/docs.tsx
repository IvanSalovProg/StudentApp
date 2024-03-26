import React from "react";
import { ChangeEventHandler, EventHandler } from "react";
import { request } from "@umijs/max";
import { Table } from "antd";

const DocsPage = () => {

const [value, setValue] = React.useState<string>()
const [data, setData] = React.useState<any>()

React.useEffect(() => {
  request('/student/GetAll', {method: 'POST', data:{ }}).then(data => {
    setData(data)
  })
}, []);

const inputonChange = (event: any) => {
console.log(event.target.value);
setValue(event.target.value)
}



  return (
    <div>
      <p><input onChange= {inputonChange}/></p>
      <p>{value == "1" ? <>Hello, World</> : <></>}</p>
      <Table 
      columns={[{
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'Name',
        dataIndex: 'name',
      }]}
       dataSource={data?.students}/>
    </div>
  );
};

export default DocsPage;
