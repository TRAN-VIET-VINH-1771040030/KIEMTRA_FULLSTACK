import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Mail, Phone, Calendar } from 'lucide-react';

const AdminMembers = () => {
  const [members, setMembers] = useState([]);

  const fetchMembers = async () => {
    try {
      const res = await axios.get("https://kiemtra-fullstack.onrender.com/api/Members");
      setMembers(res.data);
    } catch (err) {
      console.error("Lỗi tải danh sách hội viên");
    }
  };

  useEffect(() => { fetchMembers(); }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '15px' }}>
      <h2 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Users color="#0284c7" /> Danh sách Hội viên
      </h2>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
            <th style={{ padding: '12px' }}>Tên hội viên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Ngày tham gia</th>
            <th>Số dư</th>
          </tr>
        </thead>
        <tbody>
          {members.map(m => (
            <tr key={m.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '12px' }}><strong>{m.fullName}</strong></td>
              <td>{m.email}</td>
              <td>{m.phoneNumber}</td>
              <td>{new Date(m.joinDate).toLocaleDateString('vi-VN')}</td>
              <td style={{ color: '#16a34a', fontWeight: 'bold' }}>{m.accountBalance?.toLocaleString()}đ</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMembers;