# Công cụ tính điểm xét tuyển BKU 2026

Dự án này là trang web tính điểm xét tuyển tổng hợp vào Trường Đại học Bách khoa - ĐHQG-HCM theo thông tin tuyển sinh năm 2026.

## Cấu trúc dự án

- `index.html`: giao diện nhập điểm và hiển thị kết quả.
- `styleBKU.css`: định dạng giao diện.
- `scriptBKU.js`: xử lý công thức tính điểm.

## Công thức đang áp dụng

Trang hiện hỗ trợ đối tượng thí sinh có kết quả thi Đánh giá Năng lực ĐHQG-HCM năm 2026.

```text
Điểm xét tuyển = Điểm học lực + Điểm cộng + Điểm ưu tiên
```

Trong đó:

```text
Điểm năng lực = (Tổng điểm ĐGNL + Điểm phần Toán trong ĐGNL) / 15

Điểm TNTHPT quy đổi = (Toán x 2 + Môn 2 + Môn 3) / 4 x 10

Điểm học THPT quy đổi = Trung bình điểm lớp 10, 11, 12 của tổ hợp, Toán x 2, quy đổi sang thang 100

Điểm học lực = Điểm năng lực x 70% + Điểm TNTHPT quy đổi x 20% + Điểm học THPT quy đổi x 10%
```

Điểm cộng thành tích tối đa 10 điểm và không làm tổng điểm trước ưu tiên vượt quá 100.

Điểm ưu tiên gốc theo khu vực, đối tượng được nhập theo thang điểm 30, tối đa 2.75 điểm, sau đó quy đổi:

```text
Điểm ưu tiên quy đổi = Điểm ưu tiên gốc / 3 x 10
```

Nếu `Điểm học lực + Điểm cộng < 75`, điểm ưu tiên được giữ nguyên sau quy đổi. Nếu từ 75 điểm trở lên:

```text
Điểm ưu tiên = (100 - Điểm học lực - Điểm cộng) / 25 x Điểm ưu tiên quy đổi
```

Kết quả điểm ưu tiên được làm tròn đến 0.01.

## Cách sử dụng

Mở `index.html` bằng trình duyệt, nhập đầy đủ các điểm bắt buộc và bấm nút `Tính điểm`.

Nếu triển khai bằng GitHub Pages, trang có thể chạy trực tiếp từ nhánh `main` vì dự án chỉ gồm HTML, CSS và JavaScript tĩnh.
