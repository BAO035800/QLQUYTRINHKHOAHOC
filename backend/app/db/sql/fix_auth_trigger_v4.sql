-- SCRIPT SỬA LỖI TRIGGER (FINAL V4)
-- Chạy script này trong Supabase SQL Editor
-- 1. Xóa Trigger và Function cũ để tránh xung đột
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user_signup();
-- 2. Tạo lại Function với logic chuẩn xác
CREATE OR REPLACE FUNCTION public.handle_new_user_signup() RETURNS trigger AS $$
DECLARE scientist_role_id BIGINT;
full_name_raw TEXT;
first_name TEXT;
last_name TEXT;
BEGIN -- Lấy tên từ metadata (nếu có)
full_name_raw := COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email);
-- Tách họ tên đơn giản (nếu cần thiết cho bảng có cột ho, ten riêng)
-- Ở đây ta tạm thời lưu full_name vào cột 'ten' hoặc 'ho_ten' tùy db thực tế
-- Dựa trên file sql_taobang mới nhất: có cột 'ho' và 'ten'
-- 1. Xử lý Role 'NhaKhoaHoc'
SELECT id INTO scientist_role_id
FROM public.roles
WHERE ten_vai_tro = 'NhaKhoaHoc';
IF scientist_role_id IS NOT NULL THEN
INSERT INTO public.user_roles (user_id, role_id)
VALUES (NEW.id, scientist_role_id);
END IF;
-- 2. Tạo Profile
-- SỬA LỖI QUAN TRỌNG: Dùng 'created_at' thay vì 'creat_at'
-- Điền thêm thông tin 'ten' để tránh lỗi thiếu dữ liệu
INSERT INTO public.nckh_nha_khoa_hoc (
        user_id,
        email,
        created_at,
        -- <--- Đã sửa từ creat_at thành created_at
        chuyen_gia,
        ten,
        -- <--- Thêm cột tên
        ho -- <--- Thêm cột họ (tạm để trống hoặc lấy từ email)
    )
VALUES (
        NEW.id,
        NEW.email,
        NOW(),
        FALSE,
        full_name_raw,
        -- Lưu tạm full name vào tên
        '' -- Họ tạm để trống
    );
RETURN NEW;
EXCEPTION
WHEN OTHERS THEN -- QUAN TRỌNG: Bắt lỗi để không chặn người dùng đăng ký
-- Nếu trigger lỗi, user vẫn được tạo, ta có thể check log để sửa sau
RAISE WARNING 'Trigger Error: %',
SQLERRM;
RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
-- 3. Gắn lại Trigger
CREATE TRIGGER on_auth_user_created
AFTER
INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_signup();