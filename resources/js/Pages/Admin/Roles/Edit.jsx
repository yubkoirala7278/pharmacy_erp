import React, { useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

// ─── Icon primitives ────────────────────────────────────────
function Icon({ d, size = 16, ...rest }) {
    return (
        <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...rest}
        >
            {d}
        </svg>
    );
}
const ChevronLeft = () => <Icon d={<path d="M15 18l-6-6 6-6" />} size={16} />;
const ChevronDown = ({ open }) => (
    <svg
        viewBox="0 0 24 24"
        width={16}
        height={16}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.22s ease",
        }}
    >
        <polyline points="6 9 12 15 18 9" />
    </svg>
);
const ShieldIcon = () => (
    <svg
        viewBox="0 0 24 24"
        width={18}
        height={18}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);
const InfoIcon = () => (
    <svg
        viewBox="0 0 24 24"
        width={18}
        height={18}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
);
const SparkleIcon = (props) => (
    <svg
        viewBox="0 0 24 24"
        width={14}
        height={14}
        fill="currentColor"
        {...props}
    >
        <path d="M12 2l2.4 7.6H22l-6.2 4.5 2.4 7.6L12 17.2l-6.2 4.5 2.4-7.6L2 9.6h7.6z" />
    </svg>
);
const TrashIcon = () => (
    <svg
        viewBox="0 0 24 24"
        width={16}
        height={16}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14H6L5 6" />
        <path d="M10 11v6M14 11v6" />
        <path d="M9 6V4h6v2" />
    </svg>
);

// ─── Indeterminate Checkbox ──────────────────────────────────
function Checkbox({ checked, indeterminate, onChange, onClick, disabled }) {
    const ref = React.useRef(null);
    React.useEffect(() => {
        if (ref.current) ref.current.indeterminate = indeterminate && !checked;
    }, [indeterminate, checked]);
    return (
        <span className="cr-checkbox-wrap">
            <input
                ref={ref}
                type="checkbox"
                checked={checked}
                onChange={onChange}
                onClick={onClick}
                disabled={disabled}
                className="cr-checkbox"
            />
            <span className="cr-checkbox-face">
                {checked && (
                    <svg viewBox="0 0 12 10" width="12" height="10" fill="none">
                        <polyline
                            points="1,5 4.5,8.5 11,1"
                            stroke="white"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
                {!checked && indeterminate && (
                    <svg viewBox="0 0 12 4" width="12" height="4" fill="none">
                        <line
                            x1="1"
                            y1="2"
                            x2="11"
                            y2="2"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                )}
            </span>
        </span>
    );
}

// ─── Module permission row ───────────────────────────────────
function ModuleRow({
    module,
    modulePermissions,
    selectedIds,
    onChange,
    disabled,
}) {
    const [open, setOpen] = useState(false);

    const ids = (Array.isArray(selectedIds) ? selectedIds : []).map((id) =>
        Number(id),
    );
    const selectedCount = modulePermissions.filter((p) =>
        ids.includes(Number(p.id)),
    ).length;
    const allSelected = selectedCount === modulePermissions.length;
    const someSelected = selectedCount > 0 && !allSelected;

    const handleToggleAll = (e) => {
        if (e && e.stopPropagation) e.stopPropagation();
        onChange("module", module, modulePermissions, allSelected);
    };

    return (
        <div className={`cr-module ${open ? "cr-module--open" : ""}`}>
            <div
                className="cr-module-header"
                onClick={() => setOpen((v) => !v)}
            >
                <div className="cr-module-left">
                    <button
                        type="button"
                        className="cr-module-checkbox-btn"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleToggleAll(e);
                        }}
                    >
                        <Checkbox
                            checked={allSelected}
                            indeterminate={someSelected}
                            onChange={handleToggleAll}
                            onClick={(e) => e.stopPropagation()}
                            disabled={disabled}
                        />
                    </button>
                    <span className="cr-module-name">
                        {formatGroupName(module)}
                    </span>
                    {selectedCount > 0 && (
                        <span className="cr-module-count-badge">
                            {selectedCount}/{modulePermissions.length}
                        </span>
                    )}
                </div>
                <div className="cr-module-right">
                    {selectedCount === 0 && (
                        <span className="cr-module-hint">
                            {modulePermissions.length} permission
                            {modulePermissions.length !== 1 ? "s" : ""}
                        </span>
                    )}
                    <ChevronDown open={open} />
                </div>
            </div>
            <div
                className={`cr-perm-grid-wrap ${open ? "cr-perm-grid-wrap--open" : ""}`}
            >
                <div className="cr-perm-grid">
                    {modulePermissions.map((perm) => {
                        const isChecked = ids.includes(Number(perm.id));
                        return (
                            <label
                                key={perm.id}
                                className={`cr-perm-item ${isChecked ? "cr-perm-item--checked" : ""}`}
                            >
                                <Checkbox
                                    checked={isChecked}
                                    indeterminate={false}
                                    onChange={() => onChange("single", perm.id)}
                                    disabled={disabled}
                                />
                                <span className="cr-perm-label">
                                    {perm.display_name}
                                </span>
                            </label>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

function formatGroupName(name) {
    return name.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// ─── Delete Confirmation Modal ───────────────────────────────
function DeleteModal({ roleName, onConfirm, onCancel, processing }) {
    return (
        <div className="cr-modal-backdrop">
            <div className="cr-modal">
                <div className="cr-modal-icon">
                    <TrashIcon />
                </div>
                <h3 className="cr-modal-title">Delete Role</h3>
                <p className="cr-modal-body">
                    Are you sure you want to delete{" "}
                    <strong>"{roleName}"</strong>? This action cannot be undone
                    and will remove this role from all assigned users.
                </p>
                <div className="cr-modal-actions">
                    <button
                        type="button"
                        className="cr-btn cr-btn--ghost"
                        onClick={onCancel}
                        disabled={processing}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="cr-btn cr-btn--danger"
                        onClick={onConfirm}
                        disabled={processing}
                    >
                        {processing ? (
                            <>
                                <span className="cr-spinner" />
                                Deleting…
                            </>
                        ) : (
                            <>
                                <TrashIcon />
                                Delete Role
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Step indicator ──────────────────────────────────────────
function StepBadge({ number, active, done }) {
    return (
        <span
            className={`cr-step-badge ${active ? "cr-step-badge--active" : ""} ${done ? "cr-step-badge--done" : ""}`}
        >
            {done ? (
                <svg viewBox="0 0 12 10" width="12" height="10" fill="none">
                    <polyline
                        points="1,5 4.5,8.5 11,1"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ) : (
                number
            )}
        </span>
    );
}

// ─── Main Component ──────────────────────────────────────────
export default function Edit({ role, permissions, rolePermissions }) {
    const {
        data,
        setData,
        put,
        delete: destroy,
        errors,
        processing,
    } = useForm({
        display_name: role.display_name || "",
        description: role.description || "",
        permissions: rolePermissions || [],
    });

    const [step, setStep] = useState(1);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const isSystemRole = role.name === "super_admin";
    const totalSelected = data.permissions.length;
    const totalPerms = Object.values(permissions).flat().length;
    const infoValid = data.display_name.trim();

    const handlePermChange = (type, idOrModule, modulePerms, allSelected) => {
        const currentPermissions = Array.isArray(data.permissions)
            ? data.permissions.map((id) => Number(id))
            : [];

        if (type === "single") {
            const id = Number(idOrModule);
            const isSelected = currentPermissions.includes(id);
            setData(
                "permissions",
                isSelected
                    ? currentPermissions.filter((permId) => permId !== id)
                    : [...currentPermissions, id],
            );
            return;
        }

        const ids = modulePerms.map((p) => Number(p.id));
        if (allSelected) {
            setData(
                "permissions",
                currentPermissions.filter((permId) => !ids.includes(permId)),
            );
        } else {
            setData("permissions", [
                ...new Set([...currentPermissions, ...ids]),
            ]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("admin.roles.update", role.id));
    };

    const handleDelete = () => {
        destroy(route("admin.roles.destroy", role.id), {
            onSuccess: () => {
                window.location.href = route("admin.roles.index");
            },
        });
    };

    return (
        <AppLayout title={`Edit ${role.display_name}`}>
            <div className="cr-root">
                {/* Back */}
                <Link href={route("admin.roles.index")} className="cr-back">
                    <ChevronLeft />
                    Back to Roles
                </Link>

                {/* Heading */}
                <div className="cr-heading">
                    <h1>
                        Edit Role
                        {isSystemRole && (
                            <span className="cr-system-badge">System Role</span>
                        )}
                    </h1>
                    <p>Update role details and manage assigned permissions.</p>
                </div>

                {/* Step tabs */}
                <div className="cr-steps">
                    <button
                        type="button"
                        className={`cr-step-btn ${step === 1 ? "cr-step-btn--active" : ""}`}
                        onClick={() => setStep(1)}
                    >
                        <StepBadge
                            number="1"
                            active={step === 1}
                            done={infoValid && step === 2}
                        />
                        Basic Info
                    </button>
                    <div className="cr-step-sep" />
                    <button
                        type="button"
                        className={`cr-step-btn ${step === 2 ? "cr-step-btn--active" : ""}`}
                        onClick={() => {
                            if (infoValid) setStep(2);
                        }}
                        style={{
                            opacity: infoValid ? 1 : 0.5,
                            cursor: infoValid ? "pointer" : "not-allowed",
                        }}
                    >
                        <StepBadge
                            number="2"
                            active={step === 2}
                            done={false}
                        />
                        Permissions
                        {totalSelected > 0 && (
                            <span className="cr-module-count-badge">
                                {totalSelected}
                            </span>
                        )}
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* ── Step 1: Basic Info ── */}
                    {step === 1 && (
                        <div className="cr-card" key="step1">
                            <div className="cr-card-head">
                                <div className="cr-card-head-icon">
                                    <InfoIcon />
                                </div>
                                <div>
                                    <h2>Role Information</h2>
                                    <p>
                                        Update the display name and description
                                        for this role
                                    </p>
                                </div>
                            </div>
                            <div className="cr-card-body">
                                <div className="cr-fields">
                                    <div className="cr-row">
                                        {/* Role Name — read only */}
                                        <div className="cr-field">
                                            <label
                                                htmlFor="name"
                                                className="cr-label"
                                            >
                                                Role Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                value={role.name}
                                                disabled
                                                className="cr-input cr-input--disabled"
                                            />
                                            <span className="cr-hint">
                                                Role names cannot be changed
                                            </span>
                                        </div>

                                        {/* Display Name */}
                                        <div className="cr-field">
                                            <label
                                                htmlFor="display_name"
                                                className="cr-label"
                                            >
                                                Display Name{" "}
                                                <span className="cr-required">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                id="display_name"
                                                value={data.display_name}
                                                onChange={(e) =>
                                                    setData(
                                                        "display_name",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="e.g. Manager Pharmacist"
                                                className={`cr-input ${errors.display_name ? "cr-input--error" : ""}`}
                                                disabled={processing}
                                            />
                                            {errors.display_name && (
                                                <span className="cr-error">
                                                    ⚠ {errors.display_name}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="cr-field">
                                        <label
                                            htmlFor="description"
                                            className="cr-label"
                                        >
                                            Description
                                            <span
                                                style={{
                                                    fontWeight: 400,
                                                    color: "var(--text-muted)",
                                                    fontSize: 12,
                                                }}
                                            >
                                                &nbsp;— optional
                                            </span>
                                        </label>
                                        <textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) =>
                                                setData(
                                                    "description",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="What is this role responsible for? Who should have it?"
                                            className={`cr-textarea ${errors.description ? "cr-textarea--error" : ""}`}
                                            disabled={processing}
                                        />
                                        {errors.description && (
                                            <span className="cr-error">
                                                ⚠ {errors.description}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── Step 2: Permissions ── */}
                    {step === 2 && (
                        <div className="cr-card" key="step2">
                            <div className="cr-card-head">
                                <div className="cr-card-head-icon">
                                    <ShieldIcon />
                                </div>
                                <div>
                                    <h2>Assign Permissions</h2>
                                    <p>
                                        Select what this role can do across each
                                        module
                                    </p>
                                </div>
                            </div>

                            {isSystemRole && (
                                <div className="cr-system-notice">
                                    ⚠️ System role permissions cannot be
                                    modified
                                </div>
                            )}

                            {/* Progress bar */}
                            <div className="cr-perm-summary">
                                <div className="cr-perm-summary-left">
                                    <span className="cr-perm-count">
                                        {totalSelected}
                                    </span>
                                    <span>
                                        of {totalPerms} permissions selected
                                    </span>
                                    <div className="cr-perm-prog-wrap">
                                        <div
                                            className="cr-perm-prog-fill"
                                            style={{
                                                width: totalPerms
                                                    ? `${(totalSelected / totalPerms) * 100}%`
                                                    : "0%",
                                            }}
                                        />
                                    </div>
                                </div>
                                {!isSystemRole && (
                                    <button
                                        type="button"
                                        className="cr-select-all-btn"
                                        onClick={() => {
                                            const all = Object.values(
                                                permissions,
                                            )
                                                .flat()
                                                .map((p) => p.id);
                                            if (totalSelected === totalPerms) {
                                                setData("permissions", []);
                                            } else {
                                                setData("permissions", all);
                                            }
                                        }}
                                    >
                                        {totalSelected === totalPerms
                                            ? "Deselect All"
                                            : "Select All"}
                                    </button>
                                )}
                            </div>

                            {/* Modules */}
                            <div className="cr-modules-list">
                                {Object.entries(permissions).map(
                                    ([module, modulePermissions]) => (
                                        <ModuleRow
                                            key={module}
                                            module={module}
                                            modulePermissions={
                                                modulePermissions
                                            }
                                            selectedIds={
                                                Array.isArray(data.permissions)
                                                    ? data.permissions
                                                    : []
                                            }
                                            onChange={handlePermChange}
                                            disabled={
                                                isSystemRole || processing
                                            }
                                        />
                                    ),
                                )}
                            </div>

                            {errors.permissions && (
                                <div className="cr-perm-error">
                                    ⚠ {errors.permissions}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ── Footer ── */}
                    <div className="cr-footer">
                        <div className="cr-footer-left">
                            {/* Delete button — only for non-system roles, shown on step 1 */}
                            {!isSystemRole && step === 1 && (
                                <button
                                    type="button"
                                    className="cr-btn cr-btn--danger-ghost"
                                    onClick={() => setShowDeleteConfirm(true)}
                                >
                                    <TrashIcon />
                                    Delete Role
                                </button>
                            )}
                            {step === 2 && totalSelected > 0 && (
                                <>
                                    <SparkleIcon
                                        style={{ color: "var(--teal)" }}
                                    />
                                    <span>
                                        <strong
                                            style={{ color: "var(--teal)" }}
                                        >
                                            {totalSelected}
                                        </strong>{" "}
                                        permissions assigned
                                    </span>
                                </>
                            )}
                        </div>

                        <div className="cr-footer-right">
                            {step === 1 ? (
                                <>
                                    <Link
                                        href={route("admin.roles.index")}
                                        className="cr-btn cr-btn--ghost"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="button"
                                        className="cr-btn cr-btn--secondary"
                                        onClick={() => {
                                            if (infoValid) setStep(2);
                                        }}
                                        disabled={!infoValid}
                                    >
                                        Next: Permissions →
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        type="button"
                                        className="cr-btn cr-btn--ghost"
                                        onClick={() => setStep(1)}
                                    >
                                        ← Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing || isSystemRole}
                                        className="cr-btn cr-btn--primary"
                                    >
                                        {processing ? (
                                            <>
                                                <span className="cr-spinner" />
                                                Saving…
                                            </>
                                        ) : (
                                            <>
                                                <ShieldIcon />
                                                Save Changes
                                            </>
                                        )}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </form>
            </div>

            {/* Delete Modal */}
            {showDeleteConfirm && (
                <DeleteModal
                    roleName={role.display_name}
                    onConfirm={handleDelete}
                    onCancel={() => setShowDeleteConfirm(false)}
                    processing={processing}
                />
            )}
        </AppLayout>
    );
}
