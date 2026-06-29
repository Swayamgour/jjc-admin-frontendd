import { useState } from "react";
import {
  PageHeader, Table, Btn, Badge, Modal, Select, Field, SearchBar, Spinner, Toast,
} from "../components/ui/UI";
import "../components/ui/UI.css";
import {
  useGetLeadsQuery,
  useGetLeadStatsQuery,
  useUpdateLeadStatusMutation,
} from "../features/contact/contactApi";
import "./LeadsPage.css";

const STATUS_OPTIONS = ["new", "contacted", "qualified", "proposal", "closed", "lost"];
const STATUS_COLOR = { new: "blue", contacted: "yellow", qualified: "purple", proposal: "green", closed: "green", lost: "red" };
const LEAD_TYPE_COLORS = { consultation: "blue", assessment: "yellow", expert: "purple", general: "default", contact: "default" };

export default function LeadsPage() {
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [toast, setToast] = useState(null);

  const { data: leadsData, isLoading } = useGetLeadsQuery({ status: statusFilter || undefined, limit: 50 });
  const { data: statsData } = useGetLeadStatsQuery();
  const [updateStatus, { isLoading: updating }] = useUpdateLeadStatusMutation();

  const leads = leadsData?.data || [];
  const filtered = search
    ? leads.filter((l) =>
        `${l.firstName} ${l.lastName} ${l.email} ${l.company}`.toLowerCase().includes(search.toLowerCase())
      )
    : leads;

  const handleStatusUpdate = async () => {
    if (!newStatus) return;
    try {
      await updateStatus({ id: selected._id, status: newStatus }).unwrap();
      setToast({ message: "Lead status updated", type: "success" });
      setSelected(null);
    } catch {
      setToast({ message: "Update failed", type: "error" });
    }
  };

  const columns = [
    { key: "name", label: "Contact",
      render: (row) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: "var(--accent-muted)", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, flexShrink: 0 }}>
            {row.firstName?.charAt(0)}
          </div>
          <div>
            <div style={{ fontWeight: 500, fontSize: 13, color: "var(--text-primary)" }}>{row.firstName} {row.lastName}</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{row.email}</div>
          </div>
        </div>
      ),
    },
    { key: "company", label: "Company", style: { width: 140 },
      render: (row) => <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{row.company || "—"}</span> },
    { key: "leadType", label: "Type", style: { width: 110 },
      render: (row) => <Badge color={LEAD_TYPE_COLORS[row.leadType] || "default"}>{row.leadType}</Badge> },
    { key: "serviceArea", label: "Interested In", style: { width: 150 },
      render: (row) => <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{row.serviceArea || "—"}</span> },
    { key: "status", label: "Status", style: { width: 100 },
      render: (row) => <Badge color={STATUS_COLOR[row.status] || "default"}>{row.status}</Badge> },
    { key: "date", label: "Received", style: { width: 100 },
      render: (row) => <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{new Date(row.createdAt).toLocaleDateString()}</span> },
    { key: "actions", label: "", style: { width: 80 },
      render: (row) => <Btn size="sm" variant="ghost" onClick={() => { setSelected(row); setNewStatus(row.status); }}>View</Btn> },
  ];

  return (
    <div>
      <PageHeader title="Contact Leads" subtitle="All inbound leads from consultation, assessment, and contact forms" />

      {/* Pipeline mini stats */}
      {statsData?.data?.stats && (
        <div className="lead-stats">
          {statsData.data.stats.map((s) => (
            <div key={s._id} className={`lead-stat lead-stat--${STATUS_COLOR[s._id] || "default"}`}>
              <span className="lead-stat__count">{s.count}</span>
              <span className="lead-stat__label">{s._id}</span>
            </div>
          ))}
        </div>
      )}

      <div className="filters">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by name, email, company…" />
        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </Select>
        <span style={{ fontSize: 12, color: "var(--text-muted)", marginLeft: "auto" }}>{filtered.length} leads</span>
      </div>

      <Table columns={columns} data={filtered} loading={isLoading} emptyMsg="No leads yet. Leads from the website contact form will appear here." />

      {/* Lead Detail Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title="Lead Details" width={520}>
        {selected && (
          <div className="lead-detail">
            <div className="lead-detail__section">
              <div className="grid-2">
                <div><label>Name</label><p>{selected.firstName} {selected.lastName}</p></div>
                <div><label>Email</label><p>{selected.email}</p></div>
                <div><label>Phone</label><p>{selected.phone || "—"}</p></div>
                <div><label>Company</label><p>{selected.company || "—"}</p></div>
                <div><label>Job Title</label><p>{selected.jobTitle || "—"}</p></div>
                <div><label>Company Size</label><p>{selected.companySize || "—"}</p></div>
              </div>
            </div>
            <div className="lead-detail__section">
              <div className="grid-2">
                <div><label>Lead Type</label><p><Badge color={LEAD_TYPE_COLORS[selected.leadType]}>{selected.leadType}</Badge></p></div>
                <div><label>Service Area</label><p>{selected.serviceArea || "—"}</p></div>
                <div><label>Source Page</label><p>{selected.sourcePageTitle || selected.sourcePageType || "—"}</p></div>
                <div><label>Received</label><p>{new Date(selected.createdAt).toLocaleString()}</p></div>
              </div>
            </div>
            {selected.message && (
              <div className="lead-detail__section">
                <label>Message</label>
                <p className="lead-detail__message">{selected.message}</p>
              </div>
            )}
            <div className="lead-detail__section">
              <Field label="Update Status">
                <Select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                  {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </Select>
              </Field>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 12 }}>
                <Btn variant="ghost" onClick={() => setSelected(null)}>Close</Btn>
                <Btn variant="primary" onClick={handleStatusUpdate} loading={updating}>Update Status</Btn>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
