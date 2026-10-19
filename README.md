# Bó hoa bất ngờ

Trang web tĩnh: bấm vào bó hoa để thả bóng bay và pháo giấy. Chỉ gồm HTML, CSS, JavaScript thuần, không cần cài thư viện hay build.

## Cấu trúc

- `index.html` - trang chính
- `style.css` - giao diện
- `script.js` - vẽ bó hoa (SVG), bóng bay, pháo giấy

## Chạy thử trên máy

Mở file `index.html` bằng trình duyệt.

## Đưa lên GitHub Pages

1. Tạo repository mới trên GitHub (chọn Public nếu dùng gói Free).
2. Đưa 4 file trong thư mục này lên repository, sao cho `index.html` nằm ở thư mục gốc.
   - Cách 1: trên GitHub bấm Add file, Upload files, kéo thả file vào, bấm Commit changes.
   - Cách 2: dùng lệnh:

```
git init
git add .
git commit -m "Bo hoa"
git branch -M main
git remote add origin https://github.com/TEN_TAI_KHOAN/TEN_REPO.git
git push -u origin main
```

3. Vào Settings của repository, chọn mục Pages.
4. Ở phần nguồn xuất bản (Source), chọn Deploy from a branch, chọn nhánh `main` và thư mục `/ (root)`, rồi bấm Save.
5. Chờ GitHub xây dựng xong (thường vài phút). Địa chỉ trang thường có dạng `https://TEN_TAI_KHOAN.github.io/TEN_REPO/`.

## Tùy chỉnh nhanh

- Màu hoa: sửa mảng `roses` trong `script.js` (mỗi dòng là x, y, kích thước, hue, độ bão hòa, độ sáng).
- Màu bóng bay và pháo giấy: sửa `BALLOON_COLORS` và `CONFETTI_COLORS`.
- Số lượng bóng bay: sửa số `18` trong hàm `launchBalloons(...)` ở cuối file.
