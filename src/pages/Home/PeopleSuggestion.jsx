import React from 'react'
import profileDefaultImage from '../../images/default.png'

export default class PeopleSuggestion extends React.Component {
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
                <div className="people">
                    <img width="50" height="50" src={profileDefaultImage} alt="nome"/>
                    <p><b>nome sobrenome</b></p>
                    <p>eu com 17 anos acho que isso sobre a radicalização dos jovens foi na mosca. esses dias vi a minha mãe, que trabalha 11 horas por dia com dois empregos, falando que se tivesse trabalhado mais alguns anos atrás e se dedicado mais à escola, não precisaria trabalhar tanto hoje em dia.</p>
                </div>
            </>
        )
    }
}