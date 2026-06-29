import { useSelector } from "react-redux";
import "./Topbar.css";

export default function Topbar({ sidebarCollapsed, onMenuClick }) {
  const user = useSelector((s) => s.auth.user);

  return (
    <header className="topbar" style={{ left: sidebarCollapsed ? "60px" : "var(--sidebar-w)" }}>
      <div className="topbar__left">
        {/* Hamburger — visible on mobile only via CSS */}
        <button className="topbar__hamburger" onClick={onMenuClick} aria-label="Toggle menu">
          <HamburgerIcon />
        </button>
        <div className="topbar__breadcrumb">
          <span className="topbar__brand">JJC Systems</span>
          <span className="topbar__sep">/</span>
          <span className="topbar__page">Admin</span>
        </div>
      </div>
      <div className="topbar__right">
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noreferrer"
          className="topbar__view-site"
        >
          <ExternalIcon />
          <span>View Site</span>
        </a>
        <div className="topbar__divider" />
        <div className="topbar__user">
          <div className="topbar__avatar">{user?.name?.charAt(0) || "A"}</div>
          <span className="topbar__username">{user?.name || "Admin"}</span>
        </div>
      </div>
    </header>
  );
}

function HamburgerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );
}
