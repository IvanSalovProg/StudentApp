import React from "react";
import { ChangeEventHandler, EventHandler } from "react";
import { request } from "@umijs/max";
import { Button, Form, Input, Popconfirm, Select, Space, Table, message } from "antd";
import dayjs from "dayjs";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const DocsPage = () => {

const [value, setValue] = React.useState<string>()
const [data, setData] = React.useState<any>()
const [groups, setGroups] = React.useState<any>()

React.useEffect(() => {
  request('/api/student/GetAll', {method: 'POST', data:{ }}).then(data => {
    setData(data)
  })

  request('/api/group/GetAll', {method: 'POST', data:{ }}).then(data => {
const groups = data.map(x =>({value: x.id, label: x.name})) 

    setGroups(groups)
    console.log(groups)
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
request('/api/student', {method: 'DELETE', params:{id}}).then(() => {
  message.success("Студент удален")

  const newStudents = data?.students.filter((x: any) => x.id != id)
const newData = { ...data, students: newStudents}
  setData(newData)
})
}

const searchHandler = (data: any) => {
request('/api/student/GetAll', {method: 'POST', data }).then(data => {
  console.log(data);
  setData(data)
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
    <a>
    <Popconfirm
    title="Вы уверены?"
    description="Подтвердите удаление студента"
    onConfirm={() => deleteHandler(row.id)}
    onCancel={() => {}}
    okText="Да"
    cancelText="Нет"
  >
    <DeleteOutlined/>
  </Popconfirm>
    </a>
  </Space>
  }

}]

  return (
    <div>
      <Form layout="inline" onFinish={searchHandler}>
      <Form.Item name="groupId" label="Группа" style={{marginBottom: '12px'}}>
        <Select  allowClear
         options = {groups}
         style={{width: '150px'}}
         />
      </Form.Item>
      <Form.Item name="firstName" label="Имя" style={{marginBottom: '12px'}}>
        <Input style={{width: '150px'}} />
      </Form.Item>
      <Form.Item name="lastName" label="Фамилия" style={{marginBottom: '12px'}}>
        <Input style={{width: '150px'}} />
      </Form.Item>
      <Form.Item name="email" label="E-mail" style={{marginBottom: '12px'}}>
        <Input style={{width: '150px'}} />
      </Form.Item>
      <Button type="primary" htmlType ="submit">Найти</Button>
      </Form>
      
      <Table 
      rowKey="id"
      columns={columns}
       dataSource={data?.students}/>
    </div>
  );
};

export default DocsPage;


