import ReactDOM from 'react-dom';
import React, {Fragment, useEffect, useState} from "react";
import ClayTable from "@clayui/table";
import HubItem from "../HubItem/index.js";
import useHubStore from "../../zustand/stores/hubStore.js"

function HubList() {

    const {getHubs, fetchHubs, loaded} = useHubStore((state) => ({
        getHubs: state.getHubs,
        fetchHubs: state.fetchHubs,
        loaded: state.loaded
    }));

    useEffect((e) => {
        fetchHubs();
    }, [fetchHubs]);

    return (
        <Fragment>
            <h2>{Liferay.Language.get('com.hartmann.idispenser.hub-list')}</h2>
            {!loaded ? "Loading hubs..." :
                <ClayTable striped>
                    <ClayTable.Head>
                        <ClayTable.Row>
                            <ClayTable.Cell headingCell columnTextAlignment="left">{"Id"}</ClayTable.Cell>
                            <ClayTable.Cell className="table-cell-small table-cell-minw-50" expanded
                                            headingCell>{"Nombre"}</ClayTable.Cell>
                        </ClayTable.Row>
                    </ClayTable.Head>
                    <ClayTable.Body>
                        {getHubs().map(
                            (hub, index, array) => {
                                return (
                                    <HubItem key={hub.idConcentrador} {...hub} />
                                )
                            }
                        )}
                    </ClayTable.Body>
                </ClayTable>
            }
        </Fragment>

    );

};

export default HubList;