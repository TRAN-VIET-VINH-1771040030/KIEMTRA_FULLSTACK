import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { Users, Landmark, Activity, Trophy, LogOut, LayoutDashboard, Star } from 'lucide-react';

const API_BASE = "http://localhost:5233/api";

// ==========================================
// 1. TRANG ĐĂNG NHẬP
// ==========================================
const LoginPage = ({ setUser, type }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (type === 'admin' && username === 'admin' && password === 'admin') {
      const data = { role: 'admin', name: 'Quản trị viên' };
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data); 
      navigate('/');
    } else if (type === 'customer' && username === 'khachhang' && password === 'khachhang') {
      const data = { role: 'customer', name: 'Nguyễn Văn Khách' };
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data); 
      navigate('/customer');
    } else {
      alert("Sai tên đăng nhập hoặc mật khẩu!");
    }
  };

  return (
    <div style={type === 'admin' ? s.loginAdminBg : s.loginCustomerBg}>
      <div style={s.loginBox}>
        <div style={{textAlign: 'center', marginBottom: '20px'}}>
            <Activity size={40} color={type === 'admin' ? '#0f172a' : '#0284c7'}/>
            <h2 style={{marginTop: '10px'}}>{type === 'admin' ? 'HỆ THỐNG ADMIN' : 'PCM 030 ĐĂNG NHẬP'}</h2>
        </div>
        <form onSubmit={handleLogin} style={s.form}>
          <input style={s.input} placeholder="Tên đăng nhập" onChange={e => setUsername(e.target.value)} required />
          <input style={s.input} type="password" placeholder="Mật khẩu" onChange={e => setPassword(e.target.value)} required />
          <button style={type === 'admin' ? s.btnAdmin : s.btnCustomer} type="submit">Đăng nhập</button>
        </form>
        <div style={{marginTop: '20px', textAlign: 'center'}}>
            <Link to={type === 'admin' ? '/customer-login' : '/admin-login'} style={{fontSize: '13px', color: '#64748b'}}>
                Bạn là {type === 'admin' ? 'Khách hàng?' : 'Quản trị viên?'} Đăng nhập tại đây.
            </Link>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. CÁC COMPONENT HIỂN THỊ DỮ LIỆU ADMIN
// ==========================================

// --- QUẢN LÝ HỘI VIÊN ---
const AdminMembers = () => {
  const [members, setMembers] = useState([]);
  useEffect(() => {
    axios.get(`${API_BASE}/Members`).then(res => setMembers(res.data)).catch(() => alert("Lỗi tải hội viên!"));
  }, []);

  return (
    <div style={s.panel}>
      <h2>Quản lý hội viên</h2>
      <table style={s.table}>
        <thead><tr><th>Tên</th><th>Email</th><th>SĐT</th><th>Ví</th></tr></thead>
        <tbody>
          {members.map((m, i) => (
            <tr key={i}><td>{m.fullName}</td><td>{m.email}</td><td>{m.phoneNumber}</td><td>{m.balance?.toLocaleString()}đ</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// --- QUẢN LÝ SÂN BÃI ---
const AdminCourts = () => {
  const [courts, setCourts] = useState([]);
  useEffect(() => {
    axios.get(`${API_BASE}/Courts`).then(res => setCourts(res.data)).catch(() => {});
  }, []);

  return (
    <div style={s.panel}>
      <h2>Quản lý sân bãi</h2>
      <table style={s.table}>
        <thead><tr><th>ID</th><th>Tên Sân</th><th>Trạng thái</th><th>Giá</th></tr></thead>
        <tbody>
          {courts.map((c, i) => (
            <tr key={i}><td>{c.id}</td><td>{c.courtName || c.name}</td><td>{c.status}</td><td>{c.pricePerHour}đ</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// --- QUẢN LÝ GIẢI ĐẤU ---
const AdminTournaments = () => {
  const [tours, setTours] = useState([]);
  useEffect(() => {
    axios.get(`${API_BASE}/Tournaments`).then(res => setTours(res.data)).catch(() => {});
  }, []);

  return (
    <div style={s.panel}>
      <h2>Danh sách giải đấu</h2>
      <table style={s.table}>
        <thead><tr><th>Tên giải</th><th>Ngày bắt đầu</th><th>Phần thưởng</th></tr></thead>
        <tbody>
          {tours.map((t, i) => (
            <tr key={i}><td>{t.name}</td><td>{t.startDate}</td><td>{t.prize}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ==========================================
// 3. TRANG DÀNH CHO KHÁCH HÀNG
// ==========================================
const CustomerPortal = ({ user, logout }) => {
  const [courts, setCourts] = useState([]);
  useEffect(() => {
    axios.get(`${API_BASE}/Courts`).then(res => setCourts(res.data)).catch(() => {});
  }, []);

  const handleBooking = async (courtId, courtName) => {
    try {
      await axios.post(`${API_BASE}/Bookings`, {
        CourtId: courtId,
        CourtName: courtName,
        MemberName: user.name,
        BookingDate: new Date().toISOString()
      });
      alert("Đặt sân thành công!");
    } catch (err) { alert("Lỗi đặt sân!"); }
  };

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#f8fafc'}}>
      <nav style={s.custNav}>
        <div style={{display:'flex', alignItems:'center', gap: '10px'}}><Activity color="#0284c7"/> <b>PCM 030</b></div>
        <div style={{display:'flex', alignItems:'center', gap: '20px'}}>
            <span>Chào, <b>{user.name}</b></span>
            <button onClick={logout} style={s.logoutBtn}><LogOut size={16}/> Thoát</button>
        </div>
      </nav>
      <div style={{padding: '40px 60px'}}>
        <div style={s.custHero}>
            <h1>Chào mừng bạn trở lại!</h1>
            <p>Số dư ví hiện tại: <b style={{fontSize: '24px'}}>2.500.000đ</b></p>
        </div>
        <div style={s.courtGrid}>
          {courts.map(c => (
            <div key={c.id} style={s.custCourtCard}>
              <div style={s.courtImgPlaceholder}></div>
              <div style={{padding: '15px'}}>
                <b style={{fontSize: '18px'}}>{c.courtName || c.name}</b>
                <p style={{fontSize: '13px', color: '#64748b'}}>Trạng thái: {c.status}</p>
                <button style={s.btnBook} onClick={() => handleBooking(c.id, c.courtName || c.name)}>Đặt sân ngay</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. CẤU TRÚC ĐIỀU HƯỚNG CHÍNH (APP)
// ==========================================
export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const logout = () => { localStorage.removeItem('user'); setUser(null); };

  return (
    <Router>
      <Routes>
        <Route path="/admin-login" element={<LoginPage setUser={setUser} type="admin" />} />
        <Route path="/customer-login" element={<LoginPage setUser={setUser} type="customer" />} />
        <Route path="/customer" element={user?.role === 'customer' ? <CustomerPortal user={user} logout={logout} /> : <Navigate to="/customer-login" />} />
        <Route path="/*" element={
          user?.role === 'admin' ? (
            <div style={{display: 'flex', minHeight: '100vh'}}>
              <aside style={s.adminSidebar}>
                <h2 style={{color: '#38bdf8', textAlign:'center', marginBottom: '40px'}}>PCM ADMIN</h2>
                <nav style={{display:'flex', flexDirection:'column', gap: '10px'}}>
                    <Link to="/" style={s.adminLink}><LayoutDashboard size={18}/> Dashboard</Link>
                    <Link to="/members" style={s.adminLink}><Users size={18}/> Hội viên</Link>
                    <Link to="/courts" style={s.adminLink}><Landmark size={18}/> Quản lý sân</Link>
                    <Link to="/tournaments" style={s.adminLink}><Trophy size={18}/> Giải đấu</Link>
                    <button onClick={logout} style={s.adminLogout}><LogOut size={18}/> Đăng xuất</button>
                </nav>
              </aside>
              <main style={{flex: 1, padding: '40px', backgroundColor: '#f1f5f9'}}>
                <Routes>
                  <Route path="/" element={<div style={s.panel}><h2>Dashboard</h2><p>Thống kê nhanh.</p></div>} />
                  <Route path="/members" element={<AdminMembers />} />
                  <Route path="/courts" element={<AdminCourts />} />
                  <Route path="/tournaments" element={<AdminTournaments />} />
                </Routes>
              </main>
            </div>
          ) : <Navigate to="/admin-login" />
        } />
      </Routes>
    </Router>
  );
}

const s = {
  // Giữ nguyên Styles cũ của bạn và thêm style cho table
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '20px' },
  loginAdminBg: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f172a' },
  loginCustomerBg: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f9ff' },
  loginBox: { width: '380px', padding: '40px', backgroundColor: 'white', borderRadius: '24px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: { padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0' },
  btnAdmin: { padding: '12px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer' },
  btnCustomer: { padding: '12px', backgroundColor: '#0284c7', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer' },
  custNav: { padding: '15px 60px', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  custHero: { background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', padding: '40px', borderRadius: '24px', color: 'white', marginBottom: '30px' },
  courtGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' },
  custCourtCard: { backgroundColor: 'white', borderRadius: '15px', overflow: 'hidden' },
  courtImgPlaceholder: { height: '140px', backgroundColor: '#e2e8f0' },
  btnBook: { width: '100%', padding: '10px', marginTop: '10px', backgroundColor: '#0284c7', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer' },
  adminSidebar: { width: '260px', backgroundColor: '#0f172a', padding: '30px 20px', color: 'white' },
  adminLink: { color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px' },
  adminLogout: { background: 'none', border: 'none', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', cursor: 'pointer' },
  panel: { backgroundColor: 'white', padding: '25px', borderRadius: '20px' },
  td: { padding: '10px', borderBottom: '1px solid #eee' },
  th: { textAlign: 'left', padding: '10px', borderBottom: '2px solid #eee' },
  logoutBtn: { padding: '6px 15px', border: '1px solid #e2e8f0', background: 'none', borderRadius: '10px', cursor: 'pointer' }
};