export interface IPayment {
    ID?: number;
    name?: string;
    username?: string;
    title?: string;
    price?: number;
    date?: Date | string;
    image?: string;
    isPayed?: boolean;
    action?: boolean;
}
