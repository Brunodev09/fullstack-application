import React, { Component } from 'react';
import CustomList from '../List/CustomList';

/**
 * This component is responsible for displaying in a table all the useful links I have used to complete this challenge.
 */
class Reference extends Component {

    constructor(props) {
        super(props);
        this.state = {
            label: "List of references to complete the project: ",
            links: [
                {
                    link: 'https://stackoverflow.com/', comment: "Best friend <3"
                }, 
                {
                    link: 'https://material-ui.com/', comment: "Boring to customize but worth it."
                },
                {
                    link: 'https://www.docker.com/', comment: "References on compose and custom images."
                },
                {
                    link: 'https://www.amazon.com/', comment: "All my Computer Science eBooks are bought here."
                },
                {
                    link: 'https://medium.com/', comment: "Many cool Computer Science articles."
                },
                {
                    link: 'https://www.mongodb.com/', comment: "Checking for docker images compatibilities issues with Node LTS."
                },
                {
                    link: 'https://github.com/Brunodev09', comment: "Many references from my previous git repos."
                }
            ]
        }
    }

    openRef = (link) => {
		window.open(link);
	}


    render() {
        return (
            <CustomList openRef={this.openRef} label={this.state.label} list={this.state.links} />
        );
    }
}

export default Reference;