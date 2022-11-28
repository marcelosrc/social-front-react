import React from 'react'
import PeopleSuggestion from './PeopleSuggestion'

export default class PeoplePanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {

    }
    showProfile() {

    }
    render() {
        return (
            <> 
                <div className="people-panel">
                    <PeopleSuggestion />
                    <PeopleSuggestion />
                    <PeopleSuggestion />
                    <PeopleSuggestion />
                    <PeopleSuggestion />
                    <PeopleSuggestion />
                    <PeopleSuggestion />
                    <PeopleSuggestion />
                    <PeopleSuggestion />
                </div>
            </>
        )
    }
}