import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Wallet, LogOut, CalendarCheck } from 'lucide-react';

const CustomerPortal = ({ user, logout }) => {
  const [courts, setCourts] = useState([]);
  const [balance, setBalance] = useState(user.accountBalance || 0);

  useEffect(() => {
    // Lấy danh sách sân từ Backend
    axios.get("https://kiemtra-fullstack.onrender.com/api/Courts")
      .then(res => setCourts(res.data))
      .catch(err => console.log("Lỗi tải sân bãi"));
  }, []);

  const handleBooking = async (court) => {
    // 1. Kiểm tra số dư 💰
    if (balance < court.pricePerHour) {
      alert("Số dư ví không đủ để đặt sân này! ❌");
      return;
    }

    const confirmBooking = window.confirm(
      `Bạn muốn đặt sân ${court.name} với giá ${court.pricePerHour.toLocaleString()}đ/giờ chứ?`
    );

    if (confirmBooking) {
      try {
        // 2. Trừ tiền trong ví (giả lập cập nhật lên Server)
        const newBalance = balance - court.pricePerHour;
        
        // Cập nhật số dư hội viên qua API
        await axios.put(`https://kiemtra-fullstack.onrender.com/api/Members/${user.id}`, {
          ...user,
          accountBalance: newBalance
        });

        // 3. Thông báo thành công 🎉
        setBalance(newBalance);
        alert(`Đặt sân thành công! Số dư còn lại: ${newBalance.toLocaleString()}đ ✅`);
      } catch (err) {
        alert("Lỗi hệ thống khi đặt sân! 🛠️");
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f9ff', padding: '20px' }}>
      {/* Header */}
      <header style={s.header}>
        <div style={s.logo}>🔹 PCM 030</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span>Chào, <strong>{user.fullName}</strong></span>
          <button onClick={logout} style={s.logoutBtn}><LogOut size={18}/> Thoát</button>
        </div>
      </header>

      {/* Wallet Card */}
      <div style={s.banner}>
        <h2 style={{ fontSize: '24px', marginBottom: '15px' }}>Chào mừng bạn đến với PCM 030 👋</h2>
        <div style={s.walletBox}>
          <Wallet size={20} color="#38bdf8" />
          <span>Số dư ví: <strong>{balance.toLocaleString()}đ</strong></span>
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
              <button 
                onClick={() => handleBooking(court)} 
                style={s.bookingBtn}
              >
                Đặt sân ngay
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const s = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 40px', backgroundColor: 'white', borderRadius: '15px', marginBottom: '30px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' },
  logo: { fontSize: '20px', fontWeight: 'bold', color: '#0284c7' },
  logoutBtn: { display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #ddd', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', background: 'none' },
  banner: { backgroundColor: '#0284c7', color: 'white', padding: '40px', borderRadius: '24px', marginBottom: '40px' },
  walletBox: { display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(255,255,255,0.1)', width: 'fit-content', padding: '10px 20px', borderRadius: '12px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '25px' },
  courtCard: { backgroundColor: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' },
  imagePlaceholder: { height: '150px', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' },
  bookingBtn: { width: '100%', padding: '12px', backgroundColor: '#0284c7', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }
};

export default CustomerPortal;