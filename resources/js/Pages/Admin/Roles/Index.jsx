import React, { useState, useEffect, useRef } from "react";
import { Link, router } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { route } from "ziggy-js";

export default function Index({ roles, filters }) {
    const [search, setSearch] = useState(filters.search || "");
    const [confirmDelete, setConfirmDelete] = useState(null);
    const debounceTimer = useRef(null);
    const isFirstRender = useRef(true);

    useEffect(() => {
        // Skip firing on initial mount if search is already populated from filters
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => {
            router.get(
                route("admin.roles.index"),
                { search },
                { preserveState: true, preserveScroll: true, replace: true },
            );
        }, 300);

        return () => clearTimeout(debounceTimer.current);
    }, [search]);

    const handleClearSearch = () => {
        setSearch("");
    };

    const handleDelete = (role) => {
        setConfirmDelete(null);
        router.delete(route("admin.roles.destroy", role.id), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout title="Roles Management">
            <div className="module-wrapper">
                {/* ── Page actions bar ── */}
                <div className="module-actions-bar">
                    {/* Search — debounced, no submit button */}
                    <div className="module-search">
                        <span className="module-search-icon">
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
                        </span>
                        <input
                            type="text"
                            placeholder="Search by role name or display name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="module-search-input"
                        />
                        {search && (
                            <button
                                type="button"
                                onClick={handleClearSearch}
                                className="module-search-clear"
                                title="Clear"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* Create button */}
                    <Link
                        href={route("admin.roles.create")}
                        className="btn btn--primary"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ width: 16, height: 16 }}
                        >
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Create Role
                    </Link>
                </div>

                {/* ── Table card ── */}
                <div className="card" style={{ padding: 0 }}>
                    {roles.data.length > 0 ? (
                        <>
                            <div className="table-wrapper">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Role Name</th>
                                            <th>Display Name</th>
                                            <th>Permissions</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {roles.data.map((role, index) => (
                                            <tr key={role.id}>
                                                <td
                                                    className="td-muted"
                                                    style={{ width: 48 }}
                                                >
                                                    {(roles.current_page - 1) *
                                                        roles.per_page +
                                                        index +
                                                        1}
                                                </td>
                                                <td>
                                                    <span className="role-name-badge">
                                                        {role.name}
                                                    </span>
                                                </td>
                                                <td style={{ fontWeight: 500 }}>
                                                    {role.display_name}
                                                </td>
                                                <td>
                                                    <span className="perm-badge">
                                                        {
                                                            role.permissions
                                                                .length
                                                        }{" "}
                                                        permissions
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="action-btns">
                                                        <Link
                                                            href={route(
                                                                "admin.roles.edit",
                                                                role.id,
                                                            )}
                                                            className="action-btn action-btn--edit"
                                                        >
                                                            <svg
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="1.8"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            >
                                                                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                                                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                            </svg>
                                                            Edit
                                                        </Link>

                                                        {role.name !==
                                                            "super_admin" && (
                                                            <button
                                                                type="button"
                                                                className="action-btn action-btn--delete"
                                                                onClick={() =>
                                                                    setConfirmDelete(
                                                                        role,
                                                                    )
                                                                }
                                                            >
                                                                <svg
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="1.8"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                >
                                                                    <polyline points="3 6 5 6 21 6" />
                                                                    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                                                                    <path d="M10 11v6M14 11v6" />
                                                                    <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                                                                </svg>
                                                                Delete
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {roles.last_page > 1 && (
                                <div className="pagination">
                                    <span className="pagination-info">
                                        Showing{" "}
                                        {(roles.current_page - 1) *
                                            roles.per_page +
                                            1}
                                        –
                                        {Math.min(
                                            roles.current_page * roles.per_page,
                                            roles.total,
                                        )}{" "}
                                        of {roles.total}
                                    </span>
                                    <div className="pagination-btns">
                                        <Link
                                            href={route("admin.roles.index", {
                                                page: roles.current_page - 1,
                                                search,
                                            })}
                                            className={`page-btn ${roles.current_page === 1 ? "page-btn--disabled" : ""}`}
                                            onClick={(e) =>
                                                roles.current_page === 1 &&
                                                e.preventDefault()
                                            }
                                        >
                                            ← Prev
                                        </Link>

                                        {Array.from({
                                            length: roles.last_page,
                                        }).map((_, i) => {
                                            const page = i + 1;
                                            const cur = roles.current_page;
                                            if (
                                                page === 1 ||
                                                page === roles.last_page ||
                                                (page >= cur - 1 &&
                                                    page <= cur + 1)
                                            ) {
                                                return (
                                                    <Link
                                                        key={page}
                                                        href={route(
                                                            "admin.roles.index",
                                                            {
                                                                page,
                                                                search,
                                                            },
                                                        )}
                                                        className={`page-btn ${cur === page ? "page-btn--active" : ""}`}
                                                    >
                                                        {page}
                                                    </Link>
                                                );
                                            }
                                            if (
                                                page === cur - 2 ||
                                                page === cur + 2
                                            ) {
                                                return (
                                                    <span
                                                        key={page}
                                                        className="page-ellipsis"
                                                    >
                                                        …
                                                    </span>
                                                );
                                            }
                                            return null;
                                        })}

                                        <Link
                                            href={route("admin.roles.index", {
                                                page: roles.current_page + 1,
                                                search,
                                            })}
                                            className={`page-btn ${roles.current_page === roles.last_page ? "page-btn--disabled" : ""}`}
                                            onClick={(e) =>
                                                roles.current_page ===
                                                    roles.last_page &&
                                                e.preventDefault()
                                            }
                                        >
                                            Next →
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="empty-state">
                            <div className="empty-state-icon">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                                    <path d="M16 3.13a4 4 0 010 7.75" />
                                </svg>
                            </div>
                            <p className="empty-state-title">No roles found</p>
                            <p className="empty-state-sub">
                                {search
                                    ? `No results for "${search}"`
                                    : "Get started by creating your first role."}
                            </p>
                            {!search && (
                                <Link
                                    href={route("admin.roles.create")}
                                    className="btn btn--primary"
                                    style={{ marginTop: 16 }}
                                >
                                    Create the first role
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* ── Delete confirm modal ── */}
            {confirmDelete && (
                <div
                    className="modal-backdrop"
                    onClick={() => setConfirmDelete(null)}
                >
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-icon modal-icon--danger">
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
                        </div>
                        <h3 className="modal-title">Delete Role</h3>
                        <p className="modal-body">
                            Are you sure you want to delete{" "}
                            <strong>{confirmDelete.display_name}</strong>? This
                            will remove all associated permissions and cannot be
                            undone.
                        </p>
                        <div className="modal-actions">
                            <button
                                className="btn btn--ghost"
                                onClick={() => setConfirmDelete(null)}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn--danger"
                                onClick={() => handleDelete(confirmDelete)}
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
