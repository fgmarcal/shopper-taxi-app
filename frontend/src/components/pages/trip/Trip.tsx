import { Button, Form, FormProps, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { estimateRide } from '../../../entity/ride/estimateRide';
import { TripRequest } from './types';
import { notifyError } from '../../shared/popMessage/PopMessage';
import { GoogleMap } from '../../shared/map/Map';


export const Trip:React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [estimate, setEstimate] = useState<estimateRide>({} as estimateRide);
  const [loadMap, setLoadMap] = useState<boolean>(false);

  const[form] = Form.useForm();

  const customerName = sessionStorage.getItem('userName')?.split(" ")[0];
  const customerEmail = sessionStorage.getItem('userEmail');

  const onFinish:FormProps['onFinish'] = async (trip:TripRequest) =>{
    if(trip.destination === trip.origin){
      notifyError("Você quer ir para o mesmo lugar?")
      return;
    }
    setLoading(true);
    if(trip && customerEmail){
      const estimateRide:estimateRide = {
        email:customerEmail,
        destination:trip.destination,
        origin:trip.origin  
      }
      try {
        setEstimate(estimateRide);
        setLoadMap(true);
        setLoading(false);


      } catch (error) {
        console.error(error)
        setLoading(false);
        notifyError("Algo errado com a sua viagem");  
      }

    }
          
    }

    useEffect(()=>{
      if(!loadMap) return;
    },[loadMap])

  return (

    <>
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', margin:'1rem auto'}}>
      <h1 style={{fontWeight:900, fontSize:'8rem'}}>{`Para onde vamos hoje, ${customerName}?`}</h1>
    </div>

    <div style={{display:'flex', alignItems:'center', justifyContent:'center', margin:'1rem auto'}}>
        <Form
        form={form}
        onFinish={onFinish}
        style={{marginTop:'2rem'}}
        layout='vertical'
        initialValues={{remember:false}}
        autoComplete='off'
        clearOnDestroy={true}
      >
        <label style={{color:'#FFF', fontSize:'1.3rem', fontWeight:'bold'}}>Origem!</label>
        <Form.Item name={['origin']}
            rules={[{ required: true, message:"Insira a sua origem" }]}>
          <Input style={{fontWeight:'bold', width:'20rem'}} placeholder='Rua do Tal, 999, Cidade, Estado'/>
        </Form.Item>

        <label style={{color:'#FFF', fontSize:'1.3rem', fontWeight:'bold'}}>Destino!</label>
        <Form.Item name={['destination']}
            rules={[{ required: true, message:"Insira o seu destino" }]}>
          <Input style={{fontWeight:'bold', width:'20rem'}} placeholder='Rua do Fulano, 888, Cidade, Estado'/>
        </Form.Item>
        <Button type='primary' htmlType='submit' style={{margin:'4rem', fontSize:'1rem', fontWeight:900}} loading={loading}>Calcule minha viagem!</Button> 
      </Form>
    </div>
    <div style={{display:'flex', alignItems:"center", justifyContent:'center', marginBottom:'3rem'}}>
      {loadMap? 
      <GoogleMap 
        key={'map'} 
        origin={estimate.origin} 
        destination={estimate.destination} 
        email={estimate.email}/> : null}
    </div>
    </>
  )
}
