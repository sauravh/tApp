/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */
 import React, {
   useContext,
   useState,
   useEffect,
   useRef,
   Fragment
 } from "react";
 import ReactDOM from "react-dom";
 import "antd/dist/antd.css";
 import moment from "moment";
 import {
   Table,
   Input,
   Button,
   Popconfirm,
   Form,
   Modal,
   Drawer,
   Row,
   Col,
   Select,
   DatePicker
 } from "antd";
 import {
   UserOutlined,
   DeleteOutlined,
   EditOutlined,
   FileExcelOutlined
 } from "@ant-design/icons";

import { Helmet } from 'react-helmet';
import { compose } from 'redux';

const EditableContext = React.createContext();
const dateFormat = "YYYY/MM/DD";

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "First Name",
        dataIndex: "firstName"
      },
      {
        title: "Last Name",
        dataIndex: "lastName"
      },
      {
        title: "Email",
        dataIndex: "email"
      },
      {
        title: "Country",
        dataIndex: "country"
      },
      {
        title: "Date of Birth",
        dataIndex: "dateOfBirth",
        render: text => {
          return {
            children: <span>{text.split("T")[0]}</span>
          };
        }
      },
      {
        title: "Action",
        dataIndex: "action",
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <div className="button-controls">
              <Button
                icon={<UserOutlined />}
                onClick={() => this.viewUserInfo(record)}
              >
                View
              </Button>
              <Popconfirm
                title={
                  "Are you sure, you want to Delete " +
                  record.firstName +
                  " " +
                  record.lastName +
                  " Record ?"
                }
                okText={"Yes, Please"}
                cancelText={"NO"}
                placement="bottomRight"
                onConfirm={() => this.handleDelete(record.id)}
              >
                <Button icon={<DeleteOutlined />}>Delete</Button>
              </Popconfirm>
              <Button
                icon={<EditOutlined />}
                onClick={() => this.editUserInfo(record)}
              >
                Edit
              </Button>
            </div>
          ) : null
      }
    ];



    this.state = {
      dataSource: [],
      selectedRowKeys: [],
      showViewinfo: false,
      showEditWindow: false,
      viewUserInfo: [],
      editUserInfo: []
    };
  }

  componentDidMount() {
    fetch("http://sauravh.com/app/users.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            dataSource: result
          });
        },
        (error) => {
          this.setState({
            dataSource: []
          });
        }
      )
  }

  showModal = () => {
    this.setState({
      showViewinfo: true
    });
  };

  handleOk = e => {
    this.setState({
      showViewinfo: false
    });
  };

  handleCancel = e => {
    this.setState({
      showViewinfo: false
    });
  };

  onClose = () => {
    this.setState({
      showEditWindow: false
    });
  };

  handleDelete = id => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter(item => item.id !== id),
      selectedRowKeys: []
    });
  };

  objectToCsv = data => {
    const csvRows = [];
    // get the header
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(","));

    // loop over the selected data rows
    for (const row of data) {
      const values = headers.map(header => {
        const val = row[header];
        const escaped = ("" + row[header]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(","));
    }
    return csvRows.join("\n");
  };

  download = data => {
    const blob = new Blob([data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "download.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  downloadCsv = () => {
    const selectedRowsKeys = this.state.selectedRowKeys;
    const dataSource = [...this.state.dataSource];
    const csvRows = [];
    const csvHeaderTemplate = [
      "id",
      "First Name",
      "Last Name",
      "Email",
      "Country",
      "Date Of Birth"
    ];
    csvRows.push(csvHeaderTemplate);

    const selectedRows = dataSource.filter(item =>
      selectedRowsKeys.includes(item.id)
    );

    const csvDate = this.objectToCsv(selectedRows);
    this.download(csvDate);
  };

  handleDeleteAll = () => {
    const selectRows = this.state.selectedRowKeys;
    const dataSource = [...this.state.dataSource];

    this.setState({
      dataSource: dataSource.filter(item => !selectRows.includes(item.id)),
      selectedRowKeys: []
    });
  };

  viewUserInfo = record => {
    this.setState({
      showViewinfo: true,
      viewUserInfo: record
    });
  };

  editUserInfo = record => {
    this.setState({
      showEditWindow: true,
      editUserInfo: record
    });
  };

  calcAge = dateString => {
    var birthday = +new Date(dateString);
    return ~~((Date.now() - birthday) / 31557600000);
  };

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  render() {
    const { dataSource, selectedRowKeys } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    const hasSelected = selectedRowKeys.length > 0;

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
        })
      };
    });
    return (
      <Fragment>
        <div className="button-controls">
          <Popconfirm
            title={
              "Are you sure, you want to bulk delete " +
              selectedRowKeys.length +
              " records ?"
            }
            okText={"Yes, Please"}
            cancelText={"NO"}
            onConfirm={this.handleDeleteAll}
            placement="bottomLeft"
          >
            <Button
              type="primary"
              icon={<DeleteOutlined />}
              disabled={!hasSelected}
            >
              Delete
            </Button>
          </Popconfirm>

          <Button
            type="primary"
            icon={<FileExcelOutlined />}
            onClick={this.downloadCsv}
            disabled={!hasSelected}
          >
            Download CSV
          </Button>
          <span>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          </span>
        </div>

        <Table
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns}
          rowSelection={rowSelection}
          rowKey={data => data.id}
          style={{ marginTop: 10 }}
        />
        <Drawer
          title="Edit user infomation"
          width={600}
          onClose={this.onClose}
          visible={this.state.showEditWindow}
          bodyStyle={{ paddingBottom: 80 }}
          destroyOnClose={true}
          footer={
            <div
              style={{
                textAlign: "right"
              }}
            >
              <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={this.onClose} type="primary">
                Submit
              </Button>
            </div>
          }
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="FirstName"
                  label="First Name"
                  rules={[
                    { required: true, message: "Please enter first name" }
                  ]}
                >
                  <Input
                    placeholder="First Name"
                    defaultValue={this.state.editUserInfo.firstName}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="lastName"
                  label="Last Name"
                  rules={[
                    { required: true, message: "Please enter last name" }
                  ]}
                >
                  <Input
                    placeholder="Last Name"
                    defaultValue={this.state.editUserInfo.lastName}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Please enter your email info" }
                  ]}
                >
                  <Input
                    placeholder="Email"
                    defaultValue={this.state.editUserInfo.email}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="country"
                  label="Country"
                  rules={[{ required: true, message: "Please enter contry" }]}
                >
                  <Select
                    placeholder="Please select country"
                    defaultValue={this.state.editUserInfo.country}
                  >
                    <Option value={this.state.editUserInfo.country}>
                      {this.state.editUserInfo.country}
                    </Option>
                    <Option value="all">List of other country</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="dateOfBirth"
                  label="Date Of Birth"
                  rules={[
                    {
                      required: true,
                      message: "Please select your date of birth"
                    }
                  ]}
                >
                  <DatePicker
                    defaultValue={moment(
                      this.state.editUserInfo.dateOfBirth,
                      dateFormat
                    )}
                    format={dateFormat}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>

        <Modal
          visible={this.state.showViewinfo}
          title={
            "View detailed information about " +
            this.state.viewUserInfo.firstName +
            " " +
            this.state.viewUserInfo.lastName
          }
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="submit" type="primary" onClick={this.handleOk}>
              Close
            </Button>
          ]}
        >
          <p>
            <strong>First Name</strong> : {this.state.viewUserInfo.firstName}
          </p>
          <p>
            <strong>Last Name</strong> : {this.state.viewUserInfo.lastName}
          </p>
          <p>
            <strong>Age</strong>:{" "}
            {this.calcAge(this.state.viewUserInfo.dateOfBirth)}
          </p>
        </Modal>
      </Fragment>
    );
  }
}


export function HomePage({}) {
  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="Ujjivan Small Finance Bank Ltd. Minimum Viable Product Demo"
        />
      </Helmet>
      <div className="container">
          <EditableTable />
      </div>
    </article>
  );
}

export default compose()(HomePage);
