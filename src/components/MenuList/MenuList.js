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
import orderIcon from '../../assets/img/icon/python.png'
import orderListIcon from '../../assets/img/icon/check1.png'
import checkIcon from '../../assets/img/icon/magnifiers.png'
import checkHistoryIcon from '../../assets/img/icon/hourglass.png'


import employeeIcon from '../../assets/img/icon/employee7.png'
import scheduleIcon from '../../assets/img/icon/schedule3.png'

import historyIcon from "../../assets/img/icon/piggy-bank.png"
import branchIcon from "../../assets/img/icon/branch5.png"
import customerIcon from "../../assets/img/icon/customer.png"
import statisticIcon from "../../assets/img/icon/statistics.png"

import webIcon from "../../assets/img/icon/www.png"

import deliveryIcon from "../../assets/img/icon/history3.png"


const salesModule = {
  title:"Bán hàng",
  children:  [
      {id:1, title: "Giỏ Hàng", url: "/home/sales/cart", icon:cartIcon},
      {id:2, title: "Hóa Đơn", url: "/home/sales/invoice", icon:  invoiceIcon},
      {id:3, title: "Đơn Trả", url: "/home/sales/invoice-return", icon: invoiceReturnIcon},
    ]
  };
 
  const inventoryModule = {
    title:"Kho Hàng",
    children: [
        {id:4, title: "Nhập Hàng", url: "/home/inventory/import",icon:  importIcon },
        {id:5, title: "Kho Hàng", url: "/home/inventory/inventory" ,icon: inventoryIcon},
        {id:6, title: "Đơn Nhập Hàng", url: "/home/inventory/receipt" ,icon:  inventoryOrderIcon},
        {id:7, title: "Đơn Trả Hàng Nhập", url: "/home/inventory/returns",icon: inventoryReturnOrderIcon},
        // {id:8, title: "Đơn Đặt Hàng", url: "/home/inventory/order",icon: orderIcon},
        {id:9, title: "Đặt Hàng", url: "/home/inventory/order-list",icon: orderListIcon},
        // {id:10, title: "Lịch sử Kiểm kho", url: "/home/inventory/check",icon: checkIcon},
        {id:11, title: "Kiểm Kho", url: "/home/inventory/check-history",icon: checkIcon},
        {id:12, title: "Nhà Cung Cấp", url: "/home/inventory/supplier",icon:  suplierIcon },
      ]
    };
    const deliveryModule = {
      title:"Giao hàng",
      children:[
        {id:13, title: "Đơn giao hàng", url: "/home/delivery/delivery" ,icon:  deliveryIcon},
      ]
    };
  const hrModule = {
    title:"Nhân Sự",
    children: [
        {id:14, title: "Nhân Viên", url: "/home/hr/employee",icon:  employeeIcon},
        {id:15, title: "Ca Làm Việc", url: "/home/hr/schedule",icon:  scheduleIcon},
      ]
    };
  const reportModule = {
      title:"Quản Lý",
      children:[
        {id:16, title: "Lịch Sử Hoạt Động", url: "/home/manager/history" ,icon:  historyIcon},
        {id:17, title: "Cửa Hàng", url: "/home/manager/branch",icon:  branchIcon},
        {id:18, title: "Trang Web", url: "/home/manager/web" ,icon:  webIcon},
        {id:19, title: "Khách Hàng", url: "/home/manager/customer" ,icon:  customerIcon},
        {id:20.1, title: "Thống Kê", url: "/home/manager/report" ,icon: statisticIcon,
            children:[
              {id:20.1, title: "Tổng quan", url: "/home/manager/report"},
              {id:20.2, title: "Sổ quỹ", url: "/home/manager/report"},
              {id:20.3, title: "Báo cáo cuối ngày", url: "/home/manager/report"},
            ]
        },
        
      ]
  };


  const menuItems = {
    items: [salesModule, inventoryModule, deliveryModule,hrModule, reportModule]
};


const MenuList = () => {
    const navItems = menuItems.items.map((item) => {
        return <MenuGroup  item={item} />;
    });
    return navItems;
}

export default MenuList
