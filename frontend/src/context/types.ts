import { Dispatch, SetStateAction } from "react";

export interface IChildren {
    children: React.ReactNode;
}

export interface SignedContext {
    signed:boolean;
    setSigned: Dispatch<SetStateAction<boolean>>;

}
