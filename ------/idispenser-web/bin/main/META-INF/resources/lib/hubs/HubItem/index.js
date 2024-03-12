import ReactDOM from 'react-dom';
import React from "react";
import ClayTable from '@clayui/table';
import {Fragment} from "react";

export default function HubItem(props) {


    return (
        <Fragment>
            <ClayTable.Row>
                <ClayTable.Cell columnTextAlignment="start">{props.idConcentrador}</ClayTable.Cell>
                <ClayTable.Cell  columnTextAlignment="end">{props.nombreIDC}</ClayTable.Cell>
            </ClayTable.Row>
        </Fragment>
    );

};