import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";

const navItems = [
    {
        group: "Main",
        items: [
            { label: "Dashboard", href: "/", icon: "grid" },
            { label: "Point of Sale", href: "/pos", icon: "shopping-cart" },
        ],
    },
    {
        group: "Inventory",
        items: [
            { label: "Medicines", href: "/medicines", icon: "pill" },
            { label: "Categories", href: "/categories", icon: "tag" },
            { label: "Suppliers", href: "/suppliers", icon: "truck" },
            {
                label: "Purchase Orders",
                href: "/purchase-orders",
                icon: "clipboard-list",
            },
            {
                label: "Stock Alerts",
                href: "/stock-alerts",
                icon: "alert-triangle",
            },
        ],
    },
    {
        group: "Sales",
        items: [
            { label: "Sales History", href: "/sales", icon: "receipt" },
            {
                label: "Prescriptions",
                href: "/prescriptions",
                icon: "notes-medical",
            },
            { label: "Customers", href: "/customers", icon: "users" },
        ],
    },
    {
        group: "Finance",
        items: [
            { label: "Reports", href: "/reports", icon: "chart-bar" },
            { label: "Expenses", href: "/expenses", icon: "cash" },
            { label: "Invoices", href: "/invoices", icon: "file-invoice" },
        ],
    },
    {
        group: "System",
        items: [
            { label: "Staff", href: "/staff", icon: "id-badge" },
            { label: "Settings", href: "/settings", icon: "settings" },
        ],
    },
];

function NavIcon({ name }) {
    const icons = {
        grid: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
        ),
        "shopping-cart": (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
            </svg>
        ),
        pill: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M10.5 20H4a2 2 0 01-2-2V6a2 2 0 012-2h16a2 2 0 012 2v7" />
                <circle cx="18" cy="18" r="4" />
                <path d="M15.5 18h5" />
            </svg>
        ),
        tag: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
            </svg>
        ),
        truck: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <rect x="1" y="3" width="15" height="13" rx="1" />
                <path d="M16 8h4l3 4v5h-7V8z" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
        ),
        "clipboard-list": (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                <rect x="9" y="3" width="6" height="4" rx="1" />
                <line x1="9" y1="12" x2="15" y2="12" />
                <line x1="9" y1="16" x2="13" y2="16" />
            </svg>
        ),
        "alert-triangle": (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
        ),
        receipt: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z" />
                <line x1="8" y1="10" x2="16" y2="10" />
                <line x1="8" y1="14" x2="16" y2="14" />
            </svg>
        ),
        "notes-medical": (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                <rect x="9" y="3" width="6" height="4" rx="1" />
                <line x1="12" y1="11" x2="12" y2="15" />
                <line x1="10" y1="13" x2="14" y2="13" />
            </svg>
        ),
        users: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87" />
                <path d="M16 3.13a4 4 0 010 7.75" />
            </svg>
        ),
        "chart-bar": (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
                <line x1="2" y1="20" x2="22" y2="20" />
            </svg>
        ),
        cash: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <rect x="2" y="6" width="20" height="12" rx="2" />
                <circle cx="12" cy="12" r="2" />
                <path d="M6 12h.01M18 12h.01" />
            </svg>
        ),
        "file-invoice": (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="8" y1="13" x2="16" y2="13" />
                <line x1="8" y1="17" x2="12" y2="17" />
            </svg>
        ),
        "id-badge": (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <rect x="4" y="2" width="16" height="20" rx="2" />
                <circle cx="12" cy="10" r="3" />
                <path d="M7 21v-1a5 5 0 0110 0v1" />
            </svg>
        ),
        settings: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
            </svg>
        ),
        bell: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>
        ),
        search: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
        ),
        menu: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
        ),
        x: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
        ),
        chevron: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polyline points="6 9 12 15 18 9" />
            </svg>
        ),
    };
    return <span className="nav-icon">{icons[name] || icons["grid"]}</span>;
}

function IconFullscreen() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M8 3H5a2 2 0 00-2 2v3" />
            <path d="M21 8V5a2 2 0 00-2-2h-3" />
            <path d="M3 16v3a2 2 0 002 2h3" />
            <path d="M16 21h3a2 2 0 002-2v-3" />
        </svg>
    );
}

function IconExitFullscreen() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M8 3v3a2 2 0 01-2 2H3" />
            <path d="M21 8h-3a2 2 0 01-2-2V3" />
            <path d="M3 16h3a2 2 0 012 2v3" />
            <path d="M16 21v-3a2 2 0 012-2h3" />
        </svg>
    );
}

export default function AppLayout({ children, title = "Dashboard" }) {
    const [sidebarOpen, setSidebarOpen] = useState(false); // mobile drawer
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // desktop collapse
    const [isFullscreen, setIsFullscreen] = useState(false);
    const { url } = usePage();

    const isActive = (href) => {
        if (href === "/") return url === "/";
        return url.startsWith(href);
    };

    // Desktop hamburger: collapse/expand sidebar
    const toggleSidebar = () => {
        if (window.innerWidth <= 768) {
            setSidebarOpen((v) => !v);
        } else {
            setSidebarCollapsed((v) => !v);
        }
    };

    // Fullscreen toggle
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement
                .requestFullscreen()
                .then(() => setIsFullscreen(true));
        } else {
            document.exitFullscreen().then(() => setIsFullscreen(false));
        }
    };

    // Sync state if user presses Escape
    useState(() => {
        const handler = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener("fullscreenchange", handler);
        return () => document.removeEventListener("fullscreenchange", handler);
    }, []);

    const collapsed = sidebarCollapsed;

    return (
        <div
            className={`app-layout ${collapsed ? "sidebar-is-collapsed" : ""}`}
        >
            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`sidebar ${sidebarOpen ? "sidebar--open" : ""} ${collapsed ? "sidebar--collapsed" : ""}`}
            >
                <div className="sidebar-header">
                    <div className={`logo ${collapsed ? "logo--hidden" : ""}`}>
                        <div className="logo-icon">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z" />
                                <line x1="12" y1="8" x2="12" y2="16" />
                                <line x1="8" y1="12" x2="16" y2="12" />
                            </svg>
                        </div>
                        <div className="logo-text">
                            <span className="logo-name">PharmERP</span>
                            <span className="logo-sub">Management System</span>
                        </div>
                    </div>
                    {/* Mobile close button */}
                    <button
                        className="sidebar-close"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <NavIcon name="x" />
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map((group) => (
                        <div key={group.group} className="nav-group">
                            <span className="nav-group-label">
                                {group.group}
                            </span>
                            {group.items.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`nav-item ${isActive(item.href) ? "nav-item--active" : ""}`}
                                    onClick={() => setSidebarOpen(false)}
                                    title={collapsed ? item.label : undefined}
                                >
                                    <NavIcon name={item.icon} />
                                    <span className="nav-label">
                                        {item.label}
                                    </span>
                                    {/* {item.label === "Stock Alerts" && (
                                        <span className="nav-badge">3</span>
                                    )} */}
                                </Link>
                            ))}
                        </div>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <div
                        className="user-card"
                        title={
                            collapsed ? "Admin Khan — Pharmacist" : undefined
                        }
                    >
                        <div className="user-avatar">AK</div>
                        <div className="user-info">
                            <span className="user-name">Admin Khan</span>
                            <span className="user-role">Pharmacist</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="main-wrapper">
                {/* Top bar */}
                <header className="topbar">
                    <div className="topbar-left">
                        {/* Hamburger — always visible on desktop & mobile */}
                        <button
                            className="topbar-menu-btn topbar-menu-btn--always"
                            onClick={toggleSidebar}
                            title={
                                collapsed
                                    ? "Expand sidebar"
                                    : "Collapse sidebar"
                            }
                        >
                            <NavIcon name="menu" />
                        </button>
                        <div className="topbar-search">
                            <NavIcon name="search" />
                            <input
                                type="text"
                                placeholder="Search medicines, orders..."
                            />
                        </div>
                    </div>
                    <div className="topbar-right">
                        {/* Fullscreen button */}
                        <button
                            className="topbar-icon-btn"
                            onClick={toggleFullscreen}
                            title={
                                isFullscreen
                                    ? "Exit fullscreen"
                                    : "Enter fullscreen"
                            }
                        >
                            <span className="nav-icon">
                                {isFullscreen ? (
                                    <IconExitFullscreen />
                                ) : (
                                    <IconFullscreen />
                                )}
                            </span>
                        </button>

                        <button className="topbar-icon-btn">
                            <NavIcon name="bell" />
                            <span className="notif-dot"></span>
                        </button>
                        <div className="topbar-divider" />
                        <div className="topbar-user">
                            <div className="topbar-avatar">AK</div>
                            <span className="topbar-username">Admin Khan</span>
                            <NavIcon name="chevron" />
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="page-content">
                    <div className="page-header">
                        <h1 className="page-title">{title}</h1>
                        <div className="breadcrumb">
                            <span>PharmERP</span>
                            <span className="breadcrumb-sep">/</span>
                            <span className="breadcrumb-active">{title}</span>
                        </div>
                    </div>
                    {children}
                </main>
            </div>
        </div>
    );
}
