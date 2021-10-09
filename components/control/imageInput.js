import React, { useCallback, useState, useEffect, } from 'react';
import {
    DropZone,
    Stack,
    Caption,
    Thumbnail
} from '@shopify/polaris';

export default function ImageInput({ label, value, setValue }) {
    const [file, setFile] = useState();

    const handleDropZoneDrop = useCallback(
        (_dropFiles, acceptedFiles, _rejectedFiles) => {
            console.log(JSON.stringify(acceptedFiles[0]))

            var reader = new window.FileReader();
            reader.onload = function () {
                var base64data = reader.result;
                setValue(base64data, true);
            }
            reader.readAsDataURL(acceptedFiles[0]);
            setFile((file) => acceptedFiles[0]);
        },
        [],
    );

    const imageToBase64 = (img) => {
        var canvas, ctx, dataURL, base64;
        canvas = document.createElement("canvas");
        ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        dataURL = canvas.toDataURL("image/png");
        base64 = dataURL.replace(/^data:image\/png;base64,/, "");
        return base64;
    }

    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

    const fileUpload = !file && <DropZone.FileUpload />;
    const uploadedFile = file && (
        <Stack>
            <Thumbnail
                size="small"
                alt={file.name}
                source={
                    validImageTypes.indexOf(file.type) > 0
                        ? window.URL.createObjectURL(file)
                        : 'https://cdn.shopify.com/s/files/1/0757/9955/files/New_Post.png?12678548500147524304'
                }
            />
            <div>
                {file.name} <Caption>{file.size} bytes</Caption>
            </div>
        </Stack>
    );

    const usedImage = file ? uploadedFile : (value && (
        <Stack>
            <Thumbnail
                size="small"
                source={value}
            />
        </Stack>
    ))

    return (
        <DropZone
            label={label}
            allowMultiple={false}
            disabled={setValue ? false : true}
            onDrop={handleDropZoneDrop}>
            {usedImage}
            {fileUpload}
        </DropZone>
    );
}