"use client";

import React, { useState, useMemo } from "react";

type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

type Order = {
  id: string;
  customer: string;
  email: string;
  product: string;
  total: number;
  status: OrderStatus;
  date: string;
  items: number;
};

type ModalMode = "view" | "edit" | "delete" | null;

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Chờ xử lý",
  processing: "Đang xử lý",
  shipped: "Đang giao",
  delivered: "Đã giao",
  cancelled: "Đã hủy",
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-indigo-100 text-indigo-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const PAGE_SIZE = 8;

const initialOrders: Order[] = [
  {
    id: "ORD-0001",
    customer: "Nguyễn Văn A",
    email: "nva@gmail.com",
    product: "iPhone 15 Pro Max",
    total: 32000000,
    status: "delivered",
    date: "31/05/2026",
    items: 1,
  },
  {
    id: "ORD-0002",
    customer: "Trần Thị B",
    email: "ttb@gmail.com",
    product: "Laptop Dell XPS 13",
    total: 25000000,
    status: "shipped",
    date: "31/05/2026",
    items: 1,
  },
  {
    id: "ORD-0003",
    customer: "Lê Văn C",
    email: "lvc@gmail.com",
    product: "AirPods Pro 2 x2",
    total: 12400000,
    status: "processing",
    date: "30/05/2026",
    items: 2,
  },
  {
    id: "ORD-0004",
    customer: "Phạm Thị D",
    email: "ptd@gmail.com",
    product: "iPad Air M2",
    total: 16000000,
    status: "pending",
    date: "30/05/2026",
    items: 1,
  },
  {
    id: "ORD-0005",
    customer: "Hoàng Văn E",
    email: "hve@gmail.com",
    product: "Samsung Galaxy S24",
    total: 22000000,
    status: "cancelled",
    date: "29/05/2026",
    items: 1,
  },
  {
    id: "ORD-0006",
    customer: "Đỗ Thị F",
    email: "dtf@gmail.com",
    product: "Sony WH-1000XM5",
    total: 8500000,
    status: "delivered",
    date: "29/05/2026",
    items: 1,
  },
  {
    id: "ORD-0007",
    customer: "Vũ Văn G",
    email: "vvg@gmail.com",
    product: "MacBook Pro M4",
    total: 45000000,
    status: "shipped",
    date: "28/05/2026",
    items: 1,
  },
  {
    id: "ORD-0008",
    customer: "Bùi Thị H",
    email: "bth@gmail.com",
    product: "Logitech MX Master 3 x3",
    total: 8400000,
    status: "processing",
    date: "28/05/2026",
    items: 3,
  },
  {
    id: "ORD-0009",
    customer: "Ngô Văn I",
    email: "nvi@gmail.com",
    product: "ASUS ROG Swift",
    total: 12000000,
    status: "pending",
    date: "27/05/2026",
    items: 1,
  },
  {
    id: "ORD-0010",
    customer: "Lý Thị K",
    email: "ltk@gmail.com",
    product: "Xiaomi 14 Ultra",
    total: 21000000,
    status: "delivered",
    date: "27/05/2026",
    items: 1,
  },
  {
    id: "ORD-0011",
    customer: "Trịnh Văn L",
    email: "tvl@gmail.com",
    product: "iPhone 15 Pro Max x2",
    total: 64000000,
    status: "delivered",
    date: "26/05/2026",
    items: 2,
  },
  {
    id: "ORD-0012",
    customer: "Phan Thị M",
    email: "ptm@gmail.com",
    product: "Google Pixel 9",
    total: 19000000,
    status: "shipped",
    date: "26/05/2026",
    items: 1,
  },
];

function formatPrice(n: number) {
  return "₫" + n.toLocaleString("vi-VN");
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | OrderStatus>("all");
  const [page, setPage] = useState(1);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selected, setSelected] = useState<Order | null>(null);
  const [editStatus, setEditStatus] = useState<OrderStatus>("pending");

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchSearch =
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.customer.toLowerCase().includes(search.toLowerCase()) ||
        o.email.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || o.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [orders, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function openView(o: Order) {
    setSelected(o);
    setModalMode("view");
  }
  function openEdit(o: Order) {
    setSelected(o);
    setEditStatus(o.status);
    setModalMode("edit");
  }
  function openDelete(o: Order) {
    setSelected(o);
    setModalMode("delete");
  }
  function closeModal() {
    setModalMode(null);
    setSelected(null);
  }

  function handleSaveStatus() {
    if (selected)
      setOrders(
        orders.map((o) =>
          o.id === selected.id ? { ...o, status: editStatus } : o,
        ),
      );
    closeModal();
  }

  function handleDelete() {
    if (selected) setOrders(orders.filter((o) => o.id !== selected.id));
    closeModal();
  }

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 items-start justify-between">
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
            <input
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              placeholder="Tìm mã đơn, khách hàng, email..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <select
            className="border border-gray-200 rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as "all" | OrderStatus);
              setPage(1);
            }}
          >
            <option value="all">Tất cả trạng thái</option>
            {(Object.keys(STATUS_LABELS) as OrderStatus[]).map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        </div>
        {/* Status summary badges */}
        <div className="flex flex-wrap gap-2">
          {(Object.keys(STATUS_LABELS) as OrderStatus[]).map((s) => (
            <span
              key={s}
              className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[s]}`}
            >
              {STATUS_LABELS[s]}: {orders.filter((o) => o.status === s).length}
            </span>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-800">
            Danh sách đơn hàng
            <span className="ml-2 text-sm font-normal text-gray-400">
              ({filtered.length})
            </span>
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 uppercase bg-gray-50">
                <th className="px-6 py-3 text-left">Mã đơn</th>
                <th className="px-6 py-3 text-left">Khách hàng</th>
                <th className="px-6 py-3 text-left">Sản phẩm</th>
                <th className="px-6 py-3 text-center">SL</th>
                <th className="px-6 py-3 text-right">Tổng tiền</th>
                <th className="px-6 py-3 text-center">Trạng thái</th>
                <th className="px-6 py-3 text-left">Ngày đặt</th>
                <th className="px-6 py-3 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-12 text-center text-gray-400"
                  >
                    Không tìm thấy đơn hàng nào
                  </td>
                </tr>
              ) : (
                paginated.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-mono font-medium text-indigo-600 text-xs">
                      #{o.id}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800">{o.customer}</p>
                      <p className="text-xs text-gray-400">{o.email}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-600 max-w-[180px] truncate">
                      {o.product}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      {o.items}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-800">
                      {formatPrice(o.total)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[o.status]}`}
                      >
                        {STATUS_LABELS[o.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                      {o.date}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => openView(o)}
                          className="px-2.5 py-1.5 text-xs bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          Xem
                        </button>
                        <button
                          onClick={() => openEdit(o)}
                          className="px-2.5 py-1.5 text-xs bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => openDelete(o)}
                          className="px-2.5 py-1.5 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Hiển thị {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–
            {Math.min(page * PAGE_SIZE, filtered.length)} / {filtered.length}{" "}
            đơn hàng
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors"
            >
              ← Trước
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 text-sm rounded-lg transition-colors ${page === p ? "bg-indigo-600 text-white" : "border border-gray-200 hover:bg-gray-50"}`}
              >
                {p}
              </button>
            ))}
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors"
            >
              Sau →
            </button>
          </div>
        </div>
      </div>

      {/* View Modal */}
      {modalMode === "view" && selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-800">
                Chi tiết đơn #{selected.id}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400 text-xs mb-0.5">Khách hàng</p>
                  <p className="font-medium text-gray-800">
                    {selected.customer}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-0.5">Email</p>
                  <p className="font-medium text-gray-800">{selected.email}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-400 text-xs mb-0.5">Sản phẩm</p>
                  <p className="font-medium text-gray-800">
                    {selected.product}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-0.5">Số lượng</p>
                  <p className="font-medium text-gray-800">
                    {selected.items} sản phẩm
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-0.5">Tổng tiền</p>
                  <p className="font-semibold text-indigo-600">
                    {formatPrice(selected.total)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-0.5">Ngày đặt</p>
                  <p className="font-medium text-gray-800">{selected.date}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Trạng thái</p>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[selected.status]}`}
                  >
                    {STATUS_LABELS[selected.status]}
                  </span>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Status Modal */}
      {modalMode === "edit" && selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-800">
                Cập nhật đơn #{selected.id}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trạng thái đơn hàng
              </label>
              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value as OrderStatus)}
              >
                {(Object.keys(STATUS_LABELS) as OrderStatus[]).map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveStatus}
                className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {modalMode === "delete" && selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl p-6 space-y-5">
            <div className="text-center">
              <div className="text-4xl mb-3">🗑️</div>
              <h3 className="text-base font-semibold text-gray-800">
                Xóa đơn hàng
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Bạn có chắc muốn xóa đơn{" "}
                <span className="font-medium text-gray-800">
                  #{selected.id}
                </span>{" "}
                của{" "}
                <span className="font-medium text-gray-800">
                  {selected.customer}
                </span>
                ?
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
