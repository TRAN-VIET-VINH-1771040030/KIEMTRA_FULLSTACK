# 👤 TÁC GIẢ (AUTHOR)

- 🧑‍💻 **Họ và tên**: Trần Việt Vinh  
- 🏫 **Lớp**: KHMT 17-01  
- 🆔 **Mã sinh viên**: 030  
- 📧 **Vai trò**: Fullstack Developer & System Architect  

---

# 🏆 HỆ THỐNG QUẢN LÝ CLB PICKLEBALL "PCM"

<p align="center">
  <img src="https://img.shields.io/badge/Status-90%25%20Complete-green?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/Architecture-Clean%20Architecture-blue?style=for-the-badge" alt="Architecture">
  <img src="https://img.shields.io/badge/Tech-.NET%208%20|%20ReactJS-orange?style=for-the-badge" alt="Tech">
</p>

---

## 🎯 TỔNG QUAN

**PCM (Pickleball Club Management)** là giải pháp quản trị toàn diện dành cho các câu lạc bộ thể thao hiện đại.  
Hệ thống giải quyết hiệu quả các bài toán về **quản lý hội viên**, **điều phối sân bãi**, **tổ chức giải đấu** và **tối ưu hóa doanh thu**.

### ✨ Tính năng cốt lõi
- 🏛️ **Clean Architecture**: Phân tách rõ ràng giữa Core Business, API và Data.
- 💳 **E-Wallet System**: Nạp tiền QR, thanh toán tự động.
- 📅 **Smart Booking**: Quản lý lịch sân theo thời gian thực.
- 🏆 **Tournament Management**: Tổ chức và theo dõi giải đấu chuyên nghiệp.

---

## 🏛️ KIẾN TRÚC HỆ THỐNG (CLEAN ARCHITECTURE)

Hệ thống PCM được xây dựng theo **Clean Architecture**, đảm bảo dễ bảo trì, mở rộng và tái sử dụng.

### 🎨 Presentation Layer (Frontend)
- ⚛️ **ReactJS + Vite**
- Chức năng:
  - Hiển thị giao diện người dùng
  - Gửi request RESTful API
  - Quản lý state & trải nghiệm người dùng

### ⚙️ API & Application Layer (Backend)
- 🧠 **ASP.NET Core 8**
- Bao gồm:
  - Controllers
  - Services xử lý nghiệp vụ
- Đảm nhiệm:
  - Xử lý logic
  - Phân quyền & bảo mật
  - Trả dữ liệu JSON

### 🗄️ Data & Domain Layer
- 💾 **SQL Server + Entity Framework Core**
- Đảm nhiệm:
  - Lưu trữ dữ liệu
  - Đảm bảo toàn vẹn & nhất quán dữ liệu

---

## 🔄 LUỒNG XỬ LÝ DỮ LIỆU (DATA FLOW)

Ví dụ luồng **đặt sân** trong hệ thống:

```text
React UI
↓
HTTP Request (POST /api/bookings)
↓
BookingsController
↓
BookingService
↓
ApplicationDbContext
↓
SQL Server
## ✨ TÍNH NĂNG NỔI BẬT (KEY FEATURES)

Hệ thống **PCM** hướng tới **tự động hóa tối đa** và **minh bạch hóa toàn bộ quy trình vận hành CLB**.

---

### 📊 1. Dashboard Quản trị Thông minh
- Thống kê thời gian thực: hội viên, sân bãi, giải đấu
- Giám sát trạng thái hoạt động của API Backend

---

### 💳 2. Hệ thống Ví & Giao dịch (E-Wallet)
- Nạp tiền qua QR Code
- Thanh toán tự động khi đặt sân
- Quản lý lịch sử giao dịch chi tiết

---

### 📅 3. Điều phối Sân bãi Thông minh
- Quản lý giá thuê & trạng thái sân
- Ngăn chặn đặt trùng lịch theo khung giờ

---

### 🏆 4. Quản lý Giải đấu
- Hỗ trợ nhiều hình thức thi đấu
- Theo dõi kết quả và tiến độ giải đấu

---

### 🔐 5. Bảo mật & Phân quyền
- Xác thực JWT
- Phân quyền Role-based (Admin / Member)

---

## 🛠️ CHI TIẾT KỸ THUẬT (TECHNICAL SPECIFICATIONS)

### 💻 Công nghệ sử dụng
- **Frontend**: ReactJS (Vite)
- **Backend**: ASP.NET Core 8 Web API
- **Database**: SQL Server + Entity Framework Core (Code First)
- **Authentication**: JWT

---

### 🏛️ Kiến trúc hệ thống
- **Presentation**: Controllers & UI
- **Domain**: Entities, Enums
- **Infrastructure**: Database, Docker

---

### 🐳 Triển khai & Vận hành
- Docker Containerization
- Sẵn sàng CI/CD với Render

---

## 📂 CẤU TRÚC FILE (PROJECT STRUCTURE)

### ⚙️ PCM_Backend (ASP.NET Core API)

```text
PCM_Backend/
├── Controllers/
├── Services/
├── Models/
│   ├── Entities/
│   └── Enums/
├── Data/
├── DTOs/
├── Migrations/
├── Program.cs
├── appsettings.json
└── Dockerfile



PCM_Frontend (ReactJS)
PCM_Frontend/
├── src/
│   ├── pages/
│   ├── components/
│   ├── api/
│   ├── assets/
│   └── App.jsx
├── public/
├── package.json
└── vite.config.js


🚀 TRIỂN KHAI TRÊN RENDER (DEPLOYMENT)
Hệ thống được thiết kế để triển khai dễ dàng trên Render thông qua kết nối trực tiếp với GitHub Repository.

🏗️ 1. Chuẩn bị Cơ sở dữ liệu (Database)
Khởi tạo một dịch vụ PostgreSQL trên Render (Hệ thống có thể tự động chuyển đổi từ SQL Server sang PostgreSQL thông qua cấu hình DB Provider).

Lưu lại Internal Database URL để cấu hình cho Backend.

⚙️ 2. Triển khai Backend (Web Service)
Runtime: Chọn Docker (Render sẽ tự động đọc tệp Dockerfile trong thư mục PCM_Backend).

Biến môi trường (Environment Variables): Cần cấu hình các khóa quan trọng:

ConnectionStrings__DefaultConnection: URL của Database vừa tạo.

JWT__SecretKey: Khóa bảo mật để mã hóa Token.

⚛️ 3. Triển khai Frontend (Static Site)
Build Command: npm install && npm run build

Publish Directory: dist

Environment Variable: Cấu hình VITE_API_URL trỏ về địa chỉ Web Service của Backend.


❤️ LỜI CẢM ƠN (ACKNOWLEDGMENTS)
Dự án PCM Admin được hoàn thiện nhờ sự hỗ trợ từ các nguồn tài liệu mở và cộng đồng công nghệ. Tôi xin chân thành cảm ơn:

🌟 Cộng đồng .NET & React: Vì những thư viện tuyệt vời và tài liệu hướng dẫn chi tiết giúp tối ưu hóa quá trình phát triển.

🛠️ Các công cụ hỗ trợ: Cảm ơn Render đã hỗ trợ môi trường triển khai (Deployment) ổn định và Docker giúp đóng gói ứng dụng chuyên nghiệp.

📚 Giảng viên & Bạn bè: Những người đã đóng góp ý kiến quý báu để hoàn thiện các tính năng cốt lõi của hệ thống.

🙌 Người dùng: Cảm ơn bạn đã quan tâm và trải nghiệm dự án này. Mọi đóng góp (Issue/Pull Request) luôn được chào đón để hệ thống ngày càng hoàn thiện hơn.
