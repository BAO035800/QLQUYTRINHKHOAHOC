# Hệ thống Quản lý Khoa học (Scientific Management System)

Đây là ứng dụng frontend cho hệ thống quản lý khoa học, được xây dựng bằng React, Vite và Tailwind CSS.

## 🚀 Tính năng chính

Hệ thống cung cấp các chức năng quản lý toàn diện cho quy trình nghiên cứu khoa học, hội thảo, bài báo và tài liệu.

### 1. Phân quyền người dùng (RBAC)
Hệ thống hỗ trợ 8 vai trò người dùng khác nhau với quyền hạn cụ thể:

| Vai trò | Tên đăng nhập | Mô tả & Quyền hạn chính |
|---------|---------------|-------------------------|
| **Quản trị viên** | `admin` | Quản lý toàn bộ hệ thống: người dùng, danh mục, xóa dữ liệu, cấu hình. |
| **Giảng viên** | `lecturer` | Đề xuất đề tài, quản lý bài báo cá nhân, đăng ký tham gia hội thảo. |
| **Cán bộ quản lý** | `staff` | Rà soát sơ bộ đề xuất, quản lý danh sách, phân công hội đồng, xem báo cáo. |
| **Lãnh đạo** | `leader` | Phê duyệt cuối cùng các đề xuất, xem báo cáo thống kê toàn trường. |
| **Chuyên gia** | `expert` | Chấm điểm, thẩm định các đề xuất được phân công. |
| **Kế toán** | `accountant` | Quản lý tài chính, theo dõi giải ngân, xem báo cáo tài chính. |
| **Ban tổ chức** | `organizer` | Quản lý sự kiện hội thảo, check-in đại biểu. |
| **Sinh viên/Người tham dự** | `attendee` | Đăng ký tham gia sự kiện, tải tài liệu công khai. |

*Mật khẩu mặc định cho tất cả tài khoản:* `123`

### 2. Các Phân hệ Chức năng

#### 📚 Quản lý Đề tài Nghiên cứu (`/projects`)
- **Quy trình:** Đề xuất -> Rà soát (Cán bộ) -> Thẩm định (Chuyên gia) -> Phê duyệt (Lãnh đạo).
- **Chức năng:** Thêm mới, sửa, xóa (Admin), phê duyệt, chấm điểm.

#### 📅 Quản lý Hội thảo (`/conferences`)
- **Quy trình:** Lên kế hoạch -> Chuẩn bị -> Diễn ra -> Hoàn thành.
- **Chức năng:** Tạo hội thảo, quản lý người tham dự, check-in.

#### 📝 Quản lý Bài báo Khoa học (`/publications`)
- **Chức năng:** Lưu trữ thông tin bài báo, phân loại (Journal/Conference), xếp hạng (Q1-Q4).
- **Quyền hạn:** Giảng viên quản lý bài báo của mình, Admin quản lý tất cả.

#### 📂 Quản lý Tài liệu (`/documents`)
- **Chức năng:** Kho lưu trữ tài liệu biểu mẫu, quy định, hướng dẫn.
- **Quyền hạn:** Admin/Cán bộ tải lên, mọi người có thể tải về.

#### 📊 Báo cáo & Thống kê (`/reports`)
- **Chức năng:** Xem thống kê số lượng đề tài, kinh phí, bài báo theo năm/đơn vị.

## 🛠 Cài đặt và Chạy ứng dụng

1.  **Cài đặt dependencies:**
    ```bash
    npm install
    ```

2.  **Chạy môi trường phát triển:**
    ```bash
    npm run dev
    ```

3.  **Xây dựng bản production:**
    ```bash
    npm run build
    ```

## 📂 Cấu trúc dự án

- `src/components`: Các thành phần UI tái sử dụng (Button, Input, Sidebar...).
- `src/pages`: Các trang chính của ứng dụng.
- `src/context`: Quản lý trạng thái toàn cục (AuthContext).
- `src/services`: Các service giả lập gọi API (sử dụng localStorage).
- `src/utils`: Các hàm tiện ích.

## 📝 Ghi chú
- Dữ liệu được lưu trữ cục bộ trên trình duyệt (LocalStorage). Để reset dữ liệu, sử dụng nút "Reset dữ liệu mẫu" trên các trang danh sách.
