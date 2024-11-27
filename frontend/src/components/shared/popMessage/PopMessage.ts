import { message } from 'antd';


export const notifySuccess = (msg : string) => {
    message.success(msg, 3);
}

export const notifyError = (error : string) =>{
    message.error(error, 2)
}