# 🍰 Web Bakery Marketplace

Web Bakery Marketplace là một nền tảng trực tuyến giúp người dùng tìm kiếm, đặt hàng và quản lý các sản phẩm bánh từ nhiều cửa hàng khác nhau.

## 🌟 Tính năng chính

- 🍰 **Quản lý cửa hàng**: Đăng ký, cập nhật thông tin cửa hàng và danh sách sản phẩm.
- 🛒 **Đặt hàng trực tuyến**: Người dùng có thể duyệt danh mục bánh và đặt hàng dễ dàng.
- 📈 **Thống kê & Báo cáo**: Cửa hàng có thể xem doanh thu, đơn hàng và các chỉ số quan trọng.
- 🎨 **Tự thiết kế bánh**: Công cụ cho phép khách hàng tạo kiểu bánh theo ý muốn.

## 👨‍👩‍👦 Công nghệ sử dụng

### Frontend (web\_bakery\_marketplace\_FE)

- 🤖 **React.js** (Vite)
- 🛠️ **Ant Design** (Giao diện người dùng)
- 🎨 **Three.js** (Tích hợp 3D)
- 🌏 **React Router** (Điều hướng)
- 📝 **Firebase** (Lưu trữ hình ảnh)

### Backend (web\_bakery\_marketplace\_BE)

- 💻 **Node.js** + Express.js
- 🌐 **MongoDB** (Cơ sở dữ liệu)
- ⚙️ **JWT** (Xác thực)
- 🛠️ **Mongoose** (ORM cho MongoDB)

## 🛠️ Cài đặt

### 1. Clone repository

```sh
git clone https://github.com/BenSkye/Web_Bakery_Market.git
cd Web_Bakery_Market
```

### 2. Cài đặt dependencies

#### Backend

```sh
cd web_bakery_marketplace_BE
npm install
```

#### Frontend

```sh
cd web_bakery_marketplace_FE
npm install
```

### 3. Cấu hình môi trường

Tạo file `.env` trong thư mục `web_bakery_marketplace_BE` và thêm thông tin:

```env
PORT=5000
DATABASE_URL=mongodb+srv://your-db-url
JWT_SECRET=your-secret-key
```

### 4. Chạy dự án

#### Chạy backend

```sh
cd web_bakery_marketplace_BE
npm run dev
```

#### Chạy frontend

```sh
cd web_bakery_marketplace_FE
npm run dev
```

## 🌟 Cấu trúc thư mục

```
web_bakery_marketplace/
├── web_bakery_marketplace_FE/   # Frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   └── ...
├── web_bakery_marketplace_BE/   # Backend
│   ├── src/
│   ├── dist/
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env
│   └── ...
└── README.md
```

## 🚀 Link Deploy

- **User Site**: [Web Bakery Marketplace](https://web-bakery-market.vercel.app/)
- **Admin Site**: [Web Bakery Marketplace Admin](https://web-bakery-market-admin.vercel.app/)
- **Manager Site**: [Web Bakery Marketplace Manager](https://web-bakery-market-manager.vercel.app/login)

## 👤 Đóng góp

Nếu bạn muốn đóng góp, vui lòng fork repository, tạo nhánh mới và gửi pull request!

## 👤 Liên hệ

- **Email:** [your.email@example.com](mailto\:nhatdm9a7@gmail.com)
- **GitHub:** [BenSkye](https://github.com/BenSkye)

---

Cảm ơn bạn đã quan tâm đến dự án! 🚀

