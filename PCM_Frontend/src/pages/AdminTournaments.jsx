import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trophy, Calendar, DollarSign, Trash2, Plus } from 'lucide-react';

const API_BASE = "https://kiemtra-fullstack.onrender.com/api";

const AdminTournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [formData, setFormData] = useState({ name: '', startDate: '', prize: 0 });
  const [loading, setLoading] = useState(true);

  // Hàm tải dữ liệu 📥
  const fetchTournaments = async () => {
    try {
      const res = await axios.get(`${API_BASE}/Tournaments`);
      // Đảm bảo dữ liệu luôn là mảng để không lỗi hàm .map()
      setTournaments(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Lỗi tải dữ liệu:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTournaments(); }, []);

  // Hàm thêm mới ➕
  const handleAdd = async (e) => {
    e.preventDefault();
    
    // Payload chuẩn hóa để tránh lỗi 400
    const payload = {
      name: formData.name.trim(),
      startDate: formData.startDate ? new Date(formData.startDate).toISOString() : new Date().toISOString(),
      prize: Number(formData.prize) || 0,
      status: "Upcoming"
    };

    try {
      await axios.post(`${API_BASE}/Tournaments`, payload);
      alert("Thêm giải đấu thành công! 🎉");
      setFormData({ name: '', startDate: '', prize: 0 });
      fetchTournaments();
    } catch (err) {
      console.error("Lỗi chi tiết:", err.response?.data);
      alert("Lỗi: " + (err.response?.data?.message || "Kiểm tra lại Backend"));
    }
  };

  // Hàm xóa 🗑️
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa giải đấu này?")) {
      try {
        await axios.delete(`${API_BASE}/Tournaments/${id}`);
        alert("Đã xóa xong!");
        fetchTournaments();
      } catch (err) {
        alert("Không thể xóa giải đấu!");
      }
    }
  };

  if (loading) return <div style={{ padding: '20px' }}>Đang tải dữ liệu... ⏳</div>;

  return (
    <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '15px' }}>
      <h2 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Trophy color="#0284c7" /> Quản lý giải đấu
      </h2>
      
      {/* Form nhập liệu 📝 */}
      <form onSubmit={handleAdd} style={styles.form}>
        <input 
          style={styles.input} 
          placeholder="Tên giải đấu" 
          value={formData.name} 
          onChange={e => setFormData({...formData, name: e.target.value})} 
          required 
        />
        <input 
          type="date" 
          style={styles.input} 
          value={formData.startDate} 
          onChange={e => setFormData({...formData, startDate: e.target.value})} 
          required 
        />
        <input 
          type="number" 
          style={styles.input} 
          placeholder="Giải thưởng (VNĐ)" 
          value={formData.prize} 
          onChange={e => setFormData({...formData, prize: e.target.value})} 
          required 
        />
        <button type="submit" style={styles.btnSubmit}><Plus size={18}/> Thêm</button>
      </form>

      {/* Bảng hiển thị 📊 */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={styles.tableHeader}>
            <th>Tên giải</th>
            <th>Ngày bắt đầu</th>
            <th>Phần thưởng</th>
            <th style={{ textAlign: 'center' }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {tournaments.length > 0 ? (
            tournaments.map(t => (
              <tr key={t.id} style={styles.tableRow}>
                <td style={{ padding: '12px' }}><strong>{t.name}</strong></td>
                <td>{new Date(t.startDate).toLocaleDateString('vi-VN')}</td>
                <td>{t.prize?.toLocaleString()} VNĐ</td>
                <td style={{ textAlign: 'center' }}>
                  <button onClick={() => handleDelete(t.id)} style={styles.btnDelete}>
                    <Trash2 size={18}/>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: '#94a3b8' }}>
                Chưa có dữ liệu giải đấu nào 🏝️
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  form: { display: 'flex', gap: '10px', marginBottom: '20px', padding: '15px', backgroundColor: '#f8fafc', borderRadius: '10px' },
  input: { padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', flex: 1 },
  btnSubmit: { padding: '10px 20px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' },
  tableHeader: { textAlign: 'left', borderBottom: '2px solid #f1f5f9', color: '#64748b' },
  tableRow: { borderBottom: '1px solid #f1f5f9' },
  btnDelete: { color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer', padding: '5px' }
};

export default AdminTournaments;