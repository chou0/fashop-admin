//@flow
import React,{ Component } from "react";
import { connect } from "react-redux";
import { Form, Select, Input, Button, } from 'antd';
import UploadImage from "../../../components/uploadImage";
import {
    handleSubmitType,
    formType,
    dispatchType,
    historyType,
} from "../../../utils/flow";
import {
    getGoodsCategoryList,
    addCategory,
} from "../../../actions/goods/category";


const FormItem = Form.Item;
const Option = Select.Option;

type Props = {
    categoryList: Array<{id:number,name:string}>,
    form: formType,
    dispatch: dispatchType,
    history: historyType,
}

@connect(({view:{goods:{
    categoryList,
}}})=>({
    categoryList,
}))
@Form.create()
export default class CategoryAdd extends Component <Props,{}> {
    componentDidMount() {
        const {
            dispatch,
            categoryList,
        } = this.props
        if(!categoryList.length){
            dispatch(getGoodsCategoryList())
        }
    }
    handleSubmit = (e:handleSubmitType) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {
                    dispatch
                } = this.props
                dispatch(addCategory({
                    params: values
                }))
            }
        })
    }
    render() {
        const {
            form,
            categoryList,
        } = this.props
        const { getFieldDecorator } = form
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 6,
                },
            },
        };
        return (
            <Form onSubmit={this.handleSubmit} style={{maxWidth: '600px'}}>
                <FormItem
                    label="分类名称"
                    {...formItemLayout}
                >
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true,
                            message: '请输入分类名称!'
                        }],
                    })(
                        <Input
                            placeholder='请输入分类名称'
                            style={{ width: '100%' }}
                        />
                    )}
                </FormItem>
                <FormItem
                    label="上级分类"
                    extra='如不选择，则默认为一级分类'
                    {...formItemLayout}
                >
                    {getFieldDecorator('pid',{

                    })(
                        <Select
                            placeholder="请输入分类名称"
                            style={{ width: '100%' }}
                        >
                            {
                                categoryList.map((e,i)=>(
                                    <Option value={e.id} key={i}>{e.name}</Option>
                                ))
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    extra="分类展示图，建议尺寸：140*140 像素"
                    label="上传分类图"
                >
                    {getFieldDecorator('icon', {
                        rules: [{
                            message: '请上传分类图!',
                        }],
                        valuePropName: 'url',
                    })(
                        <UploadImage/>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                            marginRight:10
                        }}
                        onClick={()=>{

                        }}
                    >
                        保存
                    </Button>
                    <Button
                        onClick={()=>{
                            this.props.history.goBack()
                        }}
                    >
                        返回
                    </Button>
                </FormItem>
            </Form>
        )
    }
}
