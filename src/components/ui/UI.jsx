import { useEffect } from "react";
import "./UI.css";

/* ─── Button ─── */
export function Btn({ children, variant = "primary", size = "md", loading, icon, onClick, type = "button", disabled, className = "" }) {
  return (
    <button
      type={type}
      className={`btn btn--${variant} btn--${size} ${loading ? "btn--loading" : ""} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? <span className="btn__spinner" /> : icon && <span className="btn__icon">{icon}</span>}
      {children}
    </button>
  );
}

/* ─── Badge ─── */
export function Badge({ children, color = "default" }) {
  return <span className={`badge badge--${color}`}>{children}</span>;
}

/* ─── Status Badge for published/draft ─── */
export function StatusBadge({ published }) {
  return (
    <Badge color={published ? "green" : "yellow"}>
      {published ? "Published" : "Draft"}
    </Badge>
  );
}

/* ─── Spinner ─── */
export function Spinner({ size = "md" }) {
  return <div className={`spinner spinner--${size}`} />;
}

/* ─── Page Header ─── */
export function PageHeader({ title, subtitle, action }) {
  return (
    <div className="page-header">
      <div className="page-header__left">
        <h1 className="page-header__title">{title}</h1>
        {subtitle && <p className="page-header__sub">{subtitle}</p>}
      </div>
      {action && <div className="page-header__action">{action}</div>}
    </div>
  );
}

/* ─── Stats Card ─── */
export function StatCard({ label, value, icon, color = "blue", delta }) {
  return (
    <div className={`stat-card stat-card--${color}`}>
      <div className="stat-card__icon">{icon}</div>
      <div className="stat-card__body">
        <span className="stat-card__value">{value ?? "—"}</span>
        <span className="stat-card__label">{label}</span>
        {delta != null && (
          <span className={`stat-card__delta ${delta >= 0 ? "pos" : "neg"}`}>
            {delta >= 0 ? "+" : ""}{delta} this month
          </span>
        )}
      </div>
    </div>
  );
}

/* ─── Data Table ─── */
export function Table({ columns, data, loading, emptyMsg = "No data found." }) {
  if (loading) return <div className="table-loading"><Spinner size="lg" /></div>;
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>{columns.map((c) => <th key={c.key} style={c.style}>{c.label}</th>)}</tr>
        </thead>
        <tbody>
          {!data?.length
            ? <tr><td colSpan={columns.length} className="table__empty">{emptyMsg}</td></tr>
            : data.map((row, i) => (
              <tr key={row._id || i}>
                {columns.map((c) => (
                  <td key={c.key} style={c.style}>
                    {c.render ? c.render(row) : row[c.key]}
                  </td>
                ))}
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

/* ─── Modal ─── */
export function Modal({ open, onClose, title, children, width = 560 }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: width }} onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h3 className="modal__title">{title}</h3>
          <button className="modal__close" onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
}

/* ─── Form Field ─── */
export function Field({ label, children, required, error, hint }) {
  return (
    <div className="field">
      {label && <label className="field__label">{label}{required && <span className="field__req">*</span>}</label>}
      {children}
      {hint && <span className="field__hint">{hint}</span>}
      {error && <span className="field__error">{error}</span>}
    </div>
  );
}

/* ─── Input ─── */
export function Input({ value, onChange, placeholder, type = "text", disabled }) {
  return (
    <input
      className="input"
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}

/* ─── Textarea ─── */
export function Textarea({ value, onChange, placeholder, rows = 4 }) {
  return (
    <textarea
      className="input input--textarea"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
    />
  );
}

/* ─── Select ─── */
export function Select({ value, onChange, children, disabled }) {
  return (
    <select className="input input--select" value={value} onChange={onChange} disabled={disabled}>
      {children}
    </select>
  );
}

/* ─── Search Bar ─── */
export function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="search-bar">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
      <input
        className="search-bar__input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

/* ─── Empty State ─── */
export function EmptyState({ title, description, action }) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
          <polyline points="13 2 13 9 20 9"/>
        </svg>
      </div>
      <h3 className="empty-state__title">{title}</h3>
      {description && <p className="empty-state__desc">{description}</p>}
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  );
}

/* ─── Confirm Dialog ─── */
export function ConfirmDialog({ open, onClose, onConfirm, title, message, loading }) {
  return (
    <Modal open={open} onClose={onClose} title={title} width={420}>
      <p className="confirm__message">{message}</p>
      <div className="confirm__actions">
        <Btn variant="ghost" onClick={onClose} disabled={loading}>Cancel</Btn>
        <Btn variant="danger" onClick={onConfirm} loading={loading}>Delete</Btn>
      </div>
    </Modal>
  );
}

/* ─── Toast ─── */
export function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className={`toast toast--${type}`}>
      <span>{message}</span>
      <button onClick={onClose}>×</button>
    </div>
  );
}
