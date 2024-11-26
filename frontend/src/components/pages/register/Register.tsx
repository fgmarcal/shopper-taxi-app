import { Button, Form, FormProps, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { FieldType } from './types';
import { Customer } from '../../../entity/customer/createCustomer';
import { notifyError } from '../../shared/popMessage/PopMessage';
import { CustomerRepository } from '../../../repository/customer/CustomerRepository';
import { useNavigate } from 'react-router';

const customerRepository = new CustomerRepository();

export const Register:React.FC = () => {

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [customer, setCustomer] = useState<Customer>();

  const navigate = useNavigate();

  const clearForm =()=>{
    form.resetFields()
  }


  const onFinish:FormProps<FieldType>['onFinish']  = async(values:Customer) =>{
    setLoading(true);
    if(!values){
      notifyError("Dados inválidos");
      clearForm();
      return;
    }
    try {
      await customerRepository.create(values);
      sessionStorage.setItem('userEmail',values.email);
      sessionStorage.setItem('userName',values.name);
      setCustomer(values);
    }catch (error) {
      console.error(error);
      notifyError("Aconteceu algum erro ao finalizar o registro!");
      setLoading(false);
    } 
  }

  const returnHome = () =>{
    sessionStorage.clear();
    navigate('/')
  }

  useEffect(()=>{
    if(!customer) return;
    const findUser = ()=>{
      const found = sessionStorage.getItem('userEmail');
      if(found){
        return navigate('/trip')
      }
      return navigate('/')
    }
    findUser()
  },[customer])

  return (
    <div style={{
      display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center', margin:'1rem auto'
    }}>
      <h1>Taxi App!</h1>
      <h2>Insira seu nome e e-mail válido para se cadastrar e fazer viagens!</h2>
      <Form
        form={form}
        onFinish={onFinish}
        style={{marginTop:'2rem'}}
        layout='vertical'
        initialValues={{remember:false}}
        autoComplete='off'
        clearOnDestroy={true}
      >
        <label style={{color:'#FFF'}}>Nome</label>
        <Form.Item name={['name']}
            rules={[{ required: true, message:"Nome é um campo obrigatório" }]}>
          <Input style={{fontWeight:'bold'}}/>
        </Form.Item>

        <label style={{color:'#FFF'}}>E-mail</label>
        <Form.Item name={['email']}
            rules={[{ required: true, message:"E-mail é um campo obrigatório" },{pattern:emailPattern, message:"e-mail inválido"}]}>
          <Input style={{fontWeight:'bold'}}/>
        </Form.Item>
        <Button type='default' danger htmlType='submit' style={{marginRight:'2rem'}} loading={loading}>Cadastrar</Button> 
        <Button type='link' onClick={returnHome}>Voltar para home</Button>
      </Form>
    </div>
  )
}
