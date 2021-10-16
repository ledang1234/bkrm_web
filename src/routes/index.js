import { useRoutes } from 'react-router-dom';

// routes
import HomeRoutes from './HomeRoutes';

// ===========================|| ROUTING RENDER ||=========================== //

export default function ThemeRoutes() {
    return useRoutes([HomeRoutes]);
}
