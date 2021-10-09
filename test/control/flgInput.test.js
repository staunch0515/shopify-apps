import { AppProvider } from '@shopify/polaris';

import React from "react";
import { mount, shallow } from 'enzyme';

import FlgInput from "../../components/control/flgInput.js"

let wrapper;

describe('FlgInput component', () => {

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
            expect(value).toBe("true");
            expect(valid).toBe("true");
        }

        wrapper = mount(
            <AppProvider>
                <FlgInput label="test" value="true" setValue={setValue} />
            </AppProvider>
        );

        //  expect(toJson(wrapper)).toMatchSnapshot();

    });

    it('initialling value is true.', () => {
        // initialling
        const label = wrapper.find("label");
        expect(label.text()).toBe('test');

        const input = wrapper.find("input");
        expect(input.instance().type).toBe('checkbox');

        expect(input.instance().checked).toBe(true);
        expect(input.prop("aria-checked")).toBe(true);
        expect(input.getDOMNode().getAttribute('aria-checked')).toBe("true");
    });

    it('initialling value is false', () => {
        // initialling
        wrapper = mount(
            <AppProvider>
                <FlgInput label="test" value={false} />
            </AppProvider>
        );
        //console.log(wrapper.props());
        /*
            {
                children:{
                    '$$typeof':Symbol(react.element),
                    type:[Function:FlgInput],
                    key:null,
                    ref:null,
                    props:{label:'test',value:'false'},
                    _owner:null,
                    _store:{}
                }
            }
        */
        //console.log(wrapper.state());
        /*
            {
                link:undefined,
                intl:I18n { translation:undefined}
                appBridge:undefined
            }
        */

        //  expect(wrapper.prop("value")).toBe('false');

        // expect(wrapper.children()).to.have.lengthOf(1);

        const input = wrapper.find("input");
        /*
            {
                onKeyUp:[Function:handleKeyUp],
                id:'PolarisCheckbox1',
                name:undefined,
                value:undefined,
                type:'checkbox',
                disabled:true,
                className:'Polaris-Checkbox_Input',
                onFocus:undefined,
                onBlur:[Function:stopPropagation],
                onClick:[Function:noop$2],
                'aria-invalid':false,
                'aria-describedby':undefined,
                role:'checkbox',
                'aria-checked':true
            }
        */
        expect(input.instance().type).toBe('checkbox');
        expect(input.instance().checked).toBe(false);
        expect(input.prop("aria-checked")).toBe(false);
        expect(input.getDOMNode().getAttribute('aria-checked')).toBe("false");
    });

    it('check value changed', () => {
        const input = wrapper.find("input");
        expect(input.instance().checked).toBe(true);
        // receive value
        input.simulate('click');

        expect(input.instance().checked).toBe(false);
        expect(input.getDOMNode().getAttribute('aria-checked')).toBe("false");
    });

    it('check setValue be invoked.', () => {

        const setValue = jest.fn();
        wrapper = mount(
            <AppProvider>
                <FlgInput label="test" value="true" setValue={setValue} />
            </AppProvider>
        );

        const input = wrapper.find("input");

        expect(input.instance().checked).toBe(true);

        const domNode = input.getDOMNode();
        domNode.checked = false;

        input.update();
        input.simulate('change');

        expect(input.getDOMNode().getAttribute('aria-checked')).toBe("false");
        expect(setValue).toHaveBeenCalled();
    })
});