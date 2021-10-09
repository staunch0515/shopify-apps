import React, { useCallback, useState, useEffect } from 'react';
import { TextField, Icon, Popover, Button, FormLayout, Tag, Card, TextContainer } from '@shopify/polaris';
import {
    CancelSmallMinor,
    CirclePlusMajorMonotone
} from '@shopify/polaris-icons';

export default function TagInput({ label, value, rawTag, setRawTag, setValue, autoFocus }) {

    const [popoverActive, setPopoverActive] = useState(false);

    const togglePopoverActive = useCallback(() => {
        setPopoverActive(!popoverActive);
    }, []);

    const [tagList, setTagList] = useState(value ? value.split(",") : []);
    console.log("TagInput", rawTag);
    const [tag, setTag] = useState(rawTag);

    const handleAdd = (newValue) => {
        console.log("handleAdd tag", newValue);
        const exist = false;
        tagList.map(atag => {
            if (atag == newValue) {
                exist = true;
            }
        });
        if (exist == false) {
            tagList.push(newValue);
        }
        setTagList(tagList);
        const result = tagList.join();
        console.log("result", result);
        setValue(result, true);
        setPopoverActive(false);
        setTag("");
        setRawTag("");
    };

    const handleRemove = (atag) => {
        console.log("tag", tag);
        const list = [];
        tagList.map(xtag => {
            if (xtag != atag) {
                list(xtag);
            }
        });
        setTagList(list);
        const result = list.join();
        console.log("result", result);
        setValue(result, true);
    };

    const handleChange = useCallback((newValue) => {
        if (newValue.length > 2) {
            if (popoverActive == false) {
                setPopoverActive(true);
            }
        } else {
            if (popoverActive) {
                setPopoverActive(false);
            }
        }
        setTag(newValue);
        setRawTag(newValue);
    }, []);

    const activator = (
        <TextField
            label={label}
            placeholder="入力してください"
            value={tag}
            maxLength={10}
            minLength={10}
            autoFocus={autoFocus ? autoFocus : false}
            onChange={handleChange}
            align="left"
        />
    );

    return (
        <FormLayout>
            <Popover
                active={popoverActive}
                activator={activator}
                fluidContent={true}
                fullHeight={true}
                preferredAlignment="left"
                onClose={togglePopoverActive}
            >
                <Popover.Pane>
                    <Button icon={CirclePlusMajorMonotone} onClick={() => handleAdd(tag)}>追加</Button>
                </Popover.Pane>
            </Popover>
            <p>
                {
                    tagList.map(atag => {
                        return <Tag onRemove={handleRemove(atag)}>{atag}</Tag>
                    })
                }
            </p>
        </FormLayout>
    );
}