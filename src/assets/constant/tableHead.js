
// -----------HEADER TABLE
export const TestHeadCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
    { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
    { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
    { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
    { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];
export const InventoryHeadCells = [
    { id: 'img', numeric: false, disablePadding: true, label: '#' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Sản phẩm' },
    { id: 'price', numeric: true, disablePadding: false, label: 'Giá bán' },
    { id: 'importPrice', numeric: true, disablePadding: false, label: 'Giá vốn' },
    { id: 'quantity', numeric: true, disablePadding: false, label: 'Tồn kho' },
];
export const InventoryOrderHeadCells = [
    { id: 'id', numeric: false, disablePadding: true, label: '#Mã đơn' },
    { id: 'date', numeric: false, disablePadding: false, label: 'Ngày nhập' },
    { id: 'supplier', numeric: false, disablePadding: false, label: 'Nhà cung cấp' },
    { id: 'total', numeric: true, disablePadding: false, label: 'Tổng tiền hàng' },
    { id: 'status', numeric: false, disablePadding: false, label: 'Trạng thái' },
    { id: 'employee', numeric: false, disablePadding: false, label: 'Người thực hiện' },
    
];
export const InventoryReturnOrderHeadCells = [
    { id: 'id', numeric: false, disablePadding: true, label: '#Mã đơn' },
    { id: 'date', numeric: false, disablePadding: false, label: 'Ngày nhập' },
    { id: 'supplier', numeric: false, disablePadding: false, label: 'Nhà cung cấp' },
    { id: 'total', numeric: true, disablePadding: false, label: 'Tổng tiền trả' },
    { id: 'import_id', numeric: true, disablePadding: false, label: '#Mã đơn nhập' },
    { id: 'employee', numeric: false, disablePadding: false, label: 'Người thực hiện' },
    
];

export const SupplierHeadCells = [
    // { id: 'id', numeric: false, disablePadding: true, label: 'Mã NCC' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Tên NCC' },
    { id: 'phone', numeric: false, disablePadding: false, label: 'Số điẹn thoại' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
    { id: 'address', numeric: false, disablePadding: false, label: 'Địa chỉ' },
    { id: 'status', numeric: false, disablePadding: false, label: 'Trạng thái' },
    // { id: 'debt', numeric: true, disablePadding: false, label: 'Còn nợ NCC' },  
];

export const InvoiceHeadCells = [
    { id: 'id', numeric: false, disablePadding: true, label: 'Mã hoá đơn' },
    { id: 'date', numeric: false, disablePadding: false, label: 'Ngày bán' },
    { id: 'customer', numeric: false, disablePadding: false, label: 'Khách hàng' },
    { id: 'total', numeric: true, disablePadding: false, label: 'Tổng tiền hàng' },
    { id: 'status', numeric: false, disablePadding: false, label: 'Trạng thái' },  
    { id: 'employee', numeric: false, disablePadding: false, label: 'Người thực hiện' },  
];
export const InvoiceReturnHeadCells = [
    { id: 'id', numeric: false, disablePadding: true, label: 'Mã đơn trả' },
    { id: 'date', numeric: false, disablePadding: false, label: 'Ngày trả' },
    { id: 'customer', numeric: false, disablePadding: false, label: 'Khách hàng' },
    { id: 'total', numeric: true, disablePadding: false, label: 'Tổng tiền trả' },
    { id: 'invoice_id', numeric: true, disablePadding: false, label: '#Mã hoá đơn' },
    { id: 'employee', numeric: false, disablePadding: false, label: 'Người thực hiện' },  
];
export const EmployeeHeadCells = [
    { id: 'img', numeric: false, disablePadding: true, label: '#' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Nhân viên' },
    { id: 'phone', numeric: false, disablePadding: false, label: 'Số điện thoại' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
    // { id: 'job', numeric: false, disablePadding: false, label: 'Protein (g)' },  
];

export const CustomerHeadCells = [
    { id: 'img', numeric: false, disablePadding: true, label: '#' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Khách hàng' },
    { id: 'phone', numeric: false, disablePadding: false, label: 'Số điện thoại' },
    { id: 'total', numeric: false, disablePadding: false, label: 'Tổng tiền mua' },  
    { id: 'status', numeric: false, disablePadding: false, label: 'Trạng thái' },
];