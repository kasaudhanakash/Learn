
import { useState } from 'react';
import './assets/Auth.css';

function Auth({ onBack, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const endpoint = isLogin ? 'login' : 'register';

      const payload = isLogin
        ? {
            email: formData.email.trim(),
            password: formData.password,
          }
        : {
            name: formData.name.trim(),
            email: formData.email.trim(),
            password: formData.password,
          };

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'}/api/auth/${endpoint}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

const responseText = await response.text();

let data = {};

try {
  data = JSON.parse(responseText);
} catch {
  data = { message: responseText };
}

if (!response.ok) {
  throw new Error(data.message || 'Request failed');
}

if (isLogin) {
  if (!data.token) {
    throw new Error('Login response mein token nahi mila.');
  }

  localStorage.setItem('learnhub-token', data.token);

  alert(data.message || 'Login successful');

  onLoginSuccess?.({
    name: data.name,
    email: data.email,
    token: data.token,
  });

  return;
}

alert(data.message || 'Registration successful');
      if (!isLogin) {
        setIsLogin(true);
        setFormData({
          name: '',
          email: formData.email,
          password: '',
        });
      } else {
        // Backend currently returns a success message,
        // not a login token or authenticated session.
        // Full signed-in navigation needs a session/token flow.
        setFormData({
          name: '',
          email: '',
          password: '',
        });
      }
    } catch (error) {
      alert(error.message || 'Backend se connection nahi ho paya.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <button
          type="button"
          className="back-btn"
          onClick={onBack}
        >
          ← Back to ShikshaHub
        </button>

        <h1>ShikshaHub</h1>

        <h2>{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>

        <p>
          {isLogin
            ? 'Login to continue your learning journey.'
            : 'Register to start learning with ShikshaHub.'}
        </p>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              minLength={2}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            minLength={8}
            required
          />

          <button type="submit" disabled={loading}>
            {loading
              ? 'Please wait...'
              : isLogin
                ? 'Login'
                : 'Register'}
          </button>
        </form>

        <p className="auth-switch">
          {isLogin
            ? "Don't have an account?"
            : 'Already registered?'}{' '}

          <button
            type="button"
            onClick={() => {
              setIsLogin((previous) => !previous);
              setFormData({
                name: '',
                email: '',
                password: '',
              });
            }}
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Auth;
