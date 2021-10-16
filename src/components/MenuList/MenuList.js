import React from 'react'
import MenuGroup from './MenuGroup/MenuGroup';
// import logo from '../../assets/img/icon/crownIcon.png'; 

import { IconBrandFramer, IconTypography, IconPalette, IconShadow, IconWindmill, IconLayoutGridAdd } from '@tabler/icons';

const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
    IconBrandFramer,
    IconLayoutGridAdd
};

  const salesModule = {
    title:"Nhân Sự",
    children:  [
        { title: "Giỏ Hàng", url: "/home/inventory",icon: icons.IconTypography},
        { title: "Hóa Đơn", url: "/home/inventory",icon: icons.IconTypography },
        { title: "Đơn Trả", url: "/home/inventory",icon: icons.IconTypography },
      ]
    };
 
  const inventoryModule = {
    title:"Kho Hàng",
    children: [
        { title: "Nhập Hàng", url: "/home/inventory/import",icon: icons.IconTypography },
        { title: "Kho Hàng", url: "/home/inventory/inventory" ,icon: icons.IconTypography},
        { title: "Đơn Nhập Hàng", url: "/home/inventory/receipt" ,icon: icons.IconTypography},
        { title: "Đơn Trả Hàng Nhập", url: "/home/inventory/returns",icon: icons.IconTypography },
        { title: "Nhà Cung Cấp", url: "/home/inventory/supplier",icon: icons.IconTypography },
        { title: "Danh Mục Sản Phẩm", url: "/home/inventory/category" ,icon: icons.IconTypography},
      ]
    };
  const hrModule = {
    title:"Nhân Sự",
    children: [
        { title: "Nhân Viên", url: "/home/inventory",icon: icons.IconTypography },
        { title: "Ca Làm Việc", url: "/home/inventory",icon: icons.IconTypography },
      ]
    };
  const reportModule = {
      title:"Quản Lý",
      children:[
        { title: "Lịch Sử Hoạt Động", url: "/home/inventory" ,icon: icons.IconTypography},
        { title: "Cửa Hàng", url: "/home/inventory",icon: icons.IconTypography },
        { title: "Khách Hàng", url: "/home/inventory" ,icon: icons.IconTypography},
        { title: "Thống Kê", url: "/home/inventory" },
      ]
  };
  const menuItems = {
    items: [salesModule, inventoryModule, hrModule, reportModule]
};

const MenuList = () => {
    const navItems = menuItems.items.map((item) => {
        return <MenuGroup  item={item} />;
    });
    return navItems;
}

export default MenuList
