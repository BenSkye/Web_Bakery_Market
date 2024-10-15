import PayOS from "@payos/node";

const payos = new PayOS(
    process.env.PAYOS_CLIENT_ID ?? '',
    process.env.PAYOS_API_KEY ?? '',
    process.env.PAYOS_CHECKSUM_KEY ?? ''
);

export const createPaymentLink = async (orderId: number,
    amount: number,
    description: string) => {
    const requestData = {
        orderCode: orderId,
        amount: amount,
        description: description,
        cancelUrl: process.env.DOMAIN_URL + "/v1/api/payos/cancel-product-payment",
        returnUrl: process.env.DOMAIN_URL + "/v1/api/payos/return-product-payment"
    }
    const paymentLink = await payos.createPaymentLink(requestData);
    return paymentLink;
}

