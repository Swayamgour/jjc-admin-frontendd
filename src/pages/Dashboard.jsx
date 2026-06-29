import { useGetServicesQuery } from "../features/services/servicesApi";
import { useGetPlatformsQuery } from "../features/platforms/platformsApi";
import { useGetLeadsQuery, useGetLeadStatsQuery } from "../features/contact/contactApi";
import { useGetCaseStudiesQuery } from "../features/caseStudies/caseStudiesApi";
import { StatCard, Badge } from "../components/ui/UI";
import "../components/ui/UI.css";
import "./Dashboard.css";
import { useGetDashboardReportQuery } from "../features/dashboard/dashboardApi";

export default function Dashboard() {
  const { data: services } = useGetServicesQuery();
  const { data: platforms } = useGetPlatformsQuery();
  const { data: statsData } = useGetLeadStatsQuery();
  const { data: leadsData } = useGetLeadsQuery({ limit: 6 });
  const { data: caseStudies } = useGetCaseStudiesQuery();

  const { data } = useGetDashboardReportQuery()

  console.log(data?.data)

  const stats = data?.data || {};

  const totalServices = stats.services ?? 0;
  const totalPlatforms = stats.platforms ?? 0;
  const totalSolutions = stats.solutions ?? 0;
  const totalIndustries = stats.industries ?? 0;
  const totalCaseStudies = stats.caseStudies ?? 0;
  const totalTestimonials = stats.testimonials ?? 0;
  const totalFaqs = stats.faqs ?? 0;
  const totalContent = stats.totalContent ?? 0;

  const publishedPlatforms = platforms?.data?.filter(p => p.isPublished).length ?? 0;

  const statusColor = {
    new: "blue", contacted: "yellow", qualified: "purple",
    proposal: "green", closed: "green", lost: "red",
  };

  return (
    <div className="dashboard">
      {/* Stats Row */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        <StatCard label="Services" value={totalServices}  color="blue"
          icon={<InboxSvg />} />
        <StatCard label="Platforms" value={totalPlatforms} color="green"
          icon={<LayersSvg />} />
        <StatCard label="Solutions Live" value={totalSolutions} color="purple"
          icon={<CpuSvg />} />
        <StatCard label="Industries" value={totalIndustries} color="yellow"
          icon={<TrophySvg />} />
      </div>

      <div className="dashboard__grid">
        {/* <div className="card">
          <div className="card__header">
            <span className="card__title">Recent Leads</span>
            <a href="/leads" className="dash-link">View all →</a>
          </div>
          <div className="card__body" style={{ padding: 0 }}>
            {leadsData?.data?.length === 0 && (
              <p style={{ padding: "20px", color: "var(--text-muted)", fontSize: 13 }}>No leads yet.</p>
            )}
            {leadsData?.data?.map((lead) => (
              <div key={lead._id} className="lead-row">
                <div className="lead-row__avatar">{lead.firstName?.charAt(0)}</div>
                <div className="lead-row__info">
                  <span className="lead-row__name">{lead.firstName} {lead.lastName}</span>
                  <span className="lead-row__company">{lead.company || lead.email}</span>
                </div>
                <div className="lead-row__right">
                  <Badge color={statusColor[lead.status] || "default"}>{lead.status}</Badge>
                  <span className="lead-row__type">{lead.leadType}</span>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Quick Links */}
        <div className="card">
          <div className="card__header">
            <span className="card__title">Quick Actions</span>
          </div>
          <div className="card__body">
            <div className="quick-actions">
              {[
                { label: "Add New Service", href: "/services", color: "blue" },
                { label: "Add New Platform", href: "/platforms", color: "purple" },
                { label: "Add Case Study", href: "/case-studies", color: "yellow" },
                // { label: "Add Blog Post", href: "/resources", color: "green" },
                // { label: "Manage FAQs", href: "/faqs", color: "red" },
                // { label: "View All Leads", href: "/leads", color: "blue" },
              ].map((action) => (
                <a key={action.label} href={action.href} className={`quick-action quick-action--${action.color}`}>
                  {action.label}
                  <span>→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lead Pipeline */}
      {/* {statsData?.data?.stats && (
        <div className="card" style={{ marginTop: 20 }}>
          <div className="card__header"><span className="card__title">Lead Pipeline</span></div>
          <div className="card__body">
            <div className="pipeline">
              {statsData.data.stats.map((s) => (
                <div key={s._id} className={`pipeline__stage pipeline__stage--${statusColor[s._id] || "default"}`}>
                  <span className="pipeline__count">{s.count}</span>
                  <span className="pipeline__label">{s._id}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}

const InboxSvg = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></svg>;
const LayersSvg = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>;
const CpuSvg = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /></svg>;
const TrophySvg = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="8 21 12 17 16 21" /><path d="M17 3H7l-1 8h12l-1-8z" /></svg>;
