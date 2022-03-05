import React, { useEffect } from "react";

//import project
import MenuGroup from "./MenuGroup/MenuGroup";

//import icon
import cartIcon from "../../assets/img/icon/cart1.png";
import invoiceIcon from "../../assets/img/icon/invoice.png";
import invoiceReturnIcon from "../../assets/img/icon/invoiceReturn.png";

import importIcon from "../../assets/img/icon/inventory1.png";
import inventoryIcon from "../../assets/img/icon/inventory2.png";
import inventoryOrderIcon from "../../assets/img/icon/inventoryOrder1.png";
import inventoryReturnOrderIcon from "../../assets/img/icon/inventoryReturn.png";
import suplierIcon from "../../assets/img/icon/supplier4.png";
import orderIcon from "../../assets/img/icon/python.png";
import orderListIcon from "../../assets/img/icon/check1.png";
import checkIcon from "../../assets/img/icon/magnifiers.png";
import checkHistoryIcon from "../../assets/img/icon/hourglass.png";

import employeeIcon from "../../assets/img/icon/employee7.png";
import scheduleIcon from "../../assets/img/icon/schedule3.png";

import historyIcon from "../../assets/img/icon/piggy-bank.png";
import branchIcon from "../../assets/img/icon/branch5.png";
import customerIcon from "../../assets/img/icon/customer.png";
import statisticIcon from "../../assets/img/icon/statistics.png";

import webIcon from "../../assets/img/icon/www.png";
import settingIcon from "../../assets/img/icon/setting.png"
import deliveryIcon from "../../assets/img/icon/history3.png";

//ICON
import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";

import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import LoyaltyOutlinedIcon from "@material-ui/icons/LoyaltyOutlined";
import RestorePageOutlinedIcon from "@material-ui/icons/RestorePageOutlined";

import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import PlaylistAddOutlinedIcon from "@material-ui/icons/PlaylistAddOutlined";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import LibraryBooksOutlinedIcon from "@material-ui/icons/LibraryBooksOutlined";
import ReceiptOutlinedIcon from "@material-ui/icons/ReceiptOutlined";
import SyncProblemOutlinedIcon from "@material-ui/icons/SyncProblemOutlined";
import AddIcCallOutlinedIcon from "@material-ui/icons/AddIcCallOutlined";
import FindInPageOutlinedIcon from "@material-ui/icons/FindInPageOutlined";
import FindInPageTwoToneIcon from "@material-ui/icons/FindInPageTwoTone";
import ImageSearchOutlinedIcon from "@material-ui/icons/ImageSearchOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import ExtensionOutlinedIcon from "@material-ui/icons/ExtensionOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";

import LocalShippingOutlinedIcon from "@material-ui/icons/LocalShippingOutlined";

import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import EventAvailableOutlinedIcon from "@material-ui/icons/EventAvailableOutlined";

import DonutSmallOutlinedIcon from "@material-ui/icons/DonutSmallOutlined";
import LanguageOutlinedIcon from "@material-ui/icons/LanguageOutlined";
import RestoreOutlinedIcon from "@material-ui/icons/RestoreOutlined";
import StorefrontOutlinedIcon from "@material-ui/icons/StorefrontOutlined";

//ICON 2 COLOR
import PaletteTwoToneIcon from "@material-ui/icons/PaletteTwoTone";
import DoneTwoToneIcon from "@material-ui/icons/DoneTwoTone";

import ShoppingCartTwoToneIcon from "@material-ui/icons/ShoppingCartTwoTone";
import LoyaltyTwoToneIcon from "@material-ui/icons/LoyaltyTwoTone";
import RestorePageTwoToneIcon from "@material-ui/icons/RestorePageTwoTone";

import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import AddTwoToneIcon from "@material-ui/icons/AddTwoTone";
import PlaylistAddTwoToneIcon from "@material-ui/icons/PlaylistAddTwoTone";
import ThumbUpAltTwoToneIcon from "@material-ui/icons/ThumbUpAltTwoTone";
import LibraryBooksTwoToneIcon from "@material-ui/icons/LibraryBooksTwoTone";
import ReceiptTwoToneIcon from "@material-ui/icons/ReceiptTwoTone";
import SyncProblemTwoToneIcon from "@material-ui/icons/SyncProblemTwoTone";
import AddIcCallTwoToneIcon from "@material-ui/icons/AddIcCallTwoTone";
import ImageSearchTwoToneIcon from "@material-ui/icons/ImageSearchTwoTone";
import SearchTwoToneIcon from "@material-ui/icons/SearchTwoTone";
import ExtensionTwoToneIcon from "@material-ui/icons/ExtensionTwoTone";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";

import LocalShippingTwoToneIcon from "@material-ui/icons/LocalShippingTwoTone";

import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone";
import EventAvailableTwoToneIcon from "@material-ui/icons/EventAvailableTwoTone";

import DonutSmallTwoToneIcon from "@material-ui/icons/DonutSmallTwoTone";
import LanguageTwoToneIcon from "@material-ui/icons/LanguageTwoTone";
import RestoreTwoToneIcon from "@material-ui/icons/RestoreTwoTone";
import StorefrontTwoToneIcon from "@material-ui/icons/StorefrontTwoTone";

const icons = {
  PaletteOutlinedIcon,
  LoyaltyOutlinedIcon,
  DoneOutlinedIcon,
  DonutSmallOutlinedIcon,
  LanguageOutlinedIcon,
  RestorePageOutlinedIcon,
  RestoreOutlinedIcon,
  StorefrontOutlinedIcon,
  AccountCircleOutlinedIcon,
  EventAvailableOutlinedIcon,
  LocalShippingOutlinedIcon,
  SearchOutlinedIcon,
  AddIcCallOutlinedIcon,
  RestorePageOutlinedIcon,
  ShoppingCartOutlinedIcon,
  ReceiptOutlinedIcon,
  FavoriteBorderOutlinedIcon,
  ExtensionOutlinedIcon,
  SyncProblemOutlinedIcon,
  ThumbUpAltOutlinedIcon,
  PlaylistAddOutlinedIcon,
  AddOutlinedIcon,
  AddCircleOutlineOutlinedIcon,
  LibraryBooksOutlinedIcon,
  ImageSearchOutlinedIcon,
  FindInPageOutlinedIcon,
};
const icons1 = {
  PaletteTwoToneIcon,
  LoyaltyTwoToneIcon,
  DoneTwoToneIcon,
  DonutSmallTwoToneIcon,
  LanguageTwoToneIcon,
  RestorePageTwoToneIcon,
  RestoreTwoToneIcon,
  StorefrontTwoToneIcon,
  AccountCircleTwoToneIcon,
  EventAvailableTwoToneIcon,
  LocalShippingTwoToneIcon,
  SearchTwoToneIcon,
  AddIcCallTwoToneIcon,
  RestorePageTwoToneIcon,
  ShoppingCartTwoToneIcon,
  ReceiptTwoToneIcon,
  FavoriteTwoToneIcon,
  LibraryBooksTwoToneIcon,
  ExtensionTwoToneIcon,
  SyncProblemTwoToneIcon,
  ThumbUpAltTwoToneIcon,
  PlaylistAddTwoToneIcon,
  AddTwoToneIcon,
  AddCircleTwoToneIcon,
  ImageSearchTwoToneIcon,
  FindInPageTwoToneIcon,
};

const salesModule = {
  title: "Bán hàng",
  children: [
    {
      id: 1,
      title: "Giỏ Hàng",
      url: "/home/sales/cart",
      icon: cartIcon,
      icon1: icons.ShoppingCartOutlinedIcon,
      icon2: icons1.ShoppingCartTwoToneIcon,
    },
    {
      id: 2,
      title: "Hóa Đơn",
      url: "/home/sales/invoice",
      icon: invoiceIcon,
      icon1: icons.LoyaltyOutlinedIcon,
      icon2: icons1.LoyaltyTwoToneIcon,
    },
    {
      id: 3,
      title: "Đơn Trả",
      url: "/home/sales/invoice-return",
      icon: invoiceReturnIcon,
      icon1: icons.RestorePageOutlinedIcon,
      icon2: icons1.RestorePageTwoToneIcon,
    },
  ],
};

const inventoryModule = {
  title: "Kho Hàng",
  children: [
    {
      id: 4,
      title: "Nhập Hàng",
      url: "/home/inventory/import",
      icon: importIcon,
      icon1: icons.AddCircleOutlineOutlinedIcon,
      icon2: icons1.AddCircleTwoToneIcon,
    },
    {
      id: 5,
      title: "Sản phẩm",
      url: "/home/inventory/inventory",
      icon: inventoryIcon,
      icon1: icons.ThumbUpAltOutlinedIcon,
      icon2: icons1.ThumbUpAltTwoToneIcon,
    },
    {
      id: 6,
      title: "Đơn Nhập Hàng",
      url: "/home/inventory/receipt",
      icon: inventoryOrderIcon,
      icon1: icons.LibraryBooksOutlinedIcon,
      icon2: icons1.LibraryBooksTwoToneIcon,
    },
    {
      id: 7,
      title: "Đơn Trả Hàng Nhập",
      url: "/home/inventory/returns",
      icon: inventoryReturnOrderIcon,
      icon1: icons.SyncProblemOutlinedIcon,
      icon2: icons1.SyncProblemTwoToneIcon,
    },
    {
      id: 9,
      title: "Đặt Hàng",
      url: "/home/inventory/order-list",
      icon: orderListIcon,
      icon1: icons.AddIcCallOutlinedIcon,
      icon2: icons1.AddIcCallTwoToneIcon,
    },
    {
      id: 11,
      title: "Kiểm Kho",
      url: "/home/inventory/check-history",
      icon: checkIcon,
      icon1: icons.FindInPageOutlinedIcon,
      icon2: icons1.FindInPageTwoToneIcon,
    },
    {
      id: 12,
      title: "Nhà Cung Cấp",
      url: "/home/inventory/supplier",
      icon: suplierIcon,
      icon1: icons.ExtensionOutlinedIcon,
      icon2: icons1.ExtensionTwoToneIcon,
    },
  ],
};
const deliveryModule = {
  title: "Giao hàng",
  children: [
    {
      id: 13,
      title: "Đơn giao hàng",
      url: "/home/delivery/delivery",
      icon: deliveryIcon,
      icon1: icons.LocalShippingOutlinedIcon,
      icon2: icons1.LocalShippingTwoToneIcon,
    },
  ],
};
const hrModule = {
  title: "Nhân Sự",
  children: [
    {
      id: 14,
      title: "Nhân Viên",
      url: "/home/hr/employee",
      icon: employeeIcon,
      icon1: icons.AccountCircleOutlinedIcon,
      icon2: icons1.AccountCircleTwoToneIcon,
    },
    {
      id: 15,
      title: "Ca Làm Việc",
      url: "/home/hr/schedule",
      icon: scheduleIcon,
      icon1: icons.EventAvailableOutlinedIcon,
      icon2: icons1.EventAvailableTwoToneIcon,
    },
  ],
};
const reportModule = {
  title: "Quản Lý",
  children: [
    {
      id: 16,
      title: "Lịch Sử Hoạt Động",
      url: "/home/manager/history",
      icon: historyIcon,
      icon1: icons.RestoreOutlinedIcon,
      icon2: icons1.RestoreTwoToneIcon,
    },
    {
      id: 17,
      title: "Cửa Hàng",
      url: "/home/manager/branch",
      icon: branchIcon,
      icon1: icons.StorefrontOutlinedIcon,
      icon2: icons1.StorefrontTwoToneIcon,
    }, 
    {
      id: 18,
      title: "Khách Hàng",
      url: "/home/manager/customer",
      icon: customerIcon,
      icon1: icons.FavoriteBorderOutlinedIcon,
      icon2: icons1.FavoriteTwoToneIcon,
    },
    {
      id: 19,
      title: "Cài đặt",
      url: "/home/manager/setting",
      // icon: webIcon,
      icon: settingIcon,
      icon1: icons.LanguageOutlinedIcon,
      icon2: icons1.LanguageTwoToneIcon,
      children: [
        { id: 19.1, title: "Cài đặt chung", url: "/home/manager/setting" },
        { id: 19.2, title: "Khuyến mãi", url: "/home/manager/setting-discount" },
        { id: 19.3, title: "Voucher", url: "/home/manager/setting-voucher" },
        { id: 19.4, title: "Mẫu email", url: "/home/manager/setting-email" },
        { id: 19.5, title: "Trang web", url: "/home/manager/setting-web" },
      ],
    },
    {
      id: 20.1,
      title: "Thống Kê",
      url: "/home/manager/report",
      icon: statisticIcon,
      icon1: icons.DonutSmallOutlinedIcon,
      icon2: icons1.DonutSmallTwoToneIcon,
      children: [
        { id: 20.1, title: "Tổng quan", url: "/home/manager/report" },
        { id: 20.2, title: "Sổ quỹ", url: "/home/manager/report" },
        { id: 20.3, title: "Báo cáo cuối ngày", url: "/home/manager/report" },
      ],
    },
  ],
};

const menuItems = {
  items: [salesModule, inventoryModule, deliveryModule, hrModule, reportModule],
};

const MenuList = ({ permissions }) => {
  // const navItems = menuItems.items.map((item) => {
  //     return <MenuGroup  item={item} />;
  // });
  useEffect(() => {}, [permissions]);
  return (
    <>
      {permissions?.find((p) => p.name === "sales") && (
        <MenuGroup item={salesModule} />
      )}
      {permissions?.find((p) => p.name === "inventory") && (
        <MenuGroup item={inventoryModule} />
      )}
      {permissions?.find((p) => p.name === "employee") && (
        <MenuGroup item={hrModule} />
      )}
      {permissions?.find((p) => p.name === "report") && (
        <MenuGroup item={reportModule} />
      )}
    </>
  );

  // return navItems;
};

export default MenuList;
