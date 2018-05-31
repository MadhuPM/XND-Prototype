import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Table, Form, FormGroup, Label, Input } from 'reactstrap';
import _ from 'lodash';
import logo from './logo.svg';
import './App.css';
import funds from './data/funds.json';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "time": ""
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    const target = e.currentTarget;
    this.setState({
      [target.name]: target.value
    })
  }

  render() {
    const first_100_funds = _.slice(funds, 0, 100);
    const { time } = this.state;
    const data = first_100_funds.filter(fund => {
      if (time != "")
        return fund.Predicted_Time.indexOf(time) > -1 || fund.AlertTime.indexOf(time) > -1 || fund.Max_PredictedTime.indexOf(time) > -1;
      else
        return true;
    }).map((fund) => {
      return (
        <tr>
          <th scope="row">{fund.No + 1}</th>
          <td>{fund.FUND_ID}</td>
          <td>{fund.Predicted_Time}</td>
          <td>{fund.AlertTime}</td>
          <td>{fund.Max_PredictedTime}</td>
        </tr>
      );
    });

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Funds</h1>
        </header>
        <br />
        <Form inline>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="time" className="mr-sm-2">Search</Label>
            <Input type="text" name="time" value={this.state.time} onChange={this.handleChange} />
          </FormGroup>
        </Form>
        <br />
        <Table bordered striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Funds</th>
              <th>Predicted Time</th>
              <th>Alert Time</th>
              <th>Max Predicted Time</th>
            </tr>
          </thead>
          <tbody>
            {data}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
