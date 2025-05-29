import React from 'react';
import { Link } from 'react-router-dom';

const AuthHeader: React.FC = () => (
  <nav className="navbar navbar-light bg-white shadow-sm fixed-top">
    <div className="container-fluid d-flex justify-content-between align-items-center px-4">
      <Link className="navbar-brand fw-bold text-primary" to="/">ClassiPlace</Link>
    </div>
  </nav>
);

export default AuthHeader; 