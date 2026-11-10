import { useState } from 'react';
import './AdminDashboard.css';

function AdminDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <h2>ShikshaHub</h2>
        <p>Admin Panel</p>

        <button onClick={() => setActiveTab('overview')}>
          Overview
        </button>

        <button onClick={() => setActiveTab('students')}>
          Students
        </button>

        <button onClick={() => setActiveTab('courses')}>
          Courses
        </button>

        <button onClick={() => setActiveTab('messages')}>
          Messages
        </button>

        <button onClick={onLogout}>
          Logout
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>Admin Dashboard</h1>
          <span>Welcome, {user?.name || 'Admin'}</span>
        </header>

        {activeTab === 'overview' && (
          <section>
            <h2>Overview</h2>

            <div className="admin-stats">
              <div className="admin-card">
                <h3>Total Students</h3>
                <p>0</p>
              </div>

              <div className="admin-card">
                <h3>Total Courses</h3>
                <p>0</p>
              </div>

              <div className="admin-card">
                <h3>Contact Messages</h3>
                <p>0</p>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'students' && <h2>Student Management</h2>}
        {activeTab === 'courses' && <h2>Course Management</h2>}
        {activeTab === 'messages' && <h2>Contact Messages</h2>}
      </main>
    </div>
  );
}

export default AdminDashboard;