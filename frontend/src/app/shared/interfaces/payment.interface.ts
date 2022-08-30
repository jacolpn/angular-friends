export interface IPayment {
    id: number;
    name: string;
    username: string;
    title: string;
    value: number | any;
    date: Date | string;
    image: string;
    isPayed: boolean;
    action: boolean;
}
