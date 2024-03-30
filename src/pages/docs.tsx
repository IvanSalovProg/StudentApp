import React from "react";
import { ChangeEventHandler, EventHandler } from "react";
import { request } from "@umijs/max";
import { Table } from "antd";
import dayjs from "dayjs";

const DocsPage = () => {

const [value, setValue] = React.useState<string>()
const [data, setData] = React.useState<any>()

React.useEffect(() => {
  request('/api/student/GetAll', {method: 'POST', data:{ }}).then(data => {
    setData(data)
  })
}, []);

const inputonChange = (event: any) => {
console.log(event.target.value);
setValue(event.target.value)
}

const columns = 
[{
  title: 'Id',
  dataIndex: 'id',
},
{
  title: 'Группа',
  dataIndex: 'groupId',
},
{
  title: 'Имя',
  dataIndex: 'firstName',
},
{
  title: 'Фамилия',
  dataIndex: 'lastName',
},
{
  title: 'Email',
  dataIndex: 'email',
},
{
  title: 'Дата создания',
  dataIndex: 'createdAt',
  render: (value: any) => {
    const date = dayjs(value,'MM-DD-YYYY');
    if(date.format('YYYY') == '1901' && date.format('DD')== '01' && date.format('MM')== '01') return"";

    console.log(value)
    return dayjs(value,'MM-DD-YYYY').format('MM-DD-YYYY');
  }
},
{
  title: 'Дата обновления',
  dataIndex: 'updateAt',
}]

  return (
    <div>
      <p><input onChange= {inputonChange}/></p>
      <p>{value == "1" ? <>Hello, World</> : <></>}</p>
      <Table 
      columns={columns}
       dataSource={data?.students}/>
    </div>
  );
};

export default DocsPage;


