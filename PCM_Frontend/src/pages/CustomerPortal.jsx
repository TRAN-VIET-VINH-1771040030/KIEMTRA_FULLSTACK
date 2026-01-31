import qrCode from '../assets/z7488156738888_06e8c22cae839a10f890b4167c5f4349.jpg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Wallet, LogOut } from 'lucide-react';

const CustomerPortal = ({ user, logout }) => {
  const [courts, setCourts] = useState([]);
  const [balance, setBalance] = useState(user.accountBalance || 0);
  const [showQR, setShowQR] = useState(false);
  const [isReadyToPay, setIsReadyToPay] = useState(false); // Trạng thái chuyển đổi giữa nhập tiền và quét mã
  const [depositAmount, setDepositAmount] = useState("");

  useEffect(() => {
    axios.get("https://kiemtra-fullstack.onrender.com/api/Courts")
      .then(res => setCourts(res.data))
      .catch(err => console.log("Lỗi tải sân bãi"));
  }, []);

  const handleBooking = async (court) => {
    if (balance < court.pricePerHour) {
      alert("Số dư ví không đủ để đặt sân này! ❌");
      return;
    }

    const confirmBooking = window.confirm(
      `Bạn muốn đặt sân ${court.name} với giá ${court.pricePerHour.toLocaleString()}đ/giờ chứ?`
    );

    if (confirmBooking) {
      try {
        const newBalance = balance - court.pricePerHour;
        await axios.put(`https://kiemtra-fullstack.onrender.com/api/Members/${user.id}`, {
          ...user,
          accountBalance: newBalance
        });
        setBalance(newBalance);
        alert(`Đặt sân thành công! Số dư còn lại: ${newBalance.toLocaleString()}đ ✅`);
      } catch (err) {
        alert("Lỗi hệ thống khi đặt sân! 🛠️");
      }
    }
  };

  const handleTopUp = () => {
    setDepositAmount(""); // Reset số tiền mỗi khi mở modal
    setIsReadyToPay(false); // Luôn bắt đầu từ bước nhập tiền
    setShowQR(true);
  };

  const handleConfirmPayment = async (amount) => {
    try {
      const deposit = Number(amount);
      const newBalance = balance + deposit;

      await axios.put(`https://kiemtra-fullstack.onrender.com/api/Members/${user.id}`, {
        ...user,
        accountBalance: newBalance
      });

      setBalance(newBalance);
      setShowQR(false);
      alert(`Xác nhận thành công! Số dư mới: ${newBalance.toLocaleString()}đ ✅`);
    } catch (err) {
      alert("Lỗi hệ thống khi xác nhận thanh toán! 🛠️");
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f9ff', padding: '20px' }}>
      {/* Header */}
      <header style={s.header}>
        <div style={s.logo}>🔹 PCM 030</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span>Chào, <strong>{user.fullName}</strong></span>
          <button onClick={logout} style={s.logoutBtn}><LogOut size={18} /> Thoát</button>
        </div>
      </header>

      {/* Wallet Card */}
      <div style={s.banner}>
        <h2 style={{ fontSize: '24px', marginBottom: '15px' }}>Chào mừng bạn đến với PCM 030 👋</h2>
        <div style={s.walletBox}>
          <Wallet size={20} color="#38bdf8" />
          <span>Số dư ví: <strong>{balance.toLocaleString()}đ</strong></span>
          <button onClick={handleTopUp} style={s.topUpBtn}>+ Nạp tiền</button>
        </div>
      </div>

      {/* Court List */}
      <div style={s.grid}>
        {courts.map(court => (
          <div key={court.id} style={s.courtCard}>
            <div style={s.imagePlaceholder}>🎾</div>
            <div style={{ padding: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>{court.name}</h3>
              <p style={{ color: '#64748b', margin: '10px 0' }}>Giá: {court.pricePerHour.toLocaleString()}đ/giờ</p>
              <button onClick={() => handleBooking(court)} style={s.bookingBtn}>Đặt sân ngay</button>
            </div>
          </div>
        ))}
      </div>

      {/* Hộp thoại nạp tiền 📲 */}
      {showQR && (
        <div style={s.modalOverlay}>
          <div style={s.modalContent}>
            {!isReadyToPay ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <h3>Nhập số tiền muốn nạp 💰</h3>
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="Ví dụ: 50000"
                  style={s.inputField}
                />
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                  <button
                    onClick={() => {
                      if (Number(depositAmount) >= 10000) setIsReadyToPay(true);
                      else alert("Vui lòng nạp tối thiểu 10.000đ");
                    }}
                    style={s.confirmBtn}
                  >
                    Tiếp tục
                  </button>
                  <button onClick={() => setShowQR(false)} style={s.cancelBtn}>Hủy</button>
                </div>
              </div>
            ) : (
              <div>
                <h3>Quét mã để nạp {Number(depositAmount).toLocaleString()}đ</h3>
                <p>Nội dung: <strong>NAPTIEN {user.id}</strong></p>
                <img src={qrCode} alt="QR Code" style={s.qrImg} />
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                  <button onClick={() => handleConfirmPayment(depositAmount)} style={s.confirmBtn}>Tôi đã chuyển tiền ✅</button>
                  <button onClick={() => setIsReadyToPay(false)} style={s.cancelBtn}>Quay lại</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const s = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 40px', backgroundColor: 'white', borderRadius: '15px', marginBottom: '30px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' },
  logo: { fontSize: '20px', fontWeight: 'bold', color: '#0284c7' },
  logoutBtn: { display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #ddd', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', background: 'none' },
  banner: { backgroundColor: '#0284c7', color: 'white', padding: '40px', borderRadius: '24px', marginBottom: '40px' },
  walletBox: { display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(255,255,255,0.1)', width: 'fit-content', padding: '10px 20px', borderRadius: '12px' },
  topUpBtn: { marginLeft: '15px', padding: '5px 12px', backgroundColor: '#22c55e', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '25px' },
  courtCard: { backgroundColor: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' },
  imagePlaceholder: { height: '150px', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' },
  bookingBtn: { width: '100%', padding: '12px', backgroundColor: '#0284c7', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modalContent: { backgroundColor: 'white', padding: '30px', borderRadius: '20px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', maxWidth: '400px' },
  inputField: { padding: '12px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '16px', textAlign: 'center' },
  qrImg: { width: '250px', height: 'auto', margin: '20px 0', borderRadius: '10px' },
  confirmBtn: { backgroundColor: '#22c55e', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' },
  cancelBtn: { backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer' },
};

export default CustomerPortal;