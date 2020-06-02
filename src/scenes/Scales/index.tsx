import React, {useState} from 'react'
import {Col, Row} from "antd";
import SearchBar from "../../components/SearchBar";

function Scales() {
    const [searchValue, setSearchValue] = useState('');

    return (
        <>
            <Row>
                <Col span={4} offset={3}>
                    <SearchBar
                        searchValue={searchValue}
                        onChange={setSearchValue}
                        placeholder={'Search scales by id...'}
                    />
                </Col>
            </Row>
            <Row justify={'center'}>
                <Col span={18}>

                </Col>
            </Row>
        </>
    )
}

export default Scales;