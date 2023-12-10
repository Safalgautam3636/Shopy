type paymentRequest = {
    amount: number,
    currency: 'usd',
    metadata: {
        orderId: string,
        orderDate: string,
        username:string
    },
}
export default paymentRequest;