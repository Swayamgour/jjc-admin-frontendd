import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import "./Sidebar.css";

const NAV = [
  {
    section: "Overview", items: [
      { label: "Dashboard", path: "/", icon: <GridIcon /> },
    ]
  },
  {
    section: "Content", items: [
      { label: "Home Page", path: "/home-page", icon: <HomeIcon /> },
      { label: "Categories", path: "/categories", icon: <TagIcon /> },
      { label: "Services", path: "/services", icon: <LayersIcon />, count: 13 },
      { label: "Platforms", path: "/platforms", icon: <CpuIcon />, count: 14 },
      // { label: "Solutions", path: "/solutions", icon: <LightbulbIcon />, count: 13 },
      { label: "Industries", path: "/industries", icon: <BuildingIcon />, count: 9 },
      
      { label: "Contact Leads", path: "/leads", icon: <InboxIcon /> },
      { label: "Blog Categories", path: "/blog-categories", icon: <FolderIcon /> },
      { label: "Blogs", path: "/blog", icon: <BlogIcon /> },
    ]
  },
  // { section: "Resources", items: [
  //   { label: "Blog & Guides",  path: "/resources",    icon: <FileTextIcon /> },
  //   { label: "Case Studies",   path: "/case-studies", icon: <TrophyIcon />   },
  //   { label: "Testimonials",   path: "/testimonials", icon: <StarIcon />     },
  //   { label: "FAQs",           path: "/faqs",         icon: <HelpIcon />     },
  // ]},
  // { section: "CRM", items: [
  //   { label: "Contact Leads", path: "/leads", icon: <InboxIcon />, badge: true },
  // ]},
];

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);

  return (
    <aside className={`sidebar ${collapsed ? "sidebar--collapsed" : ""} ${mobileOpen ? "sidebar--mobile-open" : ""}`}>
      {/* Logo */}
      <div className="sidebar__logo">
        <div className="sidebar__logo-mark"><span>JJC</span></div>
        {!collapsed && (
          <div className="sidebar__logo-text">
            <span className="sidebar__logo-name">JJC Systems</span>
            <span className="sidebar__logo-sub">Admin Panel</span>
          </div>
        )}
        <button className="sidebar__collapse-btn" onClick={onToggle} title="Toggle sidebar">
          <ChevronIcon rotated={collapsed} />
        </button>
      </div>

      {/* Nav */}
      <nav className="sidebar__nav">
        {NAV.map((group) => (
          <div key={group.section} className="sidebar__group">
            {!collapsed && <span className="sidebar__group-label">{group.section}</span>}
            {group.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) => `sidebar__item ${isActive ? "sidebar__item--active" : ""}`}
                title={collapsed ? item.label : undefined}
                onClick={onMobileClose}
              >
                <span className="sidebar__item-icon">{item.icon}</span>
                {!collapsed && (
                  <>
                    <span className="sidebar__item-label">{item.label}</span>
                    {/* {item.count && <span className="sidebar__item-count">{item.count}</span>} */}
                    {item.badge && <span className="sidebar__item-badge" />}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar__footer">
        <div className="sidebar__user">
          <div className="sidebar__user-avatar">{user?.name?.charAt(0) || "A"}</div>
          {!collapsed && (
            <div className="sidebar__user-info">
              <span className="sidebar__user-name">{user?.name || "Admin"}</span>
              <span className="sidebar__user-role">{user?.role || "admin"}</span>
            </div>
          )}
        </div>
        <button className="sidebar__logout" onClick={() => dispatch(logout())} title="Logout">
          <LogoutIcon />
        </button>
      </div>
    </aside>
  );
}

function GridIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>; }
function LayersIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>; }
function CpuIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" /></svg>; }
function LightbulbIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="9" y1="18" x2="15" y2="18" /><line x1="10" y1="22" x2="14" y2="22" /><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" /></svg>; }
function BuildingIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>; }
function FileTextIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>; }
function TrophyIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="8 21 12 17 16 21" /><path d="M17 3H7l-1 8h12l-1-8z" /></svg>; }
function StarIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>; }
function HelpIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>; }
function InboxIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></svg>; }
function LogoutIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>; }
function ChevronIcon({ rotated }) {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: rotated ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}><polyline points="15 18 9 12 15 6" /></svg>;
}
function HomeIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>; }
function TagIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10L12 2H4v8l8 8 8-8z" /><circle cx="7.5" cy="7.5" r="1.5" /></svg>; }
function FolderIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
    </svg>
  );
}
function BlogIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 4h12a2 2 0 0 1 2 2v13a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2V4z" />
      <path d="M8 8h8" />
      <path d="M8 12h8" />
      <path d="M8 16h5" />
      <path d="M5 18a2 2 0 0 0 2 2" />
    </svg>
  );
}




