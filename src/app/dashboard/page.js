'use client';

import { useState, useEffect, useCallback, useSyncExternalStore } from 'react';
import { API_BASE_URL } from '../../lib/api';

const API = API_BASE_URL;
const TOKEN_KEY = 'admin_token';
const REFRESH_KEY = 'admin_refresh';

/* Small pub-sub around localStorage so the token can be read with
 * useSyncExternalStore instead of setState-in-effect: avoids the
 * login-screen flash on load and stays hydration-safe (no window access
 * during server prerender). */
const tokenListeners = new Set();

function getStoredToken() {
  try { return localStorage.getItem(TOKEN_KEY); } catch { return null; }
}

function setStoredToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else { localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(REFRESH_KEY); }
  } catch { /* localStorage unavailable (private mode, etc.) */ }
  tokenListeners.forEach(fn => fn());
}

function subscribeToken(callback) {
  tokenListeners.add(callback);
  return () => tokenListeners.delete(callback);
}

/* ─── helpers ─────────────────────────────────────── */
function authHeaders(token) {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
}

const STATUS_COLORS = {
  NEW: { bg: '#1e40af', text: '#93c5fd', label: 'New' },
  CONTACTED: { bg: '#854d0e', text: '#fde68a', label: 'Contacted' },
  RESOLVED: { bg: '#065f46', text: '#6ee7b7', label: 'Resolved' },
};

/* ─── Login Screen ─────────────────────────────────── */
function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/admin/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error('Invalid credentials');
      const data = await res.json();
      try { localStorage.setItem(REFRESH_KEY, data.refresh); } catch { /* ignore */ }
      onLogin(data.access);
    } catch (err) {
      setError('Invalid username or password. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "var(--font-body)"
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)',
        borderRadius: 20, padding: '44px 48px', width: '100%', maxWidth: 420,
        boxShadow: '0 32px 80px rgba(0,0,0,0.5)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 56, height: 56, background: 'linear-gradient(135deg,#2563eb,#06b6d4)',
            borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px', fontSize: 24
          }}>🛡️</div>
          <h1 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Admin Portal</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginTop: 6 }}>Praitunova Infotech</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem', marginBottom: 6 }}>Username</label>
            <input
              type="text" value={username} onChange={e => setUsername(e.target.value)} required
              style={{
                width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, color: '#fff',
                fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem', marginBottom: 6 }}>Password</label>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)} required
              style={{
                width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, color: '#fff',
                fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box'
              }}
            />
          </div>
          {error && <p style={{ color: '#f87171', fontSize: '0.83rem', marginBottom: 16, margin: '0 0 16px' }}>{error}</p>}
          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '13px', background: 'linear-gradient(135deg,#2563eb,#06b6d4)',
            border: 'none', borderRadius: 10, color: '#fff', fontWeight: 700,
            fontSize: '0.95rem', cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s'
          }}>
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ─── Stat Card ─────────────────────────────────────── */
function StatCard({ icon, label, value, color }) {
  return (
    <div className="admin-stat-card" style={{
      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 14, padding: '22px 24px', display: 'flex', alignItems: 'center', gap: 16, minWidth: 0
    }}>
      <div className="admin-stat-icon" style={{
        width: 48, height: 48, borderRadius: 12, background: color + '22',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0
      }}>{icon}</div>
      <div style={{ minWidth: 0 }}>
        <div className="admin-stat-label" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', overflowWrap: 'break-word' }}>{label}</div>
        <div className="admin-stat-value" style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 700, lineHeight: 1.1 }}>{value}</div>
      </div>
    </div>
  );
}

/* ─── Inquiry Row ───────────────────────────────────── */
function InquiryRow({ inq, onStatusChange, onSelect }) {
  const s = STATUS_COLORS[inq.status] || STATUS_COLORS.NEW;
  return (
    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}
        onClick={() => onSelect(inq)}>
      <td style={{ padding: '14px 16px', color: '#fff', fontWeight: 600 }}>{inq.name}</td>
      <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>{inq.email}</td>
      <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>{inq.service || '—'}</td>
      <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem' }}>
        {new Date(inq.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
      </td>
      <td style={{ padding: '14px 16px' }} onClick={e => e.stopPropagation()}>
        <select
          value={inq.status}
          onChange={e => onStatusChange(inq.id, e.target.value)}
          style={{
            background: s.bg, color: s.text, border: 'none', borderRadius: 6,
            padding: '4px 10px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer'
          }}
        >
          <option value="NEW">New</option>
          <option value="CONTACTED">Contacted</option>
          <option value="RESOLVED">Resolved</option>
        </select>
      </td>
    </tr>
  );
}

/* ─── Detail Modal ──────────────────────────────────── */
function DetailModal({ inq, onClose }) {
  if (!inq) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 24
    }} onClick={onClose}>
      <div style={{
        background: '#1e293b', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 18,
        padding: '36px 40px', maxWidth: 560, width: '100%', boxShadow: '0 32px 80px rgba(0,0,0,0.5)'
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <div style={{ color: '#38bdf8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Inquiry Details</div>
            <h2 style={{ color: '#fff', fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>{inq.name}</h2>
          </div>
          <button onClick={onClose} style={{
            background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 8, width: 34, height: 34,
            color: '#fff', cursor: 'pointer', fontSize: 16
          }}>✕</button>
        </div>
        {[
          ['📧 Email', inq.email], ['📞 Phone', inq.phone || 'Not provided'],
          ['🏢 Company', inq.company || 'Not provided'], ['⚙️ Service', inq.service || 'Not specified'],
          ['📅 Submitted', new Date(inq.created_at).toLocaleString('en-IN')],
        ].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', minWidth: 120 }}>{k}</span>
            <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem' }}>{v}</span>
          </div>
        ))}
        <div style={{ marginTop: 20, background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '14px 16px' }}>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem', marginBottom: 8 }}>💬 MESSAGE</div>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>{inq.message}</p>
        </div>
        <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
          <a href={`mailto:${inq.email}`} style={{
            flex: 1, padding: '11px', background: 'linear-gradient(135deg,#2563eb,#06b6d4)',
            color: '#fff', borderRadius: 10, textAlign: 'center', textDecoration: 'none',
            fontWeight: 600, fontSize: '0.88rem'
          }}>Reply via Email</a>
          {inq.phone && (
            <a href={`tel:${inq.phone.replace(/\s+/g, '')}`} style={{
              flex: 1, padding: '11px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff',
              borderRadius: 10, textAlign: 'center', textDecoration: 'none', fontWeight: 600, fontSize: '0.88rem'
            }}>Call</a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Dashboard ────────────────────────────────── */
export default function AdminDashboard() {
  const token = useSyncExternalStore(subscribeToken, getStoredToken, () => null);
  const [stats, setStats]       = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch]     = useState('');
  const [filter, setFilter]     = useState('ALL');
  const [loading, setLoading]   = useState(false);
  const [tab, setTab]           = useState('inquiries');

  const fetchData = useCallback(async (tkn) => {
    if (!tkn) return;
    setLoading(true);
    try {
      const [statsRes, inqRes] = await Promise.all([
        fetch(`${API}/admin/stats/`,     { headers: authHeaders(tkn) }),
        fetch(`${API}/admin/inquiries/`, { headers: authHeaders(tkn) }),
      ]);
      if (statsRes.status === 401 || inqRes.status === 401) {
        setStoredToken(null);
        return;
      }
      setStats(await statsRes.json());
      const inqData = await inqRes.json();
      // Admin list is paginated ({count, results}); fall back to a plain
      // array for compatibility if pagination is ever disabled.
      setInquiries(Array.isArray(inqData) ? inqData : inqData.results ?? []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, []);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch-on-mount/token-change is the intended behavior here; fetchData guards on `tkn` and this is a small dashboard, not worth pulling in a data-fetching library for.
  useEffect(() => { fetchData(token); }, [token, fetchData]);

  async function updateStatus(id, newStatus) {
    await fetch(`${API}/admin/inquiries/${id}/`, {
      method: 'PATCH',
      headers: authHeaders(token),
      body: JSON.stringify({ status: newStatus }),
    });
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status: newStatus } : i));
    fetchData(token); // refresh stats
  }

  function logout() {
    setStoredToken(null);
  }

  if (!token) return <LoginScreen onLogin={setStoredToken} />;

  const filtered = inquiries.filter(i => {
    const matchesSearch = search === '' ||
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.email.toLowerCase().includes(search.toLowerCase()) ||
      (i.service || '').toLowerCase().includes(search.toLowerCase()) ||
      (i.company || '').toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'ALL' || i.status === filter;
    return matchesSearch && matchesFilter;
  });

  const s = { color: 'white', fontFamily: "var(--font-body)" };

  return (
    <div style={{ ...s, minHeight: '100vh', background: '#0f172a', display: 'flex', flexDirection: 'column' }}>
      {/* ── TOP NAV ── */}
      <nav className="admin-topnav" style={{
        background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '10px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 64
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36, height: 36, background: 'linear-gradient(135deg,#2563eb,#06b6d4)',
            borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0
          }}>🛡️</div>
          <div>
            <div className="admin-topnav-title" style={{ fontWeight: 700, fontSize: '0.95rem' }}>Praitunova Admin</div>
            <div className="admin-topnav-subtitle" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.7rem' }}>Management Dashboard</div>
          </div>
        </div>
        <div className="admin-topnav-actions" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={() => fetchData(token)} style={{
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8, padding: '6px 14px', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: '0.82rem'
          }}>🔄 Refresh</button>
          <button onClick={logout} style={{
            background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: 8, padding: '6px 14px', color: '#f87171', cursor: 'pointer', fontSize: '0.82rem'
          }}>Sign Out</button>
        </div>
      </nav>

      <div className="admin-body" style={{ display: 'flex', flex: 1 }}>
        {/* ── SIDEBAR ── */}
        <aside className="admin-sidebar" style={{
          background: 'rgba(255,255,255,0.02)', borderRight: '1px solid rgba(255,255,255,0.06)',
          padding: '24px 16px'
        }}>
          <div className="admin-sidebar-nav">
            {[
              { id: 'inquiries', icon: '📬', label: 'Inquiries' },
              { id: 'stats',     icon: '📊', label: 'Analytics' },
              { id: 'settings',  icon: '⚙️',  label: 'Settings' },
            ].map(item => (
              <button key={item.id} onClick={() => setTab(item.id)} className="admin-sidebar-link" style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
                background: tab === item.id ? 'rgba(37,99,235,0.2)' : 'transparent',
                border: tab === item.id ? '1px solid rgba(37,99,235,0.4)' : '1px solid transparent',
                borderRadius: 10, color: tab === item.id ? '#93c5fd' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer', fontSize: '0.88rem', fontWeight: tab === item.id ? 600 : 400, marginBottom: 4,
                textAlign: 'left'
              }}>
                <span>{item.icon}</span> {item.label}
              </button>
            ))}
          </div>
          <div className="admin-sidebar-footer" style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <a href={API.replace(/\/api$/, '/admin/')} target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
              background: 'transparent', color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', textDecoration: 'none'
            }}>🔗 Django Admin</a>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="admin-main" style={{ flex: 1, padding: '32px', overflowY: 'auto', minWidth: 0 }}>

          {/* STATS ROW */}
          {stats && (
            <div className="admin-stats-grid" style={{ display: 'grid', gap: 16, marginBottom: 32 }}>
              <StatCard icon="📬" label="Total Inquiries" value={stats.total} color="#2563eb" />
              <StatCard icon="🆕" label="New"             value={stats.new}   color="#38bdf8" />
              <StatCard icon="📞" label="Contacted"       value={stats.contacted} color="#f59e0b" />
              <StatCard icon="✅" label="Resolved"        value={stats.resolved}  color="#10b981" />
            </div>
          )}

          {/* TAB: INQUIRIES */}
          {tab === 'inquiries' && (
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16 }}>
              {/* Table Header */}
              <div className="admin-table-header" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <h2 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, margin: 0, flex: 1 }}>
                  Client Inquiries <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>({filtered.length})</span>
                </h2>
                <input
                  type="text" placeholder="Search name, email, service…" value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="admin-search-input"
                  style={{
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 8, padding: '8px 14px', color: '#fff', fontSize: '0.83rem',
                    outline: 'none'
                  }}
                />
                <select value={filter} onChange={e => setFilter(e.target.value)} style={{
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8, padding: '8px 12px', color: '#fff', fontSize: '0.83rem', cursor: 'pointer'
                }}>
                  <option value="ALL">All Status</option>
                  <option value="NEW">New</option>
                  <option value="CONTACTED">Contacted</option>
                  <option value="RESOLVED">Resolved</option>
                </select>
              </div>

              {loading ? (
                <div style={{ textAlign: 'center', padding: 48, color: 'rgba(255,255,255,0.3)' }}>Loading…</div>
              ) : filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 48, color: 'rgba(255,255,255,0.3)' }}>No inquiries found.</div>
              ) : (
                <div className="admin-table-wrapper">
                  <table style={{ width: '100%', minWidth: 640, borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                        {['Name','Email','Service','Date','Status'].map(h => (
                          <th key={h} style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.07em', textAlign: 'left', fontWeight: 600 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map(inq => (
                        <InquiryRow key={inq.id} inq={inq} onStatusChange={updateStatus} onSelect={setSelected} />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB: ANALYTICS */}
          {tab === 'stats' && stats && (
            <div>
              <h2 style={{ color: '#fff', marginBottom: 24 }}>Analytics Overview</h2>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 28 }}>
                <h3 style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>Inquiries by Service</h3>
                {stats.by_service.map((item, i) => {
                  const pct = stats.total > 0 ? Math.round((item.count / stats.total) * 100) : 0;
                  return (
                    <div key={i} style={{ marginBottom: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem' }}>{item.service || 'Unspecified'}</span>
                        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem' }}>{item.count} ({pct}%)</span>
                      </div>
                      <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg,#2563eb,#06b6d4)', borderRadius: 4, transition: 'width 0.6s ease' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB: SETTINGS */}
          {tab === 'settings' && (
            <div>
              <h2 style={{ color: '#fff', marginBottom: 24 }}>Settings</h2>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 28 }}>
                {[
                  ['Notification Email', 'Configured via ADMIN_NOTIFICATION_EMAIL (backend env var)'],
                  ['Admin API URL', `${API}/`],
                  ['Django Admin', API.replace(/\/api$/, '/admin/')],
                  ['Database', 'SQLite (local) → PostgreSQL (production)'],
                  ['Rate Limiting', 'Contact form: 10/hour/IP · Admin login: 10/hour/IP'],
                  ['Auth Method', 'JWT Bearer Token (djangorestframework-simplejwt)'],
                ].map(([k, v]) => (
                  <div key={k} className="admin-settings-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 24px', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', minWidth: 180 }}>{k}</span>
                    <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', wordBreak: 'break-word' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Detail modal */}
      {selected && <DetailModal inq={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
