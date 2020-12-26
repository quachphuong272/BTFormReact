const stateDefault = {
    mangSinhVien: [
        { maSV: 1, hoTen: 'Nguyễn Văn A', soDienThoai: '0984369127', email: 'abc@gmail.com' }
    ]
}


const QuanLySinhVienReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'THEM_SINH_VIEN': {
            // thêm dữ liệu sinh viên vào mangSinhVien
            const mangSVUpdate = [...state.mangSinhVien, action.sinhVien];
            state.mangSinhVien= mangSVUpdate;
            return {...state};

        }break;
        default: {
            return { ...state }
        }
    }
}

export default QuanLySinhVienReducer