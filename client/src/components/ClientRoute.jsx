import React from 'react';
import ProtectedRoute from './ProtectedRoute';

const ClientRoute = ({ children }) => {
    return <ProtectedRoute roles={['client', 'admin']}>{children}</ProtectedRoute>;
};

export default ClientRoute;
