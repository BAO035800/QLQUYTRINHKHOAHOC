-- SCRIPT CẬP NHẬT TRIGGER: CHỈ TẠO USER THƯỜNG
-- Chạy script này trong Supabase SQL Editor
-- 1. Xóa Trigger và Function cũ
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user_signup();
-- 2. Tạo Function mới: Chỉ gán vai trò cơ bản (nếu cần) hoặc không làm gì cả
CREATE OR REPLACE FUNCTION public.handle_new_user_signup() RETURNS trigger AS $$
DECLARE -- Khai báo biến nếu cần
    default_role_id BIGINT;
BEGIN -- Tùy chọn: Gán vai trò mặc định là 'SinhVien' hoặc 'User' (nếu có)
-- Nếu bạn muốn user mới là 'SinhVien' mặc định:
SELECT id INTO default_role_id
FROM public.roles
WHERE ten_vai_tro = 'SinhVien';
IF default_role_id IS NOT NULL THEN
INSERT INTO public.user_roles (user_id, role_id)
VALUES (NEW.id, default_role_id);
END IF;
-- KHÔNG tạo hồ sơ trong nckh_nha_khoa_hoc nữa
-- Việc này sẽ được thực hiện khi user đăng ký làm nhà khoa học trên giao diện
RETURN NEW;
EXCEPTION
WHEN OTHERS THEN RAISE WARNING 'Trigger Error: %',
SQLERRM;
RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
-- 3. Gắn lại Trigger
CREATE TRIGGER on_auth_user_created
AFTER
INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_signup();