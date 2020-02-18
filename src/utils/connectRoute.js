import React from 'react'

export default function connectRoute(WrappedComponent) {
	return class connectRoute extends React.Component {
		shouldComponentUpdate(nextProp) {
			return nextProp.location !== this.props.location
		}

		render() {
			return <WrappedComponent { ...this.props } />
		}
	}
}