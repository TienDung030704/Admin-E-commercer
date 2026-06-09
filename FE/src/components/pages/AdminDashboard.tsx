"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { logout } from "@/features/auth/authSlice";
import { getCurrentUser } from "@/services/auth/authService";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tag,
  Settings,
  type LucideIcon,
} from "lucide-react";
import DashboardOverview from "./admin/DashboardOverview/DashboardOverview";
import ProductsPage from "./admin/ProductsPage/ProductsPage";
import OrdersPage from "./admin/OrdersPage/OrdersPage";
import UsersPage from "./admin/UsersPage/UsersPage";

type Page =
  | "dashboard"
  | "products"
  | "orders"
  | "customers"
  | "promotions"
  | "settings";

type NavItem = {
  icon: LucideIcon;
  label: string;
  page: Page;
};

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", page: "dashboard" },
  { icon: Package, label: "Sản phẩm", page: "products" },
  { icon: ShoppingCart, label: "Đơn hàng", page: "orders" },
  { icon: Users, label: "Khách hàng", page: "customers" },
  { icon: Tag, label: "Khuyến mãi", page: "promotions" },
  { icon: Settings, label: "Cài đặt", page: "settings" },
];

const pageTitles: Record<Page, { title: string; subtitle: string }> = {
  dashboard: { title: "Dashboard", subtitle: "Chào mừng trở lại, Admin 👋" },
  products: { title: "Sản phẩm", subtitle: "Quản lý danh mục sản phẩm" },
  orders: { title: "Đơn hàng", subtitle: "Theo dõi và xử lý đơn hàng" },
  customers: { title: "Khách hàng", subtitle: "Quản lý tài khoản khách hàng" },
  promotions: {
    title: "Khuyến mãi",
    subtitle: "Quản lý chương trình khuyến mãi",
  },
  settings: { title: "Cài đặt", subtitle: "Cấu hình hệ thống" },
};

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState<Page>("dashboard");
  const dispatch = useAppDispatch();
  const authUser = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  function handleLogout() {
    dispatch(logout());
    window.location.assign("http://localhost:3002/account/login");
  }

  const { title, subtitle } = pageTitles[activePage];
  const displayName = authUser?.name || authUser?.email?.split("@")[0] || "Tài khoản";
  const displayEmail = authUser?.email ?? "";
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <span className="text-xl font-bold text-indigo-600">
            🛍️ AdminShop
          </span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => setActivePage(item.page)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activePage === item.page
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
              {userInitial}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                {displayName}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {displayEmail}
              </p>
            </div>
            <button
              onClick={handleLogout}
              title="Đăng xuất"
              className="text-gray-400 hover:text-red-500 transition-colors text-lg"
            >
              ⏻
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
            <p className="text-xs text-gray-500">{subtitle}</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-gray-500 hover:text-gray-700 text-lg">
              🔔
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <div key={activePage} className="animate-page-in h-full">
            {activePage === "dashboard" && <DashboardOverview />}
            {activePage === "products" && <ProductsPage />}
            {activePage === "orders" && <OrdersPage />}
            {activePage === "customers" && <UsersPage />}
            {(activePage === "promotions" || activePage === "settings") && (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400 gap-2">
                <span className="text-5xl">🚧</span>
                <p className="text-base font-medium">
                  Tính năng đang phát triển
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
