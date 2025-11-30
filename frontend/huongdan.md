# Hướng Dẫn Sử Dụng Hệ Thống Quản Lý Khoa Học (Demo)

Tài liệu này cung cấp thông tin về các tài khoản demo và hướng dẫn kiểm thử các luồng nghiệp vụ chính trên giao diện Frontend.

## 1. Danh Sách Tài Khoản Demo
Mật khẩu chung cho tất cả tài khoản: `123`

| Vai trò | Username | Tên hiển thị | Quyền hạn chính |
|---|---|---|---|
| **Quản trị hệ thống** | `admin` | Nguyễn Quản Trị | Quản lý user, phân quyền, cấu hình hệ thống. |
| **Giáo viên** | `teacher` | TS. Trần Giáo Viên | Đề xuất dự án/hội thảo, quản lý hồ sơ cá nhân. |
| **Cán bộ QLKH** | `staff` | Lê Cán Bộ | Thẩm định sơ bộ, quản lý danh sách, báo cáo. |
| **Lãnh đạo** | `leader` | PGS.TS Phạm Lãnh Đạo | Phê duyệt cuối cùng các đề xuất. |
| **Chuyên gia** | `expert` | GS. Vũ Chuyên Gia | Đánh giá, chấm điểm đề tài/dự án. |
| **Kế toán** | `accountant` | Đỗ Kế Toán | Quản lý kinh phí, thanh toán. |
| **Người tham dự** | `attendee` | Hoàng Sinh Viên | Đăng ký hội thảo, điểm danh QR. |

---

## 2. Hướng Dẫn Kiểm Thử Các Luồng Nghiệp Vụ

### Luồng 1: Quy trình Đề xuất & Phê duyệt Dự án NCKH

1.  **Bước 1: Gửi đề xuất (Giáo viên)**
    *   Đăng nhập: `teacher` / `123`
    *   Vào menu **Dự án NCKH** -> Chọn **Tạo đề xuất mới**.
    *   Điền form và gửi. Trạng thái: *Chờ thẩm định*.

2.  **Bước 2: Thẩm định sơ bộ (Cán bộ)**
    *   Đăng nhập: `staff` / `123`
    *   Vào menu **Dự án NCKH**. Thấy đề xuất mới.
    *   Xem chi tiết -> Bấm **Kiểm tra Hợp lệ**. Trạng thái: *Chờ Lãnh đạo duyệt*.

3.  **Bước 3: Phê duyệt (Lãnh đạo)**
    *   Đăng nhập: `leader` / `123`
    *   Vào menu **Dự án NCKH**.
    *   Xem chi tiết -> Bấm **Phê duyệt**. Trạng thái: *Đã phê duyệt*.

4.  **Bước 4: Đánh giá (Chuyên gia)**
    *   Đăng nhập: `expert` / `123`
    *   Vào menu **Dự án NCKH** (chỉ thấy dự án được phân công).
    *   Vào tab **Đánh giá** -> Nhập điểm và nhận xét.

### Luồng 2: Quy trình Tổ chức & Điểm danh Hội thảo

1.  **Bước 1: Tạo hội thảo (Giáo viên)**
    *   Đăng nhập: `teacher` / `123`
    *   Vào menu **Hội thảo** -> **Đề xuất hội thảo**.

2.  **Bước 2: Quản lý khách mời (Ban tổ chức/Cán bộ)**
    *   Đăng nhập: `staff` / `123`
    *   Vào chi tiết hội thảo -> Tab **Khách mời**.
    *   Thử chức năng **Import Excel** (giả lập).

3.  **Bước 3: Điểm danh (Người tham dự)**
    *   Đăng nhập: `attendee` / `123`
    *   Vào menu **Hội thảo** -> Xem mã QR cá nhân.
    *   (Giả lập quét QR trên thiết bị di động).

---

## 3. Lưu ý
*   Đây là phiên bản Frontend Demo sử dụng dữ liệu giả lập (Mock Data).
*   Mọi thay đổi dữ liệu (Thêm/Sửa/Xóa) chỉ lưu tạm thời trên trình duyệt (RAM), sẽ mất khi tải lại trang (F5).
*   Hệ thống Backend và Database thực tế sẽ được tích hợp trong giai đoạn sau.
