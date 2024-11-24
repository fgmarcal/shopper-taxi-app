import { Button, Form, Input } from 'antd'
import React from 'react'

export const Home:React.FC = () => {

  const [form] = Form.useForm();

  const onFinish = () =>{

  }

  return (
    <div style={{
      display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center', margin:'1rem auto'
    }}>
      <h1>Taxi App!</h1>
      <h2>Faça seu cadastro ou entre com seu e-mail!</h2>
      <Form
        form={form}
        onFinish={onFinish}
        style={{marginTop:'2rem'}}
        layout='vertical'
        clearOnDestroy={true}
      >
        <label style={{color:'#FFF'}}>Nome</label>
        <Form.Item name={['name']}
            rules={[{ required: true, message:"Nome é um campo obrigatório" }]}>
          <Input style={{fontWeight:'bold'}}/>
        </Form.Item>

        <label style={{color:'#FFF'}}>E-mail</label>
        <Form.Item name={['email']}
            rules={[{ required: true, message:"E-mail é um campo obrigatório" }]}>
          <Input style={{fontWeight:'bold'}}/>
        </Form.Item>
        <Button type='primary' htmlType='submit' style={{marginRight:'2rem'}}>Cadastrar</Button>        
        <Button type='primary' danger>Já tenho cadastro!</Button>

      </Form>
    </div>
  )
}
