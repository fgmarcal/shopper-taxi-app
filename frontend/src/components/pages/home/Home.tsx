import { Button, Form, FormProps, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { Customer } from '../../../entity/customer/createCustomer';
import { notifyError } from '../../shared/popMessage/PopMessage';
import { CustomerRepository } from '../../../repository/customer/CustomerRepository';
import { useNavigate } from 'react-router';

const customerRepository = new CustomerRepository();

export const Home:React.FC = () => {

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [customer, setCustomer] = useState<Customer>();

  const navigate = useNavigate();

  const clearForm =()=>{
    form.resetFields()
  }


  const onFinish:FormProps['onFinish']  = async({email}) =>{
    setLoading(true);
    if(!email){
      notifyError("Dados inválidos");
      clearForm();
      return;
    }
    try {
      const find = await customerRepository.get(email);
      if(find){
        sessionStorage.setItem('userEmail',(find.email));
        sessionStorage.setItem('userName',(find.name));
        setCustomer(find);
      }
    } catch (error) {
      console.error(error);
      notifyError("Erro! Você possui cadastro?");
      setLoading(false);
    } 
  }

  const register = () =>{
    navigate('/register')
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
  },[customer, navigate])

  return (
    <div style={{
      display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center', margin:'1rem auto'
    }}>
      <h1 style={{fontWeight:900, fontSize:'8rem'}}>Taxi App!</h1>
      <h2>Insira seu e-mail cadastrado para iniciar uma viagem!</h2>
      <Form
        form={form}
        onFinish={onFinish}
        style={{marginTop:'2rem'}}
        layout='vertical'
        initialValues={{remember:false}}
        autoComplete='off'
        clearOnDestroy={true}
      >
        <label style={{color:'#FFF'}}>E-mail</label>
        <Form.Item name={['email']}
            rules={[{ required: true, message:"E-mail é um campo obrigatório" },{pattern:emailPattern, message:"e-mail inválido"}]}>
          <Input style={{fontWeight:'bold', width:'15rem'}}/>
        </Form.Item>
        <Button type='primary' htmlType='submit' style={{marginRight:'4rem'}} loading={loading}>Entrar</Button> 
        <Button type='primary' danger onClick={register} loading={loading}>Registre-se!</Button>
      </Form>
    </div>
  )
}
