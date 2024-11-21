import { baseError } from "./types"

export const INVALID_DATA:baseError = {
    errorCode:"INVALID_DATA",
    errorDescription:"Os dados fornecidos no corpo da requisição são inválidos",
    status:400
}

export const INVALID_DRIVER:baseError = {
    errorCode:"INVALID_DRIVER",
    errorDescription:"Motorista inválido",
    status:400
}

export const DRIVER_NOT_FOUND:baseError = {
    errorCode:"DRIVER_NOT_FOUND",
    errorDescription:"Motorista não encontrado",
    status:404
}

export const NO_RIDES_FOUND:baseError = {
    errorCode:"NO_RIDES_FOUND",
    errorDescription:"Nenhum registro encontrado",
    status:404
}

export const INVALID_DISTANCE:baseError = {
    errorCode:"INVALID_DISTANCE",
    errorDescription:"Quilometragem inválida para o motorista",
    status:406
}

