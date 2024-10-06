import { model, Schema } from 'mongoose';

const DOCUMENT_NAME = 'CakeOption';
const COLLECTION_NAME = 'CakeOptions';
// Declare the Schema of the Mongo model

const FillingsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const FrostingSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    hex: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const DripSauceSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const DecorationSchema = new Schema({
    label: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const cakeOptionSchema = new Schema(
    {
        bakery_id: {
            type: Schema.Types.ObjectId,
            ref: 'Bakery',
            required: true,
        },
        basePrice: {
            type: Number,
            required: true,
        },
        cakeFillings: [{
            branch: {
                type: String,
                required: true,
            },
            fillings: [FillingsSchema],
        }
        ],
        cakeFrosting: [FrostingSchema],
        cakeDripSauce: [DripSauceSchema],
        cakeDecoration: [DecorationSchema],


    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);
//Export the model
const cakeOptionModel = model(DOCUMENT_NAME, cakeOptionSchema);
export { cakeOptionModel };



// const cakeFillings = [
//     {
//       branch: "Nhân Kem",
//       fillings: [
//         { name: "Kem Tươi Đánh Bông", description: "Kem nhẹ và mịn.", price: 50000 },
//         { name: "Kem Bơ", description: "Kem béo và ngọt từ bơ.", price: 60000 },
//         { name: "Kem Sữa Trứng", description: "Kem mịn và béo ngậy từ trứng và sữa.", price: 55000 },
//         { name: "Kem Chantilly", description: "Kem tươi ngọt có thêm vani.", price: 45000 }
//       ]
//     },
//     {
//       branch: "Nhân Phô Mai",
//       fillings: [
//         { name: "Phô Mai Kem", description: "Phô mai kem mềm và béo ngậy.", price: 50000 },
//         { name: "Mascarpone", description: "Phô mai Ý nhẹ, ngọt dịu.", price: 60000 },
//         { name: "Ricotta", description: "Phô mai mềm, béo nhẹ, thường kết hợp với hương chanh hoặc mật ong.", price: 55000 }
//       ]
//     },
//     {
//       branch: "Nhân Socola",
//       fillings: [
//         { name: "Ganache", description: "Hỗn hợp socola và kem tươi, rất mịn.", price: 50000 },
//         { name: "Chocolate Mousse", description: "Mousse socola, mịn và nhẹ.", price: 60000 },
//         { name: "Nutella", description: "Socola phết béo ngậy từ hạt dẻ.", price: 55000 }
//       ]
//     },
//     {
//       branch: "Nhân Custard",
//       fillings: [
//         { name: "Custard Vani", description: "Kem trứng vani mịn và béo.", price: 50000 },
//         { name: "Custard Socola", description: "Kem trứng socola mềm mịn.", price: 60000 },
//         { name: "Custard Trà Xanh", description: "Kem trứng vị matcha mịn.", price: 55000 }
//       ]
//     },
//     {
//       branch: "Nhân Trái Cây Tươi",
//       fillings: [
//         { name: "Dâu Tây", description: "Dâu tây tươi cắt lát.", price: 50000 },
//         { name: "Việt Quất", description: "Quả việt quất tươi nguyên.", price: 60000 },
//         { name: "Trái Cây Hỗn Hợp", description: "Hỗn hợp các loại trái cây tươi.", price: 55000 }
//       ]
//     },
//     {
//       branch: "Nhân Hạt",
//       fillings: [
//         { name: "Kem Hạnh Nhân", description: "Kem làm từ hạnh nhân nghiền nhỏ.", price: 50000 },
//         { name: "Kem Hạt Dẻ", description: "Kem mịn làm từ hạt dẻ.", price: 60000 },
//         { name: "Praline", description: "Hỗn hợp giòn từ caramel và hạt nghiền.", price: 55000 }
//       ]
//     },
//     {
//       branch: "Nhân Caramel",
//       fillings: [
//         { name: "Caramel Muối", description: "Caramel ngọt và mặn, có độ dẻo.", price: 50000 },
//         { name: "Dulce de Leche", description: "Caramel đặc trưng từ sữa, ngọt và mịn.", price: 60000 }
//       ]
//     },
//     {
//       branch: "Nhân Bơ Đậu Phộng",
//       fillings: [
//         { name: "Kem Bơ Đậu Phộng", description: "Kem béo ngậy từ bơ đậu phộng.", price: 50000 },
//         { name: "Mousse Bơ Đậu Phộng", description: "Mousse bơ đậu phộng, nhẹ và mịn.", price: 60000 }
//       ]
//     },
//     {
//       branch: "Nhân Dừa",
//       fillings: [
//         { name: "Kem Dừa", description: "Kem dừa ngọt và béo.", price: 50000 },
//         { name: "Dừa Nướng", description: "Dừa nướng giòn, thơm.", price: 60000 }
//       ]
//     },
//     {
//       branch: "Nhân Mứt",
//       fillings: [
//         { name: "Mứt Dâu", description: "Mứt từ dâu tây tươi ngọt.", price: 50000 },
//         { name: "Mứt Việt Quất", description: "Mứt từ quả việt quất.", price: 60000 },
//         { name: "Mứt Mơ", description: "Mứt mơ với hương vị thanh nhẹ.", price: 35000 },
//         { name: "Mứt Đào", description: "Mứt từ quả đào chín mọng.", price: 40000 },
//         { name: "Mứt Cam", description: "Mứt từ cam, hơi ngọt và chua nhẹ.", price: 75000 }
//       ]
//     }
//   ];

//   const frostingColors = [
//     { name: "Trắng", hex: "#FFFFFF", price: 50000 },
//     { name: "Hồng", hex: "#ffabba", price: 60000 },
//     { name: "Xanh Dương", hex: "#95d6eb", price: 55000 },
//     { name: "Vàng", hex: "#FFFF00", price: 50000 },
//     { name: "Đỏ", hex: "#ff5959", price: 50000 },
//     { name: "Xanh Lá Cây", hex: "#90EE90", price: 50000 },
//     { name: "Nâu", hex: "#a06f4c", price: 50000 },
//     { name: "Tím", hex: "#cc69cc", price: 50000 }
//   ];

//   const dripSauces = [
//     {
//       name: "Sốt Socola Đen",
//       color: "#3B2F2F",
//       description: "Làm từ socola đen, tạo ra lớp sốt chảy màu nâu đậm và hương vị đậm đà.",
//       price: 50000
//     },
//     {
//       name: "Sốt Socola Trắng",
//       color: "#F4F1EB",
//       description: "Làm từ socola trắng, tạo hiệu ứng chảy với màu trắng kem.", price: 70000
//     },
//     {
//       name: "Sốt Socola Sữa",
//       color: "#D2A679",
//       description: "Sốt từ socola sữa, có màu nâu nhạt và hương vị ngọt ngào.", price: 55000
//     },
//     {
//       name: "Sốt Caramel",
//       color: "#C68C53",
//       description: "Sốt caramel ngọt ngào, có màu vàng nâu sáng bóng.", price: 55000
//     },
//     {
//       name: "Sốt Dâu",
//       color: "#FF4B5C",
//       description: "Làm từ dâu tươi hoặc siro dâu, có màu đỏ hồng và hương vị trái cây.", price: 45000
//     },
//     {
//       name: "Sốt Việt Quất",
//       color: "#4B0082",
//       description: "Làm từ việt quất, tạo ra lớp sốt màu tím xanh đặc trưng.", price: 35000
//     },
//     {
//       name: "Sốt Chanh",
//       color: "#F9E79F",
//       description: "Làm từ chanh, có màu vàng nhạt tươi sáng và vị chua nhẹ.", price: 35000
//     },
//     {
//       name: "Sốt Cam",
//       color: "#FFA500",
//       description: "Sốt cam có màu cam tươi sáng, thích hợp cho bánh vị cam.", price: 25000
//     }
//   ];

//   const decorationOptions = [
//     { label: 'Thêm nến', value: 'candle', price: 10000 },
//     { label: 'Bánh Wafer', value: 'wafer', price: 60000 },
//     { label: 'Bánh Macaron', value: 'macaron', price: 55000 },
//     { label: 'Dâu Tây', value: 'strawberry', price: 45000 },
//     { label: 'Kem', value: 'cream', price: 35000 },
//     { label: 'Đào', value: 'cherry', price: 40000 },
//     { label: 'Socola', value: 'chocolate', price: 35000 },
//   ];