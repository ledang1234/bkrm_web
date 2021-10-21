import React from 'react'

//import project
import MenuGroup from './MenuGroup/MenuGroup';

//import icon
import cartIcon from "../../assets/img/icon/cart1.png"
import invoiceIcon from "../../assets/img/icon/invoice.png"
import invoiceReturnIcon from "../../assets/img/icon/invoiceReturn.png"

import importIcon from '../../assets/img/icon/inventory1.png'
import inventoryIcon from '../../assets/img/icon/inventory2.png'
import inventoryOrderIcon from '../../assets/img/icon/inventoryOrder1.png'
import inventoryReturnOrderIcon from '../../assets/img/icon/inventoryReturn.png'
import suplierIcon from '../../assets/img/icon/supplier4.png'

import employeeIcon from '../../assets/img/icon/employee7.png'
import scheduleIcon from '../../assets/img/icon/schedule3.png'

import historyIcon from "../../assets/img/icon/history3.png"
import branchIcon from "../../assets/img/icon/branch4.png"
import customerIcon from "../../assets/img/icon/customer.png"
import statisticIcon from "../../assets/img/icon/statistics.png"

const salesModule = {
  title:"Bán hàng",
  children:  [
      { title: "Giỏ Hàng", url: "/home/sales/cart", icon:cartIcon},
      { title: "Hóa Đơn", url: "/home/sales/invoice", icon:  invoiceIcon},
      { title: "Đơn Trả", url: "/home/sales/invoice-return", icon: invoiceReturnIcon},
    ]
  };
 
  const inventoryModule = {
    title:"Kho Hàng",
    children: [
        { title: "Nhập Hàng", url: "/home/inventory/import",icon:  importIcon },
        { title: "Kho Hàng", url: "/home/inventory/inventory" ,icon: inventoryIcon},
        { title: "Đơn Nhập Hàng", url: "/home/inventory/receipt" ,icon:  inventoryOrderIcon},
        { title: "Đơn Trả Hàng Nhập", url: "/home/inventory/returns",icon: inventoryReturnOrderIcon},
        { title: "Nhà Cung Cấp", url: "/home/inventory/supplier",icon:  suplierIcon },
      ]
    };
  const hrModule = {
    title:"Nhân Sự",
    children: [
        { title: "Nhân Viên", url: "/home/hr/employee",icon:  employeeIcon},
        { title: "Ca Làm Việc", url: "/home/hr/schedule",icon:  scheduleIcon},
      ]
    };
  const reportModule = {
      title:"Quản Lý",
      children:[
        { title: "Lịch Sử Hoạt Động", url: "/home/manager/history" ,icon:  historyIcon},
        { title: "Cửa Hàng", url: "/home/manager/branch",icon:  branchIcon},
        { title: "Khách Hàng", url: "/home/manager/customer" ,icon:  customerIcon},
        { title: "Thống Kê", url: "/home/manager/report" ,icon: statisticIcon},
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
