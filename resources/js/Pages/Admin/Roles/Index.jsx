import React, { useState, useEffect, useRef } from "react";
import { Link, router } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { route } from "ziggy-js";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";

export default function Index({ roles, filters }) {
    const [search, setSearch] = useState(filters.search || "");
    const [confirmDelete, setConfirmDelete] = useState(null);
    const debounceTimer = useRef(null);
    const isFirstRender = useRef(true);

    // ── Debounced search ──────────────────────────────────────
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => {
            router.get(
                route("admin.roles.index"),
                { search, page: 1 },
                { preserveState: true, preserveScroll: true, replace: true },
            );
        }, 300);
        return () => clearTimeout(debounceTimer.current);
    }, [search]);

    // ── Server-side page change ───────────────────────────────
    const onPage = (e) => {
        // PrimeReact gives 0-based page index
        router.get(
            route("admin.roles.index"),
            { search, page: e.page + 1 },
            { preserveState: true, preserveScroll: true },
        );
    };

    // ── Server-side sort ──────────────────────────────────────
    const onSort = (e) => {
        router.get(
            route("admin.roles.index"),
            {
                search,
                page: 1,
                sort_field: e.sortField,
                sort_order: e.sortOrder === 1 ? "asc" : "desc",
            },
            { preserveState: true, preserveScroll: true },
        );
    };

    // ── Delete ────────────────────────────────────────────────
    const handleDelete = (role) => {
        setConfirmDelete(null);
        router.delete(route("admin.roles.destroy", role.id), {
            preserveScroll: true,
        });
    };

    // ── Column body templates ─────────────────────────────────
    const indexBody = (_, { rowIndex }) => {
        const offset = (roles.current_page - 1) * roles.per_page;
        return (
            <span className="text-color-secondary text-sm">
                {offset + rowIndex + 1}
            </span>
        );
    };

    const roleNameBody = (row) => (
        <span className="role-name-badge">{row.name}</span>
    );

    const displayNameBody = (row) => (
        <span className="font-medium">{row.display_name}</span>
    );

    const permissionsBody = (row) => (
        <Tag
            value={`${row.permissions.length} permissions`}
            severity="info"
            rounded
        />
    );

    const actionsBody = (row) => (
        <div className="action-btns">
            <Link
                href={route("admin.roles.edit", row.id)}
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

            {row.name !== "super_admin" && (
                <button
                    type="button"
                    className="action-btn action-btn--delete"
                    onClick={() => setConfirmDelete(row)}
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
    );

    // ── Table header slot ─────────────────────────────────────
    const tableHeader = (
        <div className="module-actions-bar" style={{ marginBottom: 0 }}>
            <div
                style={{
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                }}
            >
                <IconField iconPosition="left">
                    <InputIcon
                        className="pi pi-search"
                        style={{ lineHeight: 0 }}
                    />
                    <InputText
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by role name or display name…"
                        className="module-search-input"
                        style={{ paddingRight: search ? "2.25rem" : undefined }}
                    />
                </IconField>
                {search && (
                    <button
                        type="button"
                        onClick={() => setSearch("")}
                        className="module-search-clear"
                        title="Clear"
                        style={{
                            position: "absolute",
                            right: "0.6rem",
                            top: "50%",
                            transform: "translateY(-50%)",
                        }}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            width={14}
                            height={14}
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                )}
            </div>

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
    );

    // ── Empty state ───────────────────────────────────────────
    const emptyMessage = (
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
    );

    return (
        <AppLayout title="Roles Management">
            <div className="module-wrapper">
                <div className="card" style={{ padding: 0 }}>
                    <DataTable
                        value={roles.data}
                        header={tableHeader}
                        emptyMessage={emptyMessage}
                        // ── Server-side ──
                        lazy
                        paginator
                        rows={roles.per_page}
                        totalRecords={roles.total}
                        first={(roles.current_page - 1) * roles.per_page}
                        onPage={onPage}
                        rowsPerPageOptions={[15, 30, 50]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
                        currentPageReportTemplate="{first}–{last} of {totalRecords} roles"
                        // ── Sort ──
                        onSort={onSort}
                        sortField={filters.sort_field || null}
                        sortOrder={filters.sort_order === "desc" ? -1 : 1}
                        // ── Appearance ──
                        stripedRows
                        showGridlines={false}
                        tableStyle={{ minWidth: "42rem" }}
                    >
                        <Column
                            header="#"
                            body={indexBody}
                            style={{ width: 56 }}
                        />
                        <Column
                            field="name"
                            header="Role Name"
                            body={roleNameBody}
                            sortable
                        />
                        <Column
                            field="display_name"
                            header="Display Name"
                            body={displayNameBody}
                            sortable
                        />
                        <Column
                            header="Permissions"
                            body={permissionsBody}
                            style={{ width: 160 }}
                        />
                        <Column
                            header="Actions"
                            body={actionsBody}
                            style={{ width: 180 }}
                        />
                    </DataTable>
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
