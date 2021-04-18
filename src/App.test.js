import { render, screen, fireEvent} from '@testing-library/react';
import App from './App';
import DashBoard from './dashboard.js';
import News from './News.js';
import TodoPage from './ToDoComponents/TodoPage.js';
import Sample from './sample.js';
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