import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Landmark, Trophy, Activity } from 'lucide-react';

const API_BASE = "https://kiemtra-fullstack.onrender.com/api";

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
        const [resMembers, resCourts, resTours] = await Promise.all([
          axios.get(`${API_BASE}/Members`),
          axios.get(`${API_BASE}/Courts`),
          axios.get(`${API_BASE}/Tournaments`).catch(() => ({ data: [] }))
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
        <h2 style={styles.title}>Dashboard Thống Kê 📊</h2>
        <p style={styles.subtitle}>Chào mừng Admin! Dưới đây là tình hình hoạt động của PCM 030.</p>
      </div>

      {loading ? (
        <div style={styles.loading}>Đang cập nhật số liệu... ⏳</div>
      ) : (
        <div style={styles.statsGrid}>
          {/* Card Hội viên */}
          <div style={styles.card}>
            <div>
              <p style={styles.cardLabel}>Tổng Hội viên</p>
              <h3 style={styles.cardValue}>{stats.members}</h3>
            </div>
            <div style={{ ...styles.cardIconBox, backgroundColor: '#e0f2fe' }}>
              <Users size={32} color="#0284c7" />
            </div>
          </div>

          {/* Card Sân bãi */}
          <div style={styles.card}>
            <div>
              <p style={styles.cardLabel}>Sân đang quản lý</p>
              <h3 style={styles.cardValue}>{stats.courts}</h3>
            </div>
            <div style={{ ...styles.cardIconBox, backgroundColor: '#dcfce7' }}>
              <Landmark size={32} color="#10b981" />
            </div>
          </div>

          {/* Card Giải đấu */}
          <div style={styles.card}>
            <div>
              <p style={styles.cardLabel}>Giải đấu sắp tới</p>
              <h3 style={styles.cardValue}>{stats.tournaments}</h3>
            </div>
            <div style={{ ...styles.cardIconBox, backgroundColor: '#fef3c7' }}>
              <Trophy size={32} color="#f59e0b" />
            </div>
          </div>
        </div>
      )}

      
    </div>
  );
};

const styles = {
  container: { 
    padding: '30px', 
    backgroundColor: '#f8fafc', 
    minHeight: '100vh' 
  },
  header: { marginBottom: '40px' },
  title: { 
    fontSize: '28px', 
    fontWeight: '800', 
    color: '#0f172a', 
    margin: '0 0 8px 0' 
  },
  subtitle: { color: '#64748b', fontSize: '16px' },
  loading: { fontSize: '18px', color: '#64748b', textAlign: 'center', padding: '50px' },
  statsGrid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
    gap: '24px' 
  },
  card: {
    backgroundColor: 'white',
    padding: '32px',
    borderRadius: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    border: '1px solid #f1f5f9'
  },
  cardIconBox: {
    width: '64px',
    height: '64px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardLabel: { 
    fontSize: '15px', 
    fontWeight: '600', 
    color: '#64748b', 
    margin: '0 0 10px 0' 
  },
  cardValue: { 
    fontSize: '36px', 
    fontWeight: '800', 
    color: '#1e293b', 
    margin: 0 
  },
  welcomeBox: {
    marginTop: '50px',
    padding: '60px',
    background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
    borderRadius: '32px',
    textAlign: 'center',
    color: '#0369a1',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)'
  }
};

export default AdminDashboard;