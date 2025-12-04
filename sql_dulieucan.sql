-- #############################################################
-- 1. DỮ LIỆU CẤU HÌNH TĨNH VÀ RBAC
-- #############################################################

-- BẢNG ROLES
INSERT INTO roles (ten_vai_tro, mo_ta) VALUES
('QuanTriHeThong', 'Quản lý tài khoản, phân quyền, cấu trúc tổ chức.'),
('CanBoQuanLy', 'Điều phối, phê duyệt đề xuất, chọn hội đồng, ký hợp đồng.'),
('NhaKhoaHoc', 'Gửi đề xuất, thực hiện đề tài, quản lý lý lịch khoa học.'),
('ChuyenGia', 'Tham gia đánh giá, thẩm định, nghiệm thu.'),
('SinhVien', 'Thành viên dự án, tác giả bài báo (ít quyền hạn).');


-- BẢNG PERMISSIONS
INSERT INTO permissions (permission_name, mo_ta) VALUES
('MANAGE_USER_ROLES', 'Quyền thêm/sửa/xóa vai trò người dùng (Chỉ Admin).'),
('VIEW_ALL_PROPOSALS', 'Quyền xem tất cả các đề xuất/đề tài trong hệ thống.'),
('CREATE_PROPOSAL', 'Quyền gửi đề xuất đề tài nghiên cứu khoa học.'),
('ASSIGN_COUNCIL', 'Quyền chọn và phân công hội đồng đánh giá/thẩm định.'),
('APPROVE_CONTRACT', 'Quyền phê duyệt và ký hợp đồng đề tài.'),
('VIEW_COUNCIL_RESULTS', 'Quyền xem kết quả đánh giá (điểm, nhận xét) của tất cả chuyên gia.');


-- BẢNG ROLE_PERMISSIONS (LIÊN KẾT RBAC)

-- Gán quyền cho Vai trò "QuanTriHeThong"
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.ten_vai_tro = 'QuanTriHeThong' AND p.permission_name IN ('MANAGE_USER_ROLES');

-- Gán quyền cho Vai trò "CanBoQuanLy"
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.ten_vai_tro = 'CanBoQuanLy' AND p.permission_name IN ('VIEW_ALL_PROPOSALS', 'ASSIGN_COUNCIL', 'APPROVE_CONTRACT', 'VIEW_COUNCIL_RESULTS');

-- Gán quyền cho Vai trò "NhaKhoaHoc"
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.ten_vai_tro = 'NhaKhoaHoc' AND p.permission_name IN ('CREATE_PROPOSAL');


-- #############################################################
-- 2. DỮ LIỆU CẤU HÌNH NGHIỆP VỤ (LOOKUP DATA)
-- #############################################################

-- BẢNG nckh_linh_vuc
INSERT INTO nckh_linh_vuc (ten_linh_vuc, mo_ta_linh_vuc, creat_at) VALUES
('Khoa học Máy tính', 'Nghiên cứu về thuật toán và hệ thống thông tin.', NOW()),
('Vật lý ứng dụng', 'Nghiên cứu vật liệu mới và ứng dụng năng lượng.', NOW());

-- BẢNG nckh_chuyen_mon
INSERT INTO nckh_chuyen_mon (ten_chuyen_mon, mo_ta, creat_at) VALUES
('AI/Machine Learning', 'Trí tuệ nhân tạo và học máy.', NOW()),
('Điện tử Viễn thông', 'Các hệ thống truyền tải và xử lý tín hiệu.', NOW());

-- BẢNG nckh_chu_de
INSERT INTO nckh_chu_de (ten_chu_de, mo_ta, creat_at) VALUES
('Xử lý ngôn ngữ tự nhiên', 'Phân tích và tổng hợp ngôn ngữ.', NOW());