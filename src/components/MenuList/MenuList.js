import React from 'react'
import MenuGroup from './MenuGroup/MenuGroup';

import { IconBrandFramer, IconTypography, IconPalette, IconShadow, IconWindmill, IconLayoutGridAdd } from '@tabler/icons';

const salesModule = {
  title:"Bán hàng",
  children:  [
      { title: "Giỏ Hàng", url: "/home/inventory", icon:IconTypography},
      { title: "Hóa Đơn", url: "/home/inventory", icon:  IconTypography},
      { title: "Đơn Trả", url: "/home/inventory", icon: IconTypography},
    ]
  };
 
  const inventoryModule = {
    title:"Kho Hàng",
    children: [
        { title: "Nhập Hàng", url: "/home/inventory/import",icon:  IconTypography },
        { title: "Kho Hàng", url: "/home/inventory/inventory" ,icon: IconTypography},
        { title: "Đơn Nhập Hàng", url: "/home/inventory/receipt" ,icon:  IconTypography},
        { title: "Đơn Trả Hàng Nhập", url: "/home/inventory/returns",icon: IconTypography},
        { title: "Nhà Cung Cấp", url: "/home/inventory/supplier",icon:  IconTypography },
        { title: "Danh Mục Sản Phẩm", url: "/home/inventory/category" ,icon: IconTypography},
      ]
    };
  const hrModule = {
    title:"Nhân Sự",
    children: [
        { title: "Nhân Viên", url: "/home/inventory",icon:  IconTypography},
        { title: "Ca Làm Việc", url: "/home/inventory",icon:  IconTypography},
      ]
    };
  const reportModule = {
      title:"Quản Lý",
      children:[
        { title: "Lịch Sử Hoạt Động", url: "/home/inventory" ,icon:  IconTypography},
        { title: "Cửa Hàng", url: "/home/inventory",icon:  IconTypography},
        { title: "Khách Hàng", url: "/home/inventory" ,icon:  IconTypography},
        { title: "Thống Kê", url: "/home/inventory" ,icon: IconTypography},
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
