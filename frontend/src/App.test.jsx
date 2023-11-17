// This file can be deleted if you'd like
import React from 'react';
import Enzyme, { shallow } from 'enzyme'

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Register from './pages/Register';
// import CreateListing from './pages/CreateListing';

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

describe('<Register/>', () => {
  it('Should render a registration Page', () => {
    Enzyme.configure({ adapter: new Adapter() });
    // Render a single register Form
    const wrapper = shallow(<Register/>)
    const form = wrapper.find({ name: 'Registration-Grid' })
    expect(form).toHaveLength(1)
    // Should have a register Heading
    const text = wrapper.find('h2')
    expect(text).toHaveLength(1)
    expect(text.text()).toEqual('Register');

    // Find input for name
    const nameInput = wrapper.find({ name: 'form-input-name' })
    expect(nameInput).toHaveLength(1)
    // Find input for email
    const emailInput = wrapper.find({ name: 'form-input-email' })
    expect(emailInput).toHaveLength(1)

    const passwordInput = wrapper.find({ name: 'form-input-password' })
    expect(passwordInput).toHaveLength(1)

    const confirmPasswordInput = wrapper.find({ name: 'form-input-password-confirm' })
    expect(confirmPasswordInput).toHaveLength(1)

    const submit = wrapper.find({ name: 'Registration-form-submit' })
    expect(submit).toHaveLength(1)
    expect(submit.text()).toEqual('Submit')
  })
})

describe('<Create Listing/>', () => {
  it('Should Create a listing', () => {
    const click = jest.fn()
    Enzyme.configure({ adapter: new Adapter() });
    // const wrapper = shallow(<CreateListing/>)
    // const form = wrapper.find('form')
    // expect(form).toHaveLength(1)
    // const title = wrapper.find({ name: 'createListing-Title' })
    // expect(title.text()).toEqual('Enter Listing Details')

    // <submitListingButton/>
    const upload = shallow(<submitListingButton onClick = {click}/>)
    upload.simulate('click')
    expect(click).toHaveBeenCalledTimes(1)
  })
})

// describe('<Search Bar>', () => {

// })
