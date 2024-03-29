import React from 'react';
import ReactDOM from 'react-dom';

export default class extends React.Component {
	render() {
		return (
            <div>
				<div>
        	        <span className="tag">{Liferay.Language.get('portlet-namespace')}:</span> 
					<span className="value">{this.props.portletNamespace}</span>
				</div>
				<div>
    	            <span className="tag">{Liferay.Language.get('context-path')}:</span>
					<span className="value">{this.props.contextPath}</span>
				</div>
				<div>
	                <span className="tag">{Liferay.Language.get('portlet-element-id')}:</span>
					<span className="value">{this.props.portletElementId}</span>
				</div>
				
			</div>
		);
	}	
}