import React, { Component, Fragment } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import "./loader.css";


/**
 * This component is responsible for controlling the loader and backdrop animation to block user input in async processes.
 */
class Loader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
          }
        }


    componentWillReceiveProps(next) {
        let { loading } = next;
        if (loading !== null && loading !== undefined && this.state.loading !== loading) {
          this.setState({loading});
        }
    }

    componentDidMount() {
        this.setState({"loading": this.props.loading})
    }

    render() {
        return (
            this.state.loading ?
            <Fragment>
                <div className="loader">
                    <CircularProgress color="secondary" />
                </div>
                <Backdrop style={{zIndex: 1}} open={true} />
            </Fragment> : null

            
        );
    }
}

  export default Loader;
  

