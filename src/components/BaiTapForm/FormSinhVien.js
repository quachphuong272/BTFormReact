import React, { Component } from 'react'
import { connect } from 'react-redux'

class FormSinhVien extends Component {

    state = {
        values :{
            maSV: '',
            hoTen: '',
            soDienThoai: '',
            email: ''
        },
        errors :{
            maSV: 'a',
            hoTen: 'v',
            soDienThoai: '',
            email: ''
        },
        valid:false
    }


    handleChange = (e) => {
        // Lấy giá trị mỗi lần value input thay đổi bởi người dùng
        let tagInput = e.target;
        let { name, value, type,pattern } = tagInput;

        let errorMessage = '';

        if (value.trim() === '') {
            errorMessage = name + ' không được bỏ trống !';
        }

        if (type ==='email'){
            const regex = new RegExp(pattern);
            if(!regex.test(value))
            {
                errorMessage = name + 'không đúng định dạng !';
            }
        }

        // if (type ==='soDienThoai'){
        //     const regex = new RegExp(pattern);
        //     if(!regex.test(value))
        //     {
        //         errorMessage = name + 'không đúng định dạng !';
        //     }
        // }


        let values = { ...this.state.values, [name]: value }
        let errors = { ...this.state.errors, [name]: errorMessage }

        this.setState({
            ...this.state,
            values : values,
            errors : errors
        }, () => {
            console.log(this.state);
            this.checkValid();
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.themSinhVien(this.state.values);
    }

    checkValid= () => {
        let valid = true;
        for (let key in this.state.errors){
            if(this.state.errors[key] !== '' || this.state.values[key] === '')
            {
                valid = false;
            }
        }
        this.setState({
            ...this.state,
            valid :valid
        })
    }


    render() {
        return (
            <div className="container">
                <div className="card text-left">
                    <div className="card-header bg-dark text-white"><h3>Thông tin sinh viên</h3></div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div class="form-group col-6">
                                    <span>Mã SV</span>
                                    <input className="form-control" name="maSV" value={this.state.values.maSV} onChange={this.handleChange} />
                                    <p className="text-danger">{this.state.errors.maSV}</p>
                                </div>
                                <div class="form-group col-6">
                                    <span>Họ tên</span>
                                    <input className="form-control" name="hoTen" value={this.state.values.hoTen} onChange={this.handleChange} />
                                    <p className="text-danger">{this.state.errors.hoTen}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div class="form-group col-6">
                                    <span>Số điện thoại</span>
                                    {/* pattern="^([0-9]|[1-9][0-9])$" */}
                                    <input type="text" className="form-control" name="soDienThoai"  value={this.state.values.soDienThoai} onChange={this.handleChange} />
                                    <p className="text-danger">{this.state.errors.soDienThoai}</p>
                                </div>
                                <div class="form-group col-6">
                                    <span>Email</span>
                                    <input type='email' pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$' className="form-control" name="email" value={this.state.values.email} onChange={this.handleChange} />
                                    <p className="text-danger">
                                        {this.state.errors.email}
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 text-right">
                                    {this.state.valid ? <button type="submit" className="btn btn-success">Thêm sinh viên</button> : <button type="submit" className="btn btn-success" disabled>Thêm sinh viên</button>}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}


const mapDispatchToProps = (dispatch) => {
    return {
        themSinhVien: (sinhVien) => {
            const action = {
                type: 'THEM_SINH_VIEN',
                sinhVien
            }
            dispatch(action);
        }
    }
}

export default connect(null, mapDispatchToProps)(FormSinhVien)