document.getElementById('calcForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const get = id => parseFloat(document.getElementById(id).value) || 0;

  // Điểm năng lực
  const dgnl = get('dgnl');
  const toan = get('toan');
  const diemNangLuc = (dgnl + toan) / 15;

  // Điểm thi THPT
  const thpt1 = get('thpt1');
  const thpt2 = get('thpt2');
  const thpt3 = get('thpt3');
  const diemTotNghiep = ((thpt1 + thpt2 + thpt3) / 3) * 10;

  // Học bạ: 9 ô
  const hocBa = [
    get('tb1_10'), get('tb1_11'), get('tb1_12'),
    get('tb2_10'), get('tb2_11'), get('tb2_12'),
    get('tb3_10'), get('tb3_11'), get('tb3_12')
  ];
  const diemHocBa = (hocBa.reduce((a, b) => a + b, 0) / 9) * 10;

  // Điểm học lực
  const diemHocLuc = diemNangLuc * 0.7 + diemTotNghiep * 0.2 + diemHocBa * 0.1;

  // Điểm cộng thành tích
  const diemThanhTich = get('diemThanhTich');
  let diemCong = diemHocLuc + diemThanhTich < 100 ? diemThanhTich : 100 - diemHocLuc;
  if (diemCong > 10) diemCong = 10;

  // Điểm ưu tiên quy đổi
  const diemUuTien = get('diemUuTien');
  const diemUuTienQuyDoi = (diemUuTien / 3) * 10;

  // Điểm ưu tiên chính thức
  let diemUuTienFinal = 0;
  const tongTruocUuTien = diemHocLuc + diemCong;
  if (tongTruocUuTien < 75) {
    diemUuTienFinal = diemUuTienQuyDoi;
  } else {
    diemUuTienFinal = ((100 - tongTruocUuTien) / 25) * diemUuTienQuyDoi;
  }
  diemUuTienFinal = Math.min(10, Math.max(0, diemUuTienFinal));
  diemUuTienFinal = Math.round(diemUuTienFinal * 100) / 100;

  // Tổng điểm xét tuyển
  const diemXetTuyen = diemHocLuc + diemCong + diemUuTienFinal;

  // Hiển thị kết quả
  const resultBox = document.getElementById('result');
  resultBox.innerHTML = `
    <p><strong>Điểm năng lực:</strong> ${diemNangLuc.toFixed(2)}</p>
    <p><strong>Điểm tốt nghiệp:</strong> ${diemTotNghiep.toFixed(2)}</p>
    <p><strong>Điểm học bạ:</strong> ${diemHocBa.toFixed(2)}</p>
    <p><strong>Điểm học lực:</strong> ${diemHocLuc.toFixed(2)}</p>
    <p><strong>Điểm cộng:</strong> ${diemCong.toFixed(2)} (tối đa 10)</p>
    <p><strong>Điểm ưu tiên quy đổi:</strong> ${diemUuTienQuyDoi.toFixed(2)}</p>
    <p><strong>Điểm ưu tiên:</strong> ${diemUuTienFinal.toFixed(2)}</p>
    <hr/>
    <p style="font-size: 1.3rem;"><strong>✅ Tổng điểm xét tuyển:</strong> ${diemXetTuyen.toFixed(2)}</p>
  `;
});
