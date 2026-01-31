import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Users, Landmark, Trophy, LogOut, LayoutDashboard } from 'lucide-react';

// Import các trang từ thư mục pages
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import AdminMembers from './pages/AdminMembers';
import AdminCourts from './pages/AdminCourts';
import AdminTournaments from './pages/AdminTournaments';
import CustomerPortal from './pages/CustomerPortal';

export default function App() {
  // 1. Khởi tạo trạng thái người dùng từ localStorage 🧠
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // 2. Hàm xử lý đăng xuất 🚪
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        {/* 3. Điều hướng mặc định: Luôn ưu tiên Admin Login nếu chưa có user 🧭 */}
        <Route path="/" element={
          !user ? <Navigate to="/admin-login" /> : 
          user.role === 'admin' ? <Navigate to="/admin/dashboard" /> : <Navigate to="/customer" />
        } />

        {/* 4. Các tuyến đường xác thực 🔑 */}
        <Route path="/admin-login" element={<Login setUser={setUser} type="admin" />} />
        <Route path="/customer-login" element={<Login setUser={setUser} type="customer" />} />
        <Route path="/register" element={<Register />} />

        {/* 5. Tuyến đường cho Khách hàng 🎾 */}
        <Route path="/customer" element={
          user?.role === 'customer' ? <CustomerPortal user={user} logout={logout} /> : <Navigate to="/customer-login" />
        } />

        {/* 6. Tuyến đường cho Admin 🛡️ */}
        <Route path="/admin/*" element={
          user?.role === 'admin' ? (
            <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
              <aside style={styles.sidebar}>
                <div style={styles.logo}>PCM ADMIN</div>
                <nav style={styles.nav}>
                  <Link to="/admin/dashboard" style={styles.link}><LayoutDashboard size={18}/> Dashboard</Link>
                  <Link to="/admin/members" style={styles.link}><Users size={18}/> Hội viên</Link>
                  <Link to="/admin/courts" style={styles.link}><Landmark size={18}/> Quản lý sân</Link>
                  <Link to="/admin/tournaments" style={styles.link}><Trophy size={18}/> Giải đấu</Link>
                  <button onClick={logout} style={styles.logoutBtn}><LogOut size={18}/> Đăng xuất</button>
                </nav>
              </aside>

              <main style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
                <Routes>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="members" element={<AdminMembers />} />
                  <Route path="courts" element={<AdminCourts />} />
                  <Route path="tournaments" element={<AdminTournaments />} />
                  <Route path="*" element={<Navigate to="dashboard" />} />
                </Routes>
              </main>
            </div>
          ) : <Navigate to="/admin-login" />
        } />
      </Routes>
    </Router>
  );
}

const styles = {
  sidebar: { width: '260px', backgroundColor: '#0f172a', color: 'white', padding: '30px 20px', display: 'flex', flexDirection: 'column' },
  logo: { fontSize: '22px', fontWeight: 'bold', color: '#38bdf8', textAlign: 'center', marginBottom: '40px', letterSpacing: '1px' },
  nav: { display: 'flex', flexDirection: 'column', gap: '8px' },
  link: { color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 15px', borderRadius: '10px', transition: '0.3s' },
  logoutBtn: { marginTop: '20px', background: 'none', border: 'none', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 15px', cursor: 'pointer', textAlign: 'left', width: '100%' }
};