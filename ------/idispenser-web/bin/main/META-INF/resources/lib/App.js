import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import HubList from "./hubs/HubList/index.js";
import HubFinder from "./hubs/HubFinder/index.js";

function App() {

    return (
        <Fragment>
            OMG!
            <div className="container">
                <h1>{Liferay.Language.get('com.hartmann.idispenser.app-name')}</h1>
                <div className="App container-fluid container-fluid-max-xl container-form-lg">
                    <div className='sheet'>
                        <div className="row">
                            <div className={"col-6"}>
                                <HubFinder />
                            </div>
                            <div className={"col-6"}>
                                <HubList />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    )

}

export default App;