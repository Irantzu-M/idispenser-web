import ReactDOM from 'react-dom';
import React, {Fragment, useEffect, useState} from "react";
import ClayTable from "@clayui/table";
import ClayForm, {ClayInput} from "@clayui/form";
import HubItem from "../HubItem/index.js";
import useHubStore from "../../zustand/stores/hubStore.js"

function HubFinder() {

    const {getHub, fetchHub, hub} = useHubStore((state) => ({
        getHub: state.getHub,
        fetchHub: state.fetchHub,
        hub: state.hub
    }));

    const [hubId, setHubId] = useState("");

    function handleKeyPressUpFindHub(evt) {
        if (evt.keyCode === 13) {
            fetchHub(hubId);
            setHubId(hubId);
        }
    }

    function handleOnChangeFindHub(evt) {
        setHubId(evt.currentTarget.value);
    }


    return (
        <Fragment>
            <h2>{Liferay.Language.get('com.hartmann.idispenser.hub-finder')}</h2>

            <ClayForm.Group>
                <label htmlFor="basicInputText">{Liferay.Language.get('com.hartmann.idispenser.hub-finder')}</label>
                <ClayInput onKeyUp={handleKeyPressUpFindHub} onChange={handleOnChangeFindHub}
                           component="input"
                           id="hubFinder"
                           placeholder="Insert your hub id here"
                           type="text"
                           value={hubId}
                />

                {!hub? "Loading hub..." :
                    <ClayTable striped>
                        <ClayTable.Head>
                            <ClayTable.Row>
                                <ClayTable.Cell headingCell columnTextAlignment="left">{"Id"}</ClayTable.Cell>
                                <ClayTable.Cell className="table-cell-small table-cell-minw-50" expanded
                                                headingCell>{"Nombre"}</ClayTable.Cell>
                            </ClayTable.Row>
                        </ClayTable.Head>
                        <ClayTable.Body>
                            <HubItem key={getHub().idConcentrador} {...getHub()} />
                        </ClayTable.Body>
                    </ClayTable>
                }

            </ClayForm.Group>

        </Fragment>

    );

};

export default HubFinder;