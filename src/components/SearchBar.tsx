import React from 'react';
import {Input} from "antd";
import {SearchOutlined} from '@ant-design/icons';

interface Props {
    searchValue: string;
    onChange: (value: string) => void;
    placeholder: string;
}

const SearchBar = ({
    searchValue,
    onChange,
    placeholder,
}: Props) => {
    return <Input
        value={searchValue}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        prefix={<SearchOutlined/>}
    />
};

export default SearchBar;