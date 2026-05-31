import React from "react";

type StatItem = {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: string;
};

type Order = {
  id: string;
  customer: string;
  product: string;
  status: string;
  total: string;
  date: string;
};

type TopProduct = {
  name: string;
  sold: number;
  revenue: string;
  stock: number;
};

type NavItem = {
  icon: string;
  label: string;
  active: boolean;
};

const stats: StatItem[] = [
  {
    label: "Tổng doanh thu",
    value: "₫124,500,000",
    change: "+12.5%",
    positive: true,
    icon: "💰",
  },
  {
    label: "Đơn hàng mới",
    value: "1,284",
    change: "+8.2%",
    positive: true,
    icon: "🛒",
  },
  {
    label: "Khách hàng",
    value: "9,612",
    change: "+3.1%",
    positive: true,
    icon: "👥",
  },
  {
    label: "Tỷ lệ hoàn trả",
    value: "2.4%",
    change: "-0.5%",
    positive: false,
    icon: "↩️",
  },
];

const recentOrders: Order[] = [
  {
    id: "#ORD-0012",
    customer: "Nguyễn Văn A",
    product: "Laptop Dell XPS 13",
    status: "Đã giao",
    total: "₫25,000,000",
    date: "31/05/2026",
  },
  {
    id: "#ORD-0013",
    customer: "Trần Thị B",
    product: "iPhone 15 Pro Max",
    status: "Đang giao",
    total: "₫32,000,000",
    date: "31/05/2026",
  },
  {
    id: "#ORD-0014",
    customer: "Lê Văn C",
    product: 'Samsung 4K TV 55"',
    status: "Chờ xử lý",
    total: "₫18,500,000",
    date: "30/05/2026",
  },
  {
    id: "#ORD-0015",
    customer: "Phạm Thị D",
    product: "AirPods Pro 2",
    status: "Đã hủy",
    total: "₫6,200,000",
    date: "30/05/2026",
  },
  {
    id: "#ORD-0016",
    customer: "Hoàng Văn E",
    product: "iPad Air M2",
    status: "Đã giao",
    total: "₫16,000,000",
    date: "29/05/2026",
  },
];

const topProducts: TopProduct[] = [
  {
    name: "iPhone 15 Pro Max",
    sold: 412,
    revenue: "₫13,184,000,000",
    stock: 58,
  },
  {
    name: "Laptop Dell XPS 13",
    sold: 289,
    revenue: "₫7,225,000,000",
    stock: 32,
  },
  {
    name: 'Samsung 4K TV 55"',
    sold: 201,
    revenue: "₫3,718,500,000",
    stock: 74,
  },
  { name: "AirPods Pro 2", sold: 530, revenue: "₫3,286,000,000", stock: 120 },
];

const statusColors: Record<string, string> = {
  "Đã giao": "bg-green-100 text-green-700",
  "Đang giao": "bg-blue-100 text-blue-700",
  "Chờ xử lý": "bg-yellow-100 text-yellow-700",
  "Đã hủy": "bg-red-100 text-red-700",
};

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <span className="text-xl font-bold text-indigo-600">
            🛍️ AdminShop
          </span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          {[
            ...([
              { icon: "📊", label: "Dashboard", active: true },
              { icon: "📦", label: "Sản phẩm", active: false },
              { icon: "🛒", label: "Đơn hàng", active: false },
              { icon: "👥", label: "Khách hàng", active: false },
              { icon: "📈", label: "Thống kê", active: false },
              { icon: "🏷️", label: "Khuyến mãi", active: false },
              { icon: "⚙️", label: "Cài đặt", active: false },
            ] as NavItem[]),
          ].map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                item.active
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">
              AD
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Admin</p>
              <p className="text-xs text-gray-500">admin@shop.vn</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
            <p className="text-xs text-gray-500">Chào mừng trở lại, Admin 👋</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-gray-500 hover:text-gray-700">
              🔔
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center">
                3
              </span>
            </button>
            <button className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              + Thêm sản phẩm
            </button>
          </div>
        </header>

        {/* Body */}
        <main className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p
                  className={`text-sm mt-1 font-medium ${stat.positive ? "text-green-600" : "text-red-500"}`}
                >
                  {stat.change}{" "}
                  <span className="text-gray-400 font-normal">
                    so với tháng trước
                  </span>
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Recent Orders */}
            <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="text-base font-semibold text-gray-800">
                  Đơn hàng gần đây
                </h2>
                <button className="text-sm text-indigo-600 hover:underline">
                  Xem tất cả
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-gray-500 uppercase bg-gray-50">
                      <th className="px-6 py-3 text-left">Mã đơn</th>
                      <th className="px-6 py-3 text-left">Khách hàng</th>
                      <th className="px-6 py-3 text-left">Sản phẩm</th>
                      <th className="px-6 py-3 text-left">Trạng thái</th>
                      <th className="px-6 py-3 text-right">Tổng tiền</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {recentOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 font-mono font-medium text-indigo-600">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {order.customer}
                        </td>
                        <td className="px-6 py-4 text-gray-600 max-w-[180px] truncate">
                          {order.product}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right font-medium text-gray-800">
                          {order.total}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="text-base font-semibold text-gray-800">
                  Sản phẩm bán chạy
                </h2>
                <button className="text-sm text-indigo-600 hover:underline">
                  Chi tiết
                </button>
              </div>
              <div className="divide-y divide-gray-100">
                {topProducts.map((product, index) => (
                  <div
                    key={product.name}
                    className="px-6 py-4 flex items-center gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 font-bold text-sm flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Đã bán: {product.sold} | Kho: {product.stock}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                        {product.revenue}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-base font-semibold text-gray-800 mb-4">
              Thao tác nhanh
            </h2>
            <div className="flex flex-wrap gap-3">
              {[
                {
                  label: "📦 Thêm sản phẩm",
                  color: "bg-indigo-50 text-indigo-700 hover:bg-indigo-100",
                },
                {
                  label: "🏷️ Tạo khuyến mãi",
                  color: "bg-green-50 text-green-700 hover:bg-green-100",
                },
                {
                  label: "📊 Xuất báo cáo",
                  color: "bg-yellow-50 text-yellow-700 hover:bg-yellow-100",
                },
                {
                  label: "👥 Quản lý nhân viên",
                  color: "bg-purple-50 text-purple-700 hover:bg-purple-100",
                },
                {
                  label: "🔄 Đồng bộ kho",
                  color: "bg-blue-50 text-blue-700 hover:bg-blue-100",
                },
              ].map((action) => (
                <button
                  key={action.label}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${action.color}`}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
