import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [data, setData] = useState({ fullName: '', email: '', phoneNumber: '' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5233/api/Members", {
        ...data,
        joinDate: new Date().toISOString(),
        isActive: true,
        accountBalance: 0,
        duprRank: 0
      });
      alert("Đăng ký thành công! Hãy dùng Số điện thoại làm mật khẩu để đăng nhập. 🎉");
      navigate('/customer-login');
    } catch (err) {
      alert("Lỗi đăng ký, vui lòng kiểm tra lại thông tin! 🛠️");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>📝</div>
        <h2 style={styles.title}>Đăng ký Thành viên</h2>
        <p style={styles.subtitle}>Gia nhập cộng đồng Pickleball 030</p>
        
        <form onSubmit={handleRegister} style={styles.form}>
          <input 
            style={styles.input} 
            placeholder="Họ và tên" 
            onChange={e => setData({...data, fullName: e.target.value})} 
            required 
          />
          <input 
            style={styles.input} 
            placeholder="Địa chỉ Email" 
            type="email" 
            onChange={e => setData({...data, email: e.target.value})} 
            required 
          />
          <input 
            style={styles.input} 
            placeholder="Số điện thoại (Dùng để đăng nhập)" 
            onChange={e => setData({...data, phoneNumber: e.target.value})} 
            required 
          />
          <button type="submit" style={styles.btn}>Tạo tài khoản</button>
        </form>
        
        <p style={styles.footer}>
          Đã có tài khoản? <Link to="/customer-login" style={styles.link}>Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f9ff' },
  card: { padding: '40px', backgroundColor: 'white', borderRadius: '24px', width: '380px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' },
  icon: { fontSize: '40px', marginBottom: '15px' },
  title: { fontSize: '22px', fontWeight: 'bold', color: '#0f172a' },
  subtitle: { fontSize: '14px', color: '#64748b', marginBottom: '30px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: { padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' },
  btn: { padding: '12px', backgroundColor: '#0284c7', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' },
  footer: { marginTop: '20px', fontSize: '14px', color: '#64748b' },
  link: { color: '#0284c7', fontWeight: 'bold', textDecoration: 'none' }
};

export default Register;