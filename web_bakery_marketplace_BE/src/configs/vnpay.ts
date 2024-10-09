const dev = {
    vnpay: {
        vnp_TmnCode: 'RWAIK77I',
        vnp_HashSecret: 'ONYPYRNWAW1Z9WL0KZDHYHJDJ4EY8RVB',
        vnp_Url: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
        vnp_ReturnUrl: 'https://3457-118-69-70-166.ngrok-free.app/v1/api/vnpay',
        vnp_OrderType: '180000'
    }
}

const pro = {

}

const config = { dev, pro } as { [key: string]: any };
const env = process.env.NODE_ENV || 'dev';
export default config[env];