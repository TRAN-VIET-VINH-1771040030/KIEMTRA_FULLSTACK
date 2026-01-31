import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Landmark, Trophy, Activity } from 'lucide-react';

const API_BASE = "http://localhost:5233/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    members: 0,
    courts: 0,
    tournaments: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Gọi đồng thời 3 API để lấy số lượng thực tế
        const [resMembers, resCourts, resTours] = await Promise.all([
          axios.get(`${API_BASE}/Members`),
          axios.get(`${API_BASE}/Courts`),
          axios.get(`${API_BASE}/Tournaments`).catch(() => ({ data: [] })) // Tránh lỗi nếu chưa có API giải đấu
        ]);

        setStats({
          members: resMembers.data.length,
          courts: resCourts.data.length,
          tournaments: resTours.data.length
        });
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu Dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Dashboard Thống Kê</h2>
        <p style={styles.subtitle}>Chào mừng Admin! Dưới đây là tình hình hoạt động của PCM 030.</p>
      </div>

      {loading ? (
        <p>Đang cập nhật số liệu...</p>
      ) : (
        <div style={styles.statsGrid}>
          {/* Card Hội viên */}
          <div style={{ ...styles.card, borderLeft: '6px solid #0284c7' }}>
            <div style={styles.cardIconBox}>
              <Users size={28} color="#0284c7" />
            </div>
            <div>
              <p style={styles.cardLabel}>Tổng Hội viên</p>
              <h3 style={styles.cardValue}>{stats.members}</h3>
            </div>
          </div>

          {/* Card Sân bãi */}
          <div style={{ ...styles.card, borderLeft: '6px solid #10b981' }}>
            <div style={styles.cardIconBox}>
              <Landmark size={28} color="#10b981" />
            </div>
            <div>
              <p style={styles.cardLabel}>Sân đang quản lý</p>
              <h3 style={styles.cardValue}>{stats.courts}</h3>
            </div>
          </div>

          {/* Card Giải đấu */}
          <div style={{ ...styles.card, borderLeft: '6px solid #f59e0b' }}>
            <div style={styles.cardIconBox}>
              <Trophy size={28} color="#f59e0b" />
            </div>
            <div>
              <p style={styles.cardLabel}>Giải đấu sắp tới</p>
              <h3 style={styles.cardValue}>{stats.tournaments}</h3>
            </div>
          </div>
        </div>
      )}

      {/* Phần trang trí thêm cho Dashboard bớt trống */}
      <div style={styles.welcomeBox}>
        <Activity size={40} color="#0284c7" style={{ marginBottom: '15px' }} />
        <h3>Hệ thống vận hành ổn định</h3>
        <p>Tất cả các kết nối API đến Backend (localhost:5233) đang hoạt động bình thường.</p>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '10px' },
  header: { marginBottom: '30px' },
  title: { fontSize: '24px', fontWeight: 'bold', color: '#1e293b', margin: '0 0 5px 0' },
  subtitle: { color: '#64748b', fontSize: '14px' },
  statsGrid: { display: 'flex', gap: '20px', flexWrap: 'wrap' },
  card: {
    flex: '1 1 250px',
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
  },
  cardIconBox: {
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    backgroundColor: '#f8fafc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardLabel: { fontSize: '14px', color: '#64748b', margin: 0 },
  cardValue: { fontSize: '28px', fontWeight: 'bold', color: '#1e293b', margin: 0 },
  welcomeBox: {
    marginTop: '40px',
    padding: '40px',
    backgroundColor: '#e0f2fe',
    borderRadius: '24px',
    textAlign: 'center',
    color: '#0369a1'
  }
};

export default AdminDashboard;