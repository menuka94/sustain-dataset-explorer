import React from 'react';

import {MainNavbar} from "./navbar";
import {QueryConstructor} from "./query-constructor";
import {AllMaps} from "./all-maps";


export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeDatasets: [],
        };
        this.addActiveDataset = this.addActiveDataset.bind(this);
        this.removeActiveDataset = this.removeActiveDataset.bind(this);
    }


    addActiveDataset(dataset) {
        const activeDatasets = [...this.state.activeDatasets];
        activeDatasets.push(dataset);
        this.setState({
            activeDatasets: activeDatasets
        });
    }

    removeActiveDataset(dataset) {
        // console.log('removeActiveDataset:', dataset);
        let activeDatasets = [...this.state.activeDatasets];
        const index = activeDatasets.indexOf(dataset);
        if (index > -1) {
            activeDatasets.splice(index, 1);
        }

        // console.log('updatedActiveDatasets:', activeDatasets);
        this.setState({
            activeDatasets: activeDatasets
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <MainNavbar/>
                <div className="row">
                    <div className="col-lg-3">
                        <QueryConstructor
                            addActiveDataset={this.addActiveDataset}
                            removeActiveDataset={this.removeActiveDataset}
                        />
                    </div>
                    <div className="col">
                        <AllMaps activeDatasets={this.state.activeDatasets}/>
                    </div>
                </div>
            </div>
        )
    }
}