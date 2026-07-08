document.getElementById('calcForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const get = id => parseFloat(document.getElementById(id).value) || 0;
  const round2 = value => Math.round(value * 100) / 100;

  // Đối tượng 2.1: Điểm ĐGNL có hệ số Toán x 2, quy đổi thang 1500 về 100.
  const dgnl = get('dgnl');
  const toan = get('toan');
  const diemNangLuc = (dgnl + toan) / 15;

  // Điểm thi THPT: Toán x 2, chia tổng hệ số 4, quy đổi sang thang 100.
  const thptToan = get('thpt1');
  const thpt2 = get('thpt2');
  const thpt3 = get('thpt3');
  const diemTotNghiep = ((thptToan * 2 + thpt2 + thpt3) / 4) * 10;

  // Học bạ: trung bình 3 năm của tổ hợp, Toán x 2, quy đổi sang thang 100.
  const hocBaToan = [
    get('tb1_10'), get('tb1_11'), get('tb1_12')
  ];
  const hocBaMon2 = [
    get('tb2_10'), get('tb2_11'), get('tb2_12')
  ];
  const hocBaMon3 = [
    get('tb3_10'), get('tb3_11'), get('tb3_12')
  ];
  const tongHocBaCoHeSo = (
    hocBaToan.reduce((a, b) => a + b, 0) * 2 +
    hocBaMon2.reduce((a, b) => a + b, 0) +
    hocBaMon3.reduce((a, b) => a + b, 0)
  );
  const diemHocBa = (tongHocBaCoHeSo / 12) * 10;

  // Điểm học lực
  const diemHocLuc = diemNangLuc * 0.7 + diemTotNghiep * 0.2 + diemHocBa * 0.1;

  // Điểm cộng thành tích, tối đa 10 và không làm tổng vượt 100 trước ưu tiên.
  const diemThanhTich = get('diemThanhTich');
  let diemCong = Math.min(10, diemThanhTich);
  diemCong = diemHocLuc + diemCong < 100 ? diemCong : 100 - diemHocLuc;
  diemCong = Math.max(0, diemCong);

  // Điểm ưu tiên quy đổi từ thang 30 sang thang 100, tối đa 2.75 -> 9.17.
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
  diemUuTienFinal = round2(Math.max(0, diemUuTienFinal));

  // Tổng điểm xét tuyển
  const diemXetTuyen = diemHocLuc + diemCong + diemUuTienFinal;

  // Hiển thị kết quả
  const resultBox = document.getElementById('result');
  resultBox.innerHTML = `
    <p><strong>Điểm năng lực:</strong> ${diemNangLuc.toFixed(2)} / 100</p>
    <p><strong>Điểm TNTHPT quy đổi:</strong> ${diemTotNghiep.toFixed(2)} / 100</p>
    <p><strong>Điểm học THPT quy đổi:</strong> ${diemHocBa.toFixed(2)} / 100</p>
    <p><strong>Điểm học lực:</strong> ${diemHocLuc.toFixed(2)}</p>
    <p><strong>Điểm cộng:</strong> ${diemCong.toFixed(2)} (tối đa 10)</p>
    <p><strong>Điểm ưu tiên quy đổi:</strong> ${diemUuTienQuyDoi.toFixed(2)}</p>
    <p><strong>Điểm ưu tiên:</strong> ${diemUuTienFinal.toFixed(2)}</p>
    <hr/>
    <p class="result-total"><strong>Tổng điểm xét tuyển:</strong> ${diemXetTuyen.toFixed(2)}</p>
  `;
});
