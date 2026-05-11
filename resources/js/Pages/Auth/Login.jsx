import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Head } from "@inertiajs/react";

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/login", {
            onSuccess: () => {
                // Redirect handled by Laravel
            },
        });
    };

    return (
        <>
            <Head title="Login" />
            <div className="login-container">
                {/* Background gradient */}
                <div className="login-bg">
                    <div className="login-gradient"></div>
                </div>

                {/* Card */}
                <div className="login-card">
                    {/* Header */}
                    <div className="login-header">
                        <div className="login-logo">
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
                        <h1 className="login-title">PharmERP</h1>
                        <p className="login-subtitle">Management System</p>
                        <p className="login-description">
                            Sign in to your account to continue
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="login-form">
                        {/* Email */}
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">
                                Email Address
                            </label>
                            <div className="input-wrapper">
                                <svg
                                    className="input-icon"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect
                                        x="2"
                                        y="4"
                                        width="20"
                                        height="16"
                                        rx="2"
                                    />
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
                                </svg>
                                <input
                                    type="email"
                                    id="email"
                                    className={`form-input ${
                                        errors.email ? "error" : ""
                                    }`}
                                    placeholder="admin@pharmacy.local"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                    disabled={processing}
                                />
                            </div>
                            {errors.email && (
                                <span className="error-message">
                                    {errors.email}
                                </span>
                            )}
                        </div>

                        {/* Password */}
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <div className="input-wrapper">
                                <svg
                                    className="input-icon"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect
                                        x="3"
                                        y="11"
                                        width="18"
                                        height="11"
                                        rx="2"
                                        ry="2"
                                    />
                                    <path d="M7 11V7a5 5 0 0110 0v4" />
                                </svg>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    className={`form-input ${
                                        errors.password ? "error" : ""
                                    }`}
                                    placeholder="••••••••"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    required
                                    disabled={processing}
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    disabled={processing}
                                >
                                    {showPassword ? (
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    ) : (
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <span className="error-message">
                                    {errors.password}
                                </span>
                            )}
                        </div>

                        {/* Remember Me */}
                        <div className="form-group checkbox">
                            <input
                                type="checkbox"
                                id="remember"
                                className="form-checkbox"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                                disabled={processing}
                            />
                            <label htmlFor="remember" className="checkbox-label">
                                Remember me
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn-login"
                            disabled={processing}
                        >
                            {processing ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="login-footer">
                        <p className="demo-creds">
                            <strong>Demo Credentials:</strong>
                            <br />
                            Email: admin@pharmacy.local
                            <br />
                            Password: password
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .login-container {
                    position: fixed;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    font-family: "Geist", -apple-system, sans-serif;
                }

                .login-bg {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                    z-index: -1;
                }

                .login-gradient {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(
                        circle at 30% 50%,
                        rgba(13, 148, 136, 0.1) 0%,
                        transparent 50%
                    );
                }

                .login-card {
                    width: 100%;
                    max-width: 420px;
                    background: #ffffff;
                    border-radius: 16px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    padding: 40px;
                    margin: 0 20px;
                }

                .login-header {
                    text-align: center;
                    margin-bottom: 32px;
                }

                .login-logo {
                    width: 56px;
                    height: 56px;
                    background: linear-gradient(135deg, #0d9488, #0284c7);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 16px;
                    color: white;
                }

                .login-logo svg {
                    width: 28px;
                    height: 28px;
                }

                .login-title {
                    font-size: 28px;
                    font-weight: 700;
                    color: #0f172a;
                    margin: 0 0 4px;
                    letter-spacing: -0.5px;
                }

                .login-subtitle {
                    font-size: 12px;
                    color: #64748b;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin: 0 0 16px;
                }

                .login-description {
                    font-size: 14px;
                    color: #64748b;
                    margin: 0;
                }

                .login-form {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .form-label {
                    font-size: 13px;
                    font-weight: 500;
                    color: #0f172a;
                }

                .input-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                }

                .input-icon {
                    position: absolute;
                    left: 12px;
                    width: 18px;
                    height: 18px;
                    color: #94a3b8;
                    pointer-events: none;
                }

                .form-input {
                    width: 100%;
                    padding: 10px 12px 10px 40px;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    font-size: 14px;
                    font-family: inherit;
                    transition: all 0.2s;
                    background: #f8fafc;
                }

                .form-input:focus {
                    outline: none;
                    border-color: #0d9488;
                    background: #ffffff;
                    box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
                }

                .form-input.error {
                    border-color: #dc2626;
                    background: #fef2f2;
                }

                .form-input.error:focus {
                    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
                }

                .form-input:disabled {
                    background: #f1f5f9;
                    color: #94a3b8;
                    cursor: not-allowed;
                }

                .toggle-password {
                    position: absolute;
                    right: 12px;
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #94a3b8;
                    transition: color 0.2s;
                }

                .toggle-password:hover:not(:disabled) {
                    color: #0f172a;
                }

                .toggle-password:disabled {
                    cursor: not-allowed;
                    opacity: 0.5;
                }

                .toggle-password svg {
                    width: 18px;
                    height: 18px;
                }

                .error-message {
                    font-size: 12px;
                    color: #dc2626;
                }

                .form-group.checkbox {
                    flex-direction: row;
                    align-items: center;
                    gap: 8px;
                }

                .form-checkbox {
                    width: 18px;
                    height: 18px;
                    cursor: pointer;
                    accent-color: #0d9488;
                }

                .checkbox-label {
                    font-size: 14px;
                    color: #64748b;
                    cursor: pointer;
                }

                .btn-login {
                    padding: 10px 16px;
                    background: linear-gradient(135deg, #0d9488, #0284c7);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                    box-shadow: 0 4px 12px rgba(13, 148, 136, 0.3);
                }

                .btn-login:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 16px rgba(13, 148, 136, 0.4);
                }

                .btn-login:active:not(:disabled) {
                    transform: translateY(0);
                }

                .btn-login:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                .login-footer {
                    margin-top: 24px;
                    padding-top: 20px;
                    border-top: 1px solid #e2e8f0;
                    text-align: center;
                }

                .demo-creds {
                    font-size: 12px;
                    color: #64748b;
                    line-height: 1.6;
                    margin: 0;
                }
            `}</style>
        </>
    );
}
