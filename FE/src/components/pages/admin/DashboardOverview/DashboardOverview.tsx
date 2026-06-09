"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getUsers } from "@/features/admin/adminUsersSlice";
import { getProducts } from "@/features/products/productsSlice";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Eye,
  Package,
  ShoppingCart,
  Users,
  Wallet,
} from "lucide-react";

function formatPrice(amount: number, currency: string) {
  if (currency === "VND" || currency === "VNĐ") {
    return "₫" + amount.toLocaleString("vi-VN");
  }
  return amount.toLocaleString("vi-VN") + " " + currency;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("vi-VN");
}

const chartPoints = [44, 34, 31, 48, 78, 64, 52, 58, 76];

const recentOrders = [
  { id: "#ORD-1001", name: "Nguyen Van An", price: "799.000đ", status: "Hoan thanh", tone: "green" },
  { id: "#ORD-1002", name: "Tran Thi Bich Ngoc", price: "1.250.000đ", status: "Dang xu ly", tone: "blue" },
  { id: "#ORD-1003", name: "Le Minh Hoang", price: "560.000đ", status: "Dang giao", tone: "amber" },
  { id: "#ORD-1004", name: "Pham Quang Huy", price: "340.000đ", status: "Da huy", tone: "slate" },
  { id: "#ORD-1005", name: "Hoang Thu Ha", price: "1.020.000đ", status: "Hoan thanh", tone: "green" },
];

const toneClass: Record<string, string> = {
  green: "bg-emerald-50 text-emerald-700",
  blue: "bg-sky-50 text-sky-700",
  amber: "bg-amber-50 text-amber-700",
  slate: "bg-slate-100 text-slate-500",
};

export default function DashboardOverview() {
  const dispatch = useAppDispatch();
  const { users, loading: usersLoading } = useAppSelector((s) => s.adminUsers);
  const {
    products,
    total: totalProducts,
    loading: productsLoading,
  } = useAppSelector((s) => s.products);

  useEffect(() => {
    if (users.length === 0) dispatch(getUsers());
    if (products.length === 0) dispatch(getProducts({ limit: 100 }));
  }, [dispatch]);

  const activeUsers = users.filter((u) => u.status === "active").length;
  const recentProducts = [...products]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 3);

  const stats = [
    {
      label: "Tổng doanh thu",
      value: "24.560 USD",
      change: "18.6%",
      icon: Wallet,
      color: "violet",
    },
    {
      label: "Đơn hàng",
      value: "128",
      change: "12.4%",
      icon: ShoppingCart,
      color: "emerald",
    },
    {
      label: "Người dùng",
      value: usersLoading ? "..." : String(users.length || 0),
      change: activeUsers > 0 ? "8.7%" : "0.0%",
      icon: Users,
      color: "sky",
    },
    {
      label: "Sản phẩm",
      value: productsLoading ? "..." : String(totalProducts || products.length),
      change: "4.3%",
      icon: Package,
      color: "amber",
    },
  ] as const;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={stat.label} stat={stat} delay={index * 70} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.25fr_1fr]">
        <section className="dashboard-card p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-950">Doanh thu</h2>
              <div className="mt-3 flex items-end gap-3">
                <p className="text-2xl font-bold text-slate-950">24.560 USD</p>
                <p className="mb-1 flex items-center gap-1 text-sm font-medium text-emerald-600">
                  <ArrowUpRight size={15} />
                  18.6% so với 7 ngày trước
                </p>
              </div>
            </div>
            <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 shadow-sm">
              7 ngày qua
            </button>
          </div>
          <div className="relative h-64 rounded-xl bg-gradient-to-b from-violet-50 to-white px-4 py-5">
            <div className="absolute inset-x-4 top-1/2 border-t border-dashed border-violet-200" />
            <div className="absolute inset-x-4 top-1/4 border-t border-dashed border-violet-100" />
            <div className="absolute inset-x-4 top-3/4 border-t border-dashed border-violet-100" />
            <div className="relative flex h-full items-end gap-3">
              {chartPoints.map((point, index) => (
                <div key={index} className="flex flex-1 items-end">
                  <div
                    className="w-full rounded-t-xl bg-gradient-to-t from-violet-500/70 to-violet-300/80 shadow-[0_8px_24px_rgba(124,58,237,0.18)] transition-all duration-500 hover:from-violet-600"
                    style={{ height: `${point}%` }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              ["Hôm nay", "3.120 USD", "12.5%"],
              ["Tuần này", "24.560 USD", "18.6%"],
              ["Tháng này", "98.450 USD", "22.1%"],
              ["Năm nay", "1.245.300 USD", "25.8%"],
            ].map(([label, value, change]) => (
              <div key={label} className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs text-slate-500">{label}</p>
                <p className="mt-2 text-sm font-bold text-slate-950">{value}</p>
                <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                  <ArrowUpRight size={13} />
                  {change}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <h2 className="text-base font-bold text-slate-950">Đơn hàng gần đây</h2>
            <button className="text-sm font-semibold text-violet-600">Xem tất cả</button>
          </div>
          <div className="divide-y divide-slate-100">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center gap-4 px-6 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <ShoppingCart size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-950">{order.id}</p>
                  <p className="truncate text-sm text-slate-500">{order.name}</p>
                </div>
                <span className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${toneClass[order.tone]}`}>
                  {order.status}
                </span>
                <p className="w-24 text-right text-sm font-bold text-slate-900">{order.price}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.15fr_1fr]">
        <section className="dashboard-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <h2 className="text-base font-bold text-slate-950">Sản phẩm bán chạy</h2>
            <button className="text-sm font-semibold text-violet-600">Xem tất cả</button>
          </div>
          <div className="divide-y divide-slate-100">
            {recentProducts.length === 0 ? (
              <div className="px-6 py-12 text-center text-sm text-slate-400">
                Chưa có sản phẩm
              </div>
            ) : (
              recentProducts.map((product, index) => (
                <div key={product._id} className="grid grid-cols-[48px_1fr_96px_112px] items-center gap-4 px-6 py-4">
                  <p className="text-sm font-bold text-slate-400">#{index + 1}</p>
                  <div className="flex items-center gap-3">
                    {product.imageUrls[0] ? (
                      <img
                        src={product.imageUrls[0]}
                        alt={product.title}
                        className="h-11 w-11 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                        <Package size={18} />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-950">{product.title}</p>
                      <p className="text-xs text-slate-500">{formatDate(product.createdAt)}</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-slate-700">128</p>
                  <p className="text-right text-sm font-bold text-slate-900">
                    {formatPrice(product.price.amount, product.price.currency)}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="dashboard-card p-6">
          <h2 className="mb-4 text-base font-bold text-slate-950">Thống kê nhanh</h2>
          <div className="space-y-1">
            <QuickStat icon={BarChart3} label="Tỷ lệ chuyển đổi" value="2.45%" change="0.6%" up />
            <QuickStat icon={ShoppingCart} label="Giá trị đơn hàng TB" value="865.000đ" change="9.3%" up />
            <QuickStat icon={Eye} label="Tổng lượt truy cập" value="12.456" change="15.7%" up />
            <QuickStat icon={Activity} label="Tỷ lệ thoát trang" value="32.6%" change="4.2%" />
          </div>
        </section>
      </div>
    </div>
  );
}

function StatCard({
  stat,
  delay,
}: {
  stat: {
    label: string;
    value: string;
    change: string;
    icon: React.ElementType;
    color: "violet" | "emerald" | "sky" | "amber";
  };
  delay: number;
}) {
  const colorMap = {
    violet: "bg-violet-50 text-violet-600 from-violet-500/30",
    emerald: "bg-emerald-50 text-emerald-600 from-emerald-500/30",
    sky: "bg-sky-50 text-sky-600 from-sky-500/30",
    amber: "bg-amber-50 text-amber-600 from-amber-500/30",
  };
  const Icon = stat.icon;

  return (
    <section
      className="dashboard-card dashboard-card-enter p-5"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-4">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${colorMap[stat.color]}`}>
          <Icon size={20} />
        </div>
        <p className="font-semibold text-slate-800">{stat.label}</p>
      </div>
      <p className="mt-5 text-3xl font-bold tracking-tight text-slate-950">{stat.value}</p>
      <p className="mt-2 flex items-center gap-1 text-sm text-slate-500">
        <ArrowUpRight size={15} className="text-emerald-600" />
        <span className="font-semibold text-emerald-600">{stat.change}</span>
        so với tuần trước
      </p>
      <div className={`mt-4 h-14 rounded-xl bg-gradient-to-t ${colorMap[stat.color]} to-transparent opacity-80`} />
    </section>
  );
}

function QuickStat({
  icon: Icon,
  label,
  value,
  change,
  up = false,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  change: string;
  up?: boolean;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl px-1 py-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
        <Icon size={18} />
      </div>
      <p className="flex-1 text-sm text-slate-600">{label}</p>
      <p className="text-sm font-bold text-slate-950">{value}</p>
      <p className={`flex items-center gap-1 text-xs font-semibold ${up ? "text-emerald-600" : "text-red-500"}`}>
        {up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
        {change}
      </p>
    </div>
  );
}
