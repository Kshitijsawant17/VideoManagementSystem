import React from 'react';
import ProtectedRoute from './ProtectedRoute';

const AdminRoute = ({ children }) => {
    return <ProtectedRoute roles={['admin']}>{children}</ProtectedRoute>;
};

export default AdminRoute;
