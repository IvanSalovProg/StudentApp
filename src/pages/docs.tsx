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

const date_format = (value: string | null) =>{
  if(!value)return"";
  const date = dayjs(value);

    if(date.format('YYYY') == '1901' && date.format('DD')== '01' && date.format('MM')== '01') return"";

    return date.format('MM-DD-YYYY');
}

const columns = 
[{
  title: 'Id',
  dataIndex: 'id',
},
{
  title: 'Группа',
  dataIndex: 'groupId',
  render:(value: number) => {
    const group = data.groups.find((x: any) => x.id == value);
    if(!group) return""

    return group.name;
  }
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
  render: (value: any) => date_format(value)
},
{
  title: 'Дата обновления',
  dataIndex: 'updateAt',
  render: (value: any) => date_format(value)
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


