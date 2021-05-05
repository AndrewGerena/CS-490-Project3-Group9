import { render, screen, fireEvent} from '@testing-library/react';
import App from './App';
import DashBoard from './dashboard.js';
import News from './News.js';
import TodoPage from './ToDoComponents/TodoPage.js';
import Sample from './sample.js';
import Profile from './Profile.js';
import Tile from './Tile';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount } from 'enzyme';
configure({ adapter: new Adapter() });


test("Failed Login", () => {
  const LogingPage = render(<App  />);
  const LoginBtnElement = screen.getByText("Sign in with Google");
  expect(LoginBtnElement).toBeInTheDocument();
  
  fireEvent.click(LoginBtnElement);
  expect(LoginBtnElement).toBeInTheDocument();
});


test('Successful Login', () => {
  render(<App />);
  const Signin_btn = screen.getByText('Sign in with Google');
  expect(Signin_btn).toBeInTheDocument(); 
  fireEvent.click(Signin_btn);

  const wrapper = mount(<DashBoard />);
  expect(wrapper.text()).toMatch("Personal Profile");
  expect(wrapper.text()).toMatch("Local Weather");
  expect(wrapper.text()).toMatch("News Updates");
  expect(wrapper.text()).toMatch("Daily Tasks");
});


test('Accessing Profile Page', () => {
  render(<App />);
  const Signin_btn = screen.getByText('Sign in with Google');
  expect(Signin_btn).toBeInTheDocument(); 
  fireEvent.click(Signin_btn);

  const Dashboard = mount(<DashBoard />);
  expect(Dashboard.text()).toMatch("Personal Profile");
  expect(Dashboard.text()).toMatch("Local Weather");
  expect(Dashboard.text()).toMatch("News Updates");
  expect(Dashboard.text()).toMatch("Daily Tasks");
  

  const wrapper = mount(<Profile />);
  expect(wrapper.text()).toMatch("Set your zipcode here");

});


test('Accessing weather Page', () => {
  render(<App />);
  const Signin_btn = screen.getByText('Sign in with Google');
  expect(Signin_btn).toBeInTheDocument(); 
  fireEvent.click(Signin_btn);

  const Dashboard = mount(<DashBoard />);
  expect(Dashboard.text()).toMatch("Personal Profile");
  expect(Dashboard.text()).toMatch("Local Weather");
  expect(Dashboard.text()).toMatch("News Updates");
  expect(Dashboard.text()).toMatch("Daily Tasks");
  

  //const  wrapper = mount(<News />);
  //expect(wrapper.text()).toMatch("News Section!");
  
});


test('Accessing Todo Page', () => {
  render(<App />);
  const Signin_btn = screen.getByText('Sign in with Google');
  expect(Signin_btn).toBeInTheDocument(); 
  fireEvent.click(Signin_btn);

  const Dashboard = mount(<DashBoard />);
  expect(Dashboard.text()).toMatch("Personal Profile");
  expect(Dashboard.text()).toMatch("Local Weather");
  expect(Dashboard.text()).toMatch("News Updates");
  expect(Dashboard.text()).toMatch("Daily Tasks");
  

  const  wrapper = mount(<TodoPage />);
  expect(wrapper.text()).toMatch("Enter Your Task:");
  
});