import React, { lazy } from 'react';

// project imports

import HomePage from '../pages/HomePage/HomePage'
import Cart from '../views/SalesView/Cart/Cart'
// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = (lazy(() => import('views/sample-page')));

// ===========================|| MAIN ROUTING ||=========================== //

const MainRoutes = {
    path: '/',
    element: <HomePage />,
    children: [
        {
            path: '/',
            element: <Cart />
        },
        
    ]
};

export default MainRoutes;
