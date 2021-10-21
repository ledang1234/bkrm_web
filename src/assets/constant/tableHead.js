
// -----------HEADER TABLE


//  ID phải trùng tên ATTRIBUTE THÌ MỚI SORT ĐC

export const InventoryHeadCells = [
    { id: 'id', numeric: false, disablePadding: true, label: '#' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Sản phẩm' },
    { id: 'category', numeric: false, disablePadding: false, label: 'Danh mục' },
    { id: 'price', numeric: true, disablePadding: false, label: 'Giá bán' },
    { id: 'import_price', numeric: true, disablePadding: false, label: 'Giá vốn' },
    { id: 'quantity', numeric: false, disablePadding: false, label: 'Tình trạng' },
    { id: 'quantity', numeric: true, disablePadding: false, label: 'Tồn kho' },
];
export const InventoryOrderHeadCells = [
    { id: 'id', numeric: false, disablePadding: true, label: '#' },
    { id: 'date', numeric: false, disablePadding: false, label: 'Ngày nhập' },
    { id: 'supplier', numeric: false, disablePadding: false, label: 'Nhà cung cấp' },
    { id: 'branch', numeric: false, disablePadding: false, label: 'Chi nhánh' },
    { id: 'payment', numeric: false, disablePadding: false, label: 'Hình thức trả' },
    { id: 'total', numeric: true, disablePadding: false, label: 'Tổng tiền hàng' },
    { id: 'debt', numeric: false, disablePadding: false, label: 'Trạng thái' },
    { id: 'employee', numeric: false, disablePadding: false, label: 'Người thực hiện' },
    
];
export const InventoryReturnOrderHeadCells = [
    { id: 'id', numeric: false, disablePadding: true, label: '#' },
    { id: 'date', numeric: false, disablePadding: false, label: 'Ngày nhập' },
    { id: 'supplier', numeric: false, disablePadding: false, label: 'Nhà cung cấp' },
    { id: 'branch', numeric: false, disablePadding: false, label: 'Chi nhánh' },
    { id: 'payment', numeric: false, disablePadding: false, label: 'Hình thức trả' },
    { id: 'total', numeric: true, disablePadding: false, label: 'Tổng tiền trả' },
    { id: 'import_id', numeric: false, disablePadding: false, label: '#Đơn nhập' },
    { id: 'employee', numeric: false, disablePadding: false, label: 'Người thực hiện' },
    
];

export const SupplierHeadCells = [
    { id: 'id', numeric: false, disablePadding: true, label: '#' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Tên NCC' },
    { id: 'phone', numeric: false, disablePadding: false, label: 'Số điẹn thoại' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
    { id: 'address', numeric: false, disablePadding: false, label: 'Địa chỉ' },
    { id: 'debt', numeric: false, disablePadding: false, label: 'Trạng thái' },
    // { id: 'debt', numeric: true, disablePadding: false, label: 'Còn nợ NCC' },  
];

export const InvoiceHeadCells = [
    { id: 'id', numeric: false, disablePadding: true, label: '#' },
    { id: 'date', numeric: false, disablePadding: false, label: 'Ngày bán' },
    { id: 'customer', numeric: false, disablePadding: false, label: 'Khách hàng' },
    { id: 'branch', numeric: false, disablePadding: false, label: 'Chi nhánh' },
    { id: 'payment', numeric: false, disablePadding: false, label: 'Hình thức trả' },
    { id: 'total', numeric: true, disablePadding: false, label: 'Tiền hàng' },
    { id: 'debt', numeric: false, disablePadding: false, label: 'Trạng thái' },  
    { id: 'employee', numeric: false, disablePadding: false, label: 'Người thực hiện' },  
];
export const InvoiceReturnHeadCells = [
    { id: 'id', numeric: false, disablePadding: true, label: '#' },
    { id: 'date', numeric: false, disablePadding: false, label: 'Ngày trả' },
    { id: 'customer', numeric: false, disablePadding: false, label: 'Khách hàng' },
    { id: 'branch', numeric: false, disablePadding: false, label: 'Chi nhánh' },
    { id: 'payment', numeric: false, disablePadding: false, label: 'Hình thức trả' },
    { id: 'total', numeric: true, disablePadding: false, label: 'Tiền trả' },
    { id: 'invoid_id', numeric: false, disablePadding: false, label: '#Hoá đơn' },
    { id: 'employee', numeric: false, disablePadding: false, label: 'Người thực hiện' },  
];
export const EmployeeHeadCells = [
    { id: 'id', numeric: false, disablePadding: true, label: '#' },
    { id: 'name', numeric: false, disablePadding: true, label: 'Nhân viên' },
    { id: 'phone', numeric: false, disablePadding: true, label: 'Số điện thoại' },
    { id: 'email', numeric: false, disablePadding: true, label: 'Email' },
    // { id: 'job', numeric: false, disablePadding: false, label: 'Protein (g)' },  
];

export const CustomerHeadCells = [
    { id: 'id', numeric: false, disablePadding: true, label: '#' },
    // { id: 'img', numeric: false, disablePadding: true, label: '#' },
    { id: 'name', numeric: false, disablePadding: true, label: 'Khách hàng' },
    { id: 'phone', numeric: false, disablePadding: true, label: 'Số điện thoại' },
    { id: 'total', numeric: true, disablePadding: true, label: 'Tổng tiền mua' },  
    { id: 'quantity', numeric: false, disablePadding: true, label: 'Trạng thái' },
];