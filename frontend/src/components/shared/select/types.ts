export type SelectType = {
    onChange:(e:React.ChangeEvent<HTMLSelectElement>)=>void,
    drivers:DriverMini[]
}

type DriverMini = {
    id: number,
    name: string 
}