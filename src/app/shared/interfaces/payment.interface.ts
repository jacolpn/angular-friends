export interface Payment {
    id: string;
    user: string;
    title: string;
    date: Date;
    value: number;
    paid: boolean;
}
