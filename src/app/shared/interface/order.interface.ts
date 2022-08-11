
export interface Details{
    productId: number;
    productName: string;
    quantity: number;
}

export interface Order{
    id: number;
    name: string;
    date: string;
    shippingAddress: string;
    city: string;
    isDelivery: boolean;
}

export interface detailsOrder{
    details: Details[];
    orderId: number;
}