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
      dataSource: [{"id":1,"firstName":"Carl","lastName":"Ray","email":"cray0@paginegialle.it","country":"China","dateOfBirth":"1989-04-01T17:01:46Z"},
      {"id":2,"firstName":"Robin","lastName":"Rogers","email":"rrogers1@noaa.gov","country":"Poland","dateOfBirth":"1988-02-26T22:37:10Z"},
      {"id":3,"firstName":"Jonathan","lastName":"Crawford","email":"jcrawford2@meetup.com","country":"Finland","dateOfBirth":"1990-05-25T02:58:56Z"},
      {"id":4,"firstName":"Irene","lastName":"Nichols","email":"inichols3@va.gov","country":"Pakistan","dateOfBirth":"1981-08-02T18:33:47Z"},
      {"id":5,"firstName":"Angela","lastName":"Lee","email":"alee4@hexun.com","country":"United States","dateOfBirth":"1982-12-26T23:08:25Z"},
      {"id":6,"firstName":"Mark","lastName":"Lynch","email":"mlynch5@oracle.com","country":"China","dateOfBirth":"1984-07-09T22:49:35Z"},
      {"id":7,"firstName":"Marie","lastName":"Gordon","email":"mgordon6@wikispaces.com","country":"Poland","dateOfBirth":"1983-11-27T10:03:13Z"},
      {"id":8,"firstName":"Eugene","lastName":"Bowman","email":"ebowman7@ustream.tv","country":"China","dateOfBirth":"1984-08-22T04:56:18Z"},
      {"id":9,"firstName":"Timothy","lastName":"Sullivan","email":"tsullivan8@dyndns.org","country":"Brazil","dateOfBirth":"1989-01-03T13:13:26Z"},
      {"id":10,"firstName":"Kathryn","lastName":"Graham","email":"kgraham9@hhs.gov","country":"Philippines","dateOfBirth":"1982-10-14T22:58:17Z"},
      {"id":11,"firstName":"Amanda","lastName":"Fisher","email":"afishera@webnode.com","country":"Indonesia","dateOfBirth":"1986-07-25T02:59:17Z"},
      {"id":12,"firstName":"Irene","lastName":"Morales","email":"imoralesb@arstechnica.com","country":"United States","dateOfBirth":"1987-10-02T21:03:43Z"},
      {"id":13,"firstName":"Diane","lastName":"Garza","email":"dgarzac@chicagotribune.com","country":"China","dateOfBirth":"1983-01-19T11:00:40Z"},
      {"id":14,"firstName":"Eric","lastName":"Garrett","email":"egarrettd@aboutads.info","country":"Russia","dateOfBirth":"1989-12-21T19:43:28Z"},
      {"id":15,"firstName":"Jerry","lastName":"Welch","email":"jwelche@webs.com","country":"Indonesia","dateOfBirth":"1985-10-07T17:53:03Z"},
      {"id":16,"firstName":"Jesse","lastName":"Carr","email":"jcarrf@nymag.com","country":"Philippines","dateOfBirth":"1984-02-06T08:11:45Z"},
      {"id":17,"firstName":"Ruth","lastName":"Smith","email":"rsmithg@rakuten.co.jp","country":"Mongolia","dateOfBirth":"1987-11-29T16:30:37Z"},
      {"id":18,"firstName":"Ruby","lastName":"Stevens","email":"rstevensh@booking.com","country":"Spain","dateOfBirth":"1986-12-25T11:09:17Z"},
      {"id":19,"firstName":"Lisa","lastName":"Alexander","email":"lalexanderi@woothemes.com","country":"China","dateOfBirth":"1986-05-08T04:49:52Z"},
      {"id":20,"firstName":"Anne","lastName":"Torres","email":"atorresj@altervista.org","country":"Japan","dateOfBirth":"1990-07-04T01:08:57Z"},
      {"id":21,"firstName":"Karen","lastName":"Spencer","email":"kspencerk@prlog.org","country":"China","dateOfBirth":"1982-11-29T01:23:56Z"},
      {"id":22,"firstName":"Steve","lastName":"Webb","email":"swebbl@ezinearticles.com","country":"China","dateOfBirth":"1990-02-02T18:31:36Z"},
      {"id":23,"firstName":"Theresa","lastName":"Diaz","email":"tdiazm@studiopress.com","country":"Brazil","dateOfBirth":"1982-11-14T07:39:49Z"},
      {"id":24,"firstName":"Mildred","lastName":"Young","email":"myoungn@163.com","country":"China","dateOfBirth":"1990-02-26T21:22:35Z"},
      {"id":25,"firstName":"Nicole","lastName":"White","email":"nwhiteo@time.com","country":"Sweden","dateOfBirth":"1984-06-21T08:03:19Z"},
      {"id":26,"firstName":"Elizabeth","lastName":"Franklin","email":"efranklinp@mit.edu","country":"Sweden","dateOfBirth":"1984-07-05T10:18:28Z"},
      {"id":27,"firstName":"Kelly","lastName":"Thompson","email":"kthompsonq@newyorker.com","country":"Czech Republic","dateOfBirth":"1990-02-24T03:52:38Z"},
      {"id":28,"firstName":"Kathleen","lastName":"Lynch","email":"klynchr@creativecommons.org","country":"Czech Republic","dateOfBirth":"1989-03-14T16:13:32Z"},
      {"id":29,"firstName":"Raymond","lastName":"Lopez","email":"rlopezs@sitemeter.com","country":"China","dateOfBirth":"1988-07-18T22:05:50Z"},
      {"id":30,"firstName":"Christina","lastName":"Greene","email":"cgreenet@technorati.com","country":"Colombia","dateOfBirth":"1987-04-16T02:15:43Z"},
      {"id":31,"firstName":"Lawrence","lastName":"Howard","email":"lhowardu@alibaba.com","country":"China","dateOfBirth":"1984-09-05T10:11:59Z"},
      {"id":32,"firstName":"Christine","lastName":"Gutierrez","email":"cgutierrezv@google.com","country":"Chile","dateOfBirth":"1985-04-02T02:58:05Z"},
      {"id":33,"firstName":"Dorothy","lastName":"Ellis","email":"dellisw@prweb.com","country":"Sweden","dateOfBirth":"1989-04-22T14:41:52Z"},
      {"id":34,"firstName":"Victor","lastName":"Harvey","email":"vharveyx@newyorker.com","country":"Russia","dateOfBirth":"1986-04-22T02:17:23Z"},
      {"id":35,"firstName":"Antonio","lastName":"Perkins","email":"aperkinsy@hhs.gov","country":"United States","dateOfBirth":"1983-05-20T21:11:59Z"},
      {"id":36,"firstName":"Matthew","lastName":"White","email":"mwhitez@jalbum.net","country":"Jordan","dateOfBirth":"1989-10-09T11:01:10Z"},
      {"id":37,"firstName":"Joshua","lastName":"White","email":"jwhite10@addtoany.com","country":"Thailand","dateOfBirth":"1990-12-03T14:51:59Z"},
      {"id":38,"firstName":"Jason","lastName":"Long","email":"jlong11@mediafire.com","country":"Canada","dateOfBirth":"1987-02-02T12:53:38Z"},
      {"id":39,"firstName":"Cynthia","lastName":"Kelly","email":"ckelly12@mit.edu","country":"Marshall Islands","dateOfBirth":"1989-05-04T15:35:29Z"},
      {"id":40,"firstName":"Louis","lastName":"Meyer","email":"lmeyer13@fotki.com","country":"Saudi Arabia","dateOfBirth":"1986-05-30T20:48:00Z"},
      {"id":41,"firstName":"Mark","lastName":"Spencer","email":"mspencer14@zdnet.com","country":"Uzbekistan","dateOfBirth":"1982-05-28T14:47:46Z"},
      {"id":42,"firstName":"Joe","lastName":"Morgan","email":"jmorgan15@over-blog.com","country":"Russia","dateOfBirth":"1983-01-30T12:22:17Z"},
      {"id":43,"firstName":"Laura","lastName":"Morgan","email":"lmorgan16@cnet.com","country":"Sweden","dateOfBirth":"1981-02-24T11:25:49Z"},
      {"id":44,"firstName":"Roger","lastName":"King","email":"rking17@microsoft.com","country":"Macedonia","dateOfBirth":"1984-11-04T22:11:11Z"},
      {"id":45,"firstName":"Lois","lastName":"Brooks","email":"lbrooks18@salon.com","country":"Argentina","dateOfBirth":"1984-05-06T08:01:41Z"},
      {"id":46,"firstName":"Frances","lastName":"Reid","email":"freid19@free.fr","country":"China","dateOfBirth":"1984-01-01T03:43:52Z"},
      {"id":47,"firstName":"Shawn","lastName":"Duncan","email":"sduncan1a@tiny.cc","country":"Poland","dateOfBirth":"1981-07-12T09:10:04Z"},
      {"id":48,"firstName":"Lori","lastName":"Stewart","email":"lstewart1b@boston.com","country":"Indonesia","dateOfBirth":"1990-06-01T12:55:32Z"},
      {"id":49,"firstName":"Kevin","lastName":"Morgan","email":"kmorgan1c@baidu.com","country":"China","dateOfBirth":"1982-02-07T00:35:11Z"},
      {"id":50,"firstName":"Linda","lastName":"Patterson","email":"lpatterson1d@wordpress.com","country":"Indonesia","dateOfBirth":"1989-10-03T09:51:37Z"},
      {"id":51,"firstName":"Kimberly","lastName":"Mason","email":"kmason1e@addtoany.com","country":"Venezuela","dateOfBirth":"1985-03-28T07:43:56Z"},
      {"id":52,"firstName":"Phillip","lastName":"Palmer","email":"ppalmer1f@123-reg.co.uk","country":"Indonesia","dateOfBirth":"1981-03-21T18:38:10Z"},
      {"id":53,"firstName":"Arthur","lastName":"Chapman","email":"achapman1g@yandex.ru","country":"Denmark","dateOfBirth":"1989-04-28T07:38:53Z"},
      {"id":54,"firstName":"Mildred","lastName":"Brown","email":"mbrown1h@fastcompany.com","country":"Czech Republic","dateOfBirth":"1981-12-04T14:53:31Z"},
      {"id":55,"firstName":"Jean","lastName":"Ross","email":"jross1i@globo.com","country":"Russia","dateOfBirth":"1984-10-10T20:36:49Z"},
      {"id":56,"firstName":"Walter","lastName":"Rivera","email":"wrivera1j@dion.ne.jp","country":"Vietnam","dateOfBirth":"1986-07-15T18:05:02Z"},
      {"id":57,"firstName":"Douglas","lastName":"Ferguson","email":"dferguson1k@yandex.ru","country":"Poland","dateOfBirth":"1988-06-04T18:05:29Z"},
      {"id":58,"firstName":"Harold","lastName":"Murphy","email":"hmurphy1l@amazon.de","country":"China","dateOfBirth":"1985-03-04T00:04:59Z"},
      {"id":59,"firstName":"Martha","lastName":"Bennett","email":"mbennett1m@wikia.com","country":"Moldova","dateOfBirth":"1985-03-26T22:27:08Z"},
      {"id":60,"firstName":"Alice","lastName":"Cole","email":"acole1n@addthis.com","country":"United States","dateOfBirth":"1982-01-01T16:15:03Z"},
      {"id":61,"firstName":"Louis","lastName":"Evans","email":"levans1o@odnoklassniki.ru","country":"Argentina","dateOfBirth":"1987-02-21T22:30:43Z"},
      {"id":62,"firstName":"Rachel","lastName":"Morales","email":"rmorales1p@unicef.org","country":"Russia","dateOfBirth":"1988-11-26T14:24:24Z"},
      {"id":63,"firstName":"Donald","lastName":"George","email":"dgeorge1q@jigsy.com","country":"China","dateOfBirth":"1982-02-27T23:34:00Z"},
      {"id":64,"firstName":"Angela","lastName":"Hill","email":"ahill1r@google.nl","country":"Bosnia and Herzegovina","dateOfBirth":"1982-05-02T05:00:33Z"},
      {"id":65,"firstName":"Jonathan","lastName":"Knight","email":"jknight1s@google.pl","country":"Russia","dateOfBirth":"1987-02-13T01:38:30Z"},
      {"id":66,"firstName":"Gerald","lastName":"Cook","email":"gcook1t@thetimes.co.uk","country":"Russia","dateOfBirth":"1987-09-13T09:15:05Z"},
      {"id":67,"firstName":"Sarah","lastName":"Russell","email":"srussell1u@reference.com","country":"Czech Republic","dateOfBirth":"1988-05-04T20:47:51Z"},
      {"id":68,"firstName":"Harold","lastName":"Smith","email":"hsmith1v@newsvine.com","country":"China","dateOfBirth":"1988-08-01T23:23:32Z"},
      {"id":69,"firstName":"Jose","lastName":"Gibson","email":"jgibson1w@bloglines.com","country":"Indonesia","dateOfBirth":"1986-07-20T22:35:00Z"},
      {"id":70,"firstName":"Ronald","lastName":"Kelly","email":"rkelly1x@ucla.edu","country":"Indonesia","dateOfBirth":"1985-12-02T23:59:28Z"},
      {"id":71,"firstName":"Louise","lastName":"Gutierrez","email":"lgutierrez1y@wordpress.org","country":"Belize","dateOfBirth":"1990-05-29T12:09:15Z"},
      {"id":72,"firstName":"Johnny","lastName":"Long","email":"jlong1z@last.fm","country":"Indonesia","dateOfBirth":"1982-10-30T00:12:51Z"},
      {"id":73,"firstName":"Phyllis","lastName":"Palmer","email":"ppalmer20@mozilla.org","country":"Philippines","dateOfBirth":"1985-10-06T13:46:44Z"},
      {"id":74,"firstName":"Justin","lastName":"Chapman","email":"jchapman21@amazonaws.com","country":"Argentina","dateOfBirth":"1989-09-19T23:05:16Z"},
      {"id":75,"firstName":"Kathryn","lastName":"King","email":"kking22@desdev.cn","country":"Guyana","dateOfBirth":"1985-07-22T22:26:21Z"},
      {"id":76,"firstName":"Lillian","lastName":"Henry","email":"lhenry23@goo.gl","country":"Paraguay","dateOfBirth":"1983-09-17T04:28:07Z"},
      {"id":77,"firstName":"Donald","lastName":"Green","email":"dgreen24@amazon.de","country":"China","dateOfBirth":"1983-10-10T10:11:27Z"},
      {"id":78,"firstName":"Arthur","lastName":"Ford","email":"aford25@home.pl","country":"Philippines","dateOfBirth":"1984-10-05T13:53:34Z"},
      {"id":79,"firstName":"Keith","lastName":"Hernandez","email":"khernandez26@hc360.com","country":"Indonesia","dateOfBirth":"1981-11-20T17:17:58Z"},
      {"id":80,"firstName":"Frank","lastName":"Stone","email":"fstone27@nyu.edu","country":"Portugal","dateOfBirth":"1988-12-31T01:56:47Z"},
      {"id":81,"firstName":"Jessica","lastName":"Spencer","email":"jspencer28@springer.com","country":"Madagascar","dateOfBirth":"1981-01-04T08:07:37Z"},
      {"id":82,"firstName":"Steven","lastName":"Carpenter","email":"scarpenter29@infoseek.co.jp","country":"China","dateOfBirth":"1986-12-10T16:06:03Z"},
      {"id":83,"firstName":"Ashley","lastName":"Hernandez","email":"ahernandez2a@loc.gov","country":"China","dateOfBirth":"1981-04-25T00:31:32Z"},
      {"id":84,"firstName":"Billy","lastName":"Ray","email":"bray2b@hostgator.com","country":"France","dateOfBirth":"1989-05-08T09:38:15Z"},
      {"id":85,"firstName":"Emily","lastName":"Wagner","email":"ewagner2c@about.me","country":"Kazakhstan","dateOfBirth":"1984-12-02T01:51:19Z"},
      {"id":86,"firstName":"Harry","lastName":"Boyd","email":"hboyd2d@jimdo.com","country":"China","dateOfBirth":"1986-09-14T02:25:41Z"},
      {"id":87,"firstName":"Irene","lastName":"Mccoy","email":"imccoy2e@umn.edu","country":"Mexico","dateOfBirth":"1986-08-08T16:39:31Z"},
      {"id":88,"firstName":"Lillian","lastName":"Barnes","email":"lbarnes2f@yandex.ru","country":"Indonesia","dateOfBirth":"1983-11-11T12:07:37Z"},
      {"id":89,"firstName":"Ruby","lastName":"Rogers","email":"rrogers2g@vimeo.com","country":"Brazil","dateOfBirth":"1986-11-13T13:08:58Z"},
      {"id":90,"firstName":"Robin","lastName":"Burns","email":"rburns2h@lycos.com","country":"Sweden","dateOfBirth":"1987-06-23T10:52:16Z"},
      {"id":91,"firstName":"Phillip","lastName":"Gordon","email":"pgordon2i@craigslist.org","country":"Czech Republic","dateOfBirth":"1989-03-14T18:38:08Z"},
      {"id":92,"firstName":"Jerry","lastName":"Woods","email":"jwoods2j@techcrunch.com","country":"China","dateOfBirth":"1983-07-12T02:26:10Z"},
      {"id":93,"firstName":"Daniel","lastName":"Gibson","email":"dgibson2k@cnn.com","country":"Peru","dateOfBirth":"1987-10-10T13:07:27Z"},
      {"id":94,"firstName":"Teresa","lastName":"Alvarez","email":"talvarez2l@hhs.gov","country":"Macedonia","dateOfBirth":"1989-12-05T11:27:23Z"},
      {"id":95,"firstName":"Robin","lastName":"Mccoy","email":"rmccoy2m@columbia.edu","country":"Portugal","dateOfBirth":"1988-01-24T15:44:52Z"},
      {"id":96,"firstName":"David","lastName":"Hansen","email":"dhansen2n@eventbrite.com","country":"Mongolia","dateOfBirth":"1984-11-15T07:11:39Z"},
      {"id":97,"firstName":"Charles","lastName":"Willis","email":"cwillis2o@cbsnews.com","country":"China","dateOfBirth":"1985-09-17T04:34:49Z"},
      {"id":98,"firstName":"Kathleen","lastName":"Frazier","email":"kfrazier2p@youtu.be","country":"Argentina","dateOfBirth":"1983-07-15T16:42:31Z"},
      {"id":99,"firstName":"Brandon","lastName":"Clark","email":"bclark2q@vinaora.com","country":"Poland","dateOfBirth":"1982-08-11T11:03:25Z"},
      {"id":100,"firstName":"Evelyn","lastName":"Gardner","email":"egardner2r@shutterfly.com","country":"Poland","dateOfBirth":"1981-09-25T14:33:15Z"}],
      selectedRowKeys: [],
      showViewinfo: false,
      showEditWindow: false,
      viewUserInfo: [],
      editUserInfo: []
    };
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
