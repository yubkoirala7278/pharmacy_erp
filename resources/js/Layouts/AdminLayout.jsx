import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminLayout({ title, children }) {
    const { auth, flash } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);

    const adminMenuItems = [
        { label: 'Dashboard', href: '/admin/dashboard', icon: 'grid' },
        { label: 'Roles', href: '/admin/roles', icon: 'shield' },
        { label: 'Users', href: '/admin/users', icon: 'users' },
        { label: 'Permissions', href: '/admin/permissions', icon: 'lock' },
    ];

    const NavIcon = ({ name }) => {
        const icons = {
            grid: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
            ),
            shield: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            users: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM16 20a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            lock: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
            menu: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            ),
            close: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            ),
            chevron: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            ),
        };
        return icons[name] || null;
    };

    const isActive = (href) => {
        return route().current() === href;
    };

    const handleLogout = () => {
        setUserDropdownOpen(false);
        router.post('/logout');
    };

    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-gray-100">
                {/* Mobile sidebar overlay */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <aside
                    className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white transition-transform z-40 lg:translate-x-0 ${
                        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    <div className="p-4 border-b border-gray-700">
                        <Link href="/" className="text-xl font-bold flex items-center gap-2">
                            <svg
                                className="w-8 h-8"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z"
                                />
                            </svg>
                            <span>PharmERP</span>
                        </Link>
                    </div>

                    <nav className="p-4 space-y-2">
                        {adminMenuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                                    route().current() === item.href
                                        ? 'bg-blue-600'
                                        : 'hover:bg-gray-800'
                                }`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <NavIcon name={item.icon} />
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </nav>
                </aside>

                {/* Main content */}
                <div className="lg:ml-64">
                    {/* Top bar */}
                    <header className="bg-white shadow">
                        <div className="flex items-center justify-between px-4 py-4">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <NavIcon name="menu" />
                            </button>

                            <div className="flex-1 lg:flex-none" />

                            {/* User dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-lg"
                                >
                                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                        {auth?.user?.name?.charAt(0) || 'U'}
                                    </div>
                                    <span className="hidden sm:inline text-sm font-medium">
                                        {auth?.user?.name || 'User'}
                                    </span>
                                    <NavIcon name="chevron" />
                                </button>

                                {userDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600 font-medium"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </header>

                    {/* Page content */}
                    <main className="p-6">
                        {/* Flash messages */}
                        {flash?.success && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-green-800">{flash.success}</p>
                            </div>
                        )}
                        {flash?.error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-800">{flash.error}</p>
                            </div>
                        )}
                        {flash?.warning && (
                            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <p className="text-yellow-800">{flash.warning}</p>
                            </div>
                        )}

                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}
