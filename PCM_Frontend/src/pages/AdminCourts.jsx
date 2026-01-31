import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = "https://kiemtra-fullstack.onrender.com/api";

const AdminCourts = () => {
  const [courts, setCourts] = useState([]);
  const [newCourt, setNewCourt] = useState({ name: '', status: 'Available', pricePerHour: 0 });

  const fetchCourts = () => {
    axios.get(`${API_BASE}/Courts`).then(res => setCourts(res.data)).catch(() => {});
  };

  useEffect(() => { fetchCourts(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/Courts`, {
        courtName: newCourt.name,
        status: newCourt.status,
        pricePerHour: Number(newCourt.pricePerHour)
      });
      setNewCourt({ name: '', status: 'Available', pricePerHour: 0 });
      fetchCourts();
    } catch (err) { alert("Lỗi khi thêm sân!"); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Xóa sân này?")) {
      await axios.delete(`${API_BASE}/Courts/${id}`);
      fetchCourts();
    }
  };

  return (
    <div style={s.panel}>
      <h2>Quản lý sân bãi</h2>
      <form onSubmit={handleAdd} style={s.form}>
        <input style={s.input} placeholder="Tên sân" value={newCourt.name} onChange={e => setNewCourt({...newCourt, name: e.target.value})} required />
        <input style={s.input} type="number" placeholder="Giá/giờ" value={newCourt.pricePerHour} onChange={e => setNewCourt({...newCourt, pricePerHour: e.target.value})} required />
        <button style={s.btnAdd} type="submit">Thêm sân</button>
      </form>
      <table style={s.table}>
        <thead><tr><th>Tên Sân</th><th>Trạng thái</th><th>Giá</th><th>Thao tác</th></tr></thead>
        <tbody>
          {courts.map((c) => (
            <tr key={c.id}>
              <td>{c.courtName || c.name}</td>
              <td>{c.status}</td>
              <td>{c.pricePerHour?.toLocaleString()}đ</td>
              <td><button onClick={() => handleDelete(c.id)} style={s.btnDel}>Xóa</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const s = {
  panel: { backgroundColor: 'white', padding: '25px', borderRadius: '20px' },
  form: { display: 'flex', gap: '10px', marginBottom: '20px', padding: '15px', background: '#f8fafc', borderRadius: '12px' },
  input: { padding: '10px', borderRadius: '8px', border: '1px solid #ddd', flex: 1 },
  btnAdd: { padding: '10px 20px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  table: { width: '100%', borderCollapse: 'collapse' },
  btnDel: { color: 'red', border: 'none', background: 'none', cursor: 'pointer' }
};

export default AdminCourts;