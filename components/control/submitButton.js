import React, { useCallback, useState, useEffect } from 'react';
import {
    Button
} from '@shopify/polaris';

export default function SubmitButton({ label, text, setValue }) {
    return (<Button primary
        loading={this.state.loading}
        onClick={this.handleClick}
        disabled={this.state.submitable}>
        {this.state.frmType.isNewRecord ? '登録' : '保存'}
    </Button>
    );
}