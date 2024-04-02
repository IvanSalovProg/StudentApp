import React from "react";
import { ChangeEventHandler, EventHandler } from "react";
import { request } from "@umijs/max";
import { Space, Table, message } from "antd";
import dayjs from "dayjs";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

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

const deleteHandler = (id: number) => {
console.log(id)
request('/api/student', {method: 'DELETE', params:{id}}).then(data => {
  message.success("Студент удален")

  const newStudents = data?.students.filter((x: any) => x.id != id)
const newData = { ...data, students: newStudents}
  setData(newData)
})
}

const columns = [{
  title: 'Id',
  dataIndex: 'id',
},
{
  title: 'Группа',
  dataIndex: 'groupId',
  render:(value: number) => data.groups.find((x: any) => x.id == value)?.name
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
},
{
  title: 'Действия',
  key: 'action',
  render: (row: any) => {return <Space>
    <a><EditOutlined/></a>
    <a onClick={() => deleteHandler(row.id)}><DeleteOutlined/></a>
  </Space>}

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


