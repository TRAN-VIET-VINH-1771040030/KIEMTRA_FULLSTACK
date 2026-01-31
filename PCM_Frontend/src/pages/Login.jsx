import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setUser, type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (type === 'admin') {
      // Kiểm tra Admin cố định 🔑
      if (email === "admin@gmail.com" && password === "123456") {
        const adminData = { email, role: 'admin', fullName: 'Quản trị viên' };
        localStorage.setItem('user', JSON.stringify(adminData));
        setUser(adminData);
        navigate('/admin/dashboard');
      } else {
        alert("Thông tin Admin không chính xác!");
      }
    } else {
      // Kiểm tra Khách hàng từ Database 👤
      try {
        const res = await axios.get("https://kiemtra-fullstack.onrender.com/api/Members");
        const foundMember = res.data.find(m => m.email === email && m.phoneNumber === password);

        if (foundMember) {
          const customerData = { ...foundMember, role: 'customer' };
          localStorage.setItem('user', JSON.stringify(customerData));
          setUser(customerData);
          navigate('/customer');
        } else {
          alert("Email hoặc Số điện thoại không đúng!");
        }
      } catch (err) {
        alert("Lỗi kết nối Backend!");
      }
    }
  };

  return (
    <div style={s.container}>
      <div style={s.card}>
        <div style={s.icon}>{type === 'admin' ? '🛡️' : '🎾'}</div>
        <h2 style={s.title}>PCM 030 CHÀO BẠN</h2>
        <p style={s.subtitle}>
          {type === 'admin' ? 'Khu vực Quản trị viên' : 'Đăng nhập dành cho Khách hàng'}
        </p>
        
        <form onSubmit={handleLogin} style={s.form}>
          <input 
            style={s.input} 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            style={s.input} 
            type="password" 
            placeholder={type === 'admin' ? "Mật khẩu" : "Số điện thoại (Mật khẩu)"} 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit" style={s.btn}>Đăng nhập ngay</button>
        </form>

        {/* 1. Phần chuyển đổi giữa Admin và Khách hàng */}
        <div style={s.switchBox}>
          {type === 'admin' ? (
            <Link to="/customer-login" style={s.link}>Bạn là Khách hàng? Đăng nhập tại đây</Link>
          ) : (
            <Link to="/admin-login" style={s.link}>Bạn là Quản trị viên? Đăng nhập tại đây</Link>
          )}
        </div>

        {/* 2. Phần đăng ký dành riêng cho Khách hàng */}
        {type === 'customer' && (
          <p style={s.footer}>
            Chưa có tài khoản? <Link to="/register" style={s.registerLink}>Đăng ký ngay</Link>
          </p>
        )}
      </div>
    </div>
  );
};

const s = {
  container: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f9ff' },
  card: { padding: '40px', backgroundColor: 'white', borderRadius: '24px', width: '380px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' },
  icon: { fontSize: '40px', marginBottom: '15px' },
  title: { fontSize: '22px', fontWeight: 'bold', color: '#0f172a' },
  subtitle: { fontSize: '14px', color: '#64748b', marginBottom: '25px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: { padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' },
  btn: { padding: '12px', backgroundColor: '#0284c7', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' },
  switchBox: { marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '15px' },
  footer: { marginTop: '15px', fontSize: '14px', color: '#64748b' },
  link: { fontSize: '13px', color: '#64748b', textDecoration: 'none' },
  registerLink: { color: '#0284c7', fontWeight: 'bold', textDecoration: 'none' }
};

export default Login;