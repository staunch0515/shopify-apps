import { AppProvider } from '@shopify/polaris';

import React from "react";
import { mount } from 'enzyme';

import TitleInput from "../../components/control/titleInput.js"

let wrapper;

describe('TitleInput component', () => {

    beforeAll(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: jest.fn(), // deprecated
                removeListener: jest.fn(), // deprecated
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        });
    });

    beforeEach(() => {

        const setValue = (value, valid) => {
            if (value && value.length > 2) {
                expect(valid).toBe(true);
            } else {
                expect(valid).toBe(false);
            }
        }

        wrapper = mount(
            <AppProvider>
                <TitleInput label="test" text="test001" setValue={setValue} autoFocus={true} />
            </AppProvider>
        );

        expect(wrapper).toMatchSnapshot();

    });

    it('initialling', () => {
        // initialling
        const label = wrapper.find("label");
        expect(label.text()).toBe('test');

        const input = wrapper.find("input");
        expect(input.instance().value).toBe('test001');
    });

    it('check value changed', () => {
        const input = wrapper.find("input");
        // receive value
        input.getDOMNode().value = 'test003';
        input.simulate('change', input);
    });

    it('check value changed', () => {
        const input = wrapper.find("input");
        // receive value
        input.getDOMNode().value = 't';
        input.simulate('change', input);
    });

    it('check value changed', () => {
        const input = wrapper.find("input");
        // receive value
        input.getDOMNode().value = 'ZDFeiell';
        input.simulate('change', input);
    });
});