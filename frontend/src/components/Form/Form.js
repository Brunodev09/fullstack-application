import React, { Component } from 'react';

import InputCard from '../Input/Input';
import { toast } from "react-toastify";
import { httpSubmit as http } from "../../utils/Http";
import Sleep from "../../utils/Sleep";
import './form.css';


class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            songs: {
                selector1: "",
                selector2: "",
                selector3: "",
                selector4: "",
                selector5: "",
            }
        }
    }


    handleUser = (char) => {
        this.setState({ name: char });
    }

    selector1 = (evt) => {
        let aux = { ...this.state };
        aux.songs["selector1"] = evt;
        this.setState(aux);
    }

    selector2 = (evt) => {
        let aux = { ...this.state };
        aux.songs["selector2"] = evt;
        this.setState(aux);
    }

    selector3 = (evt) => {
        let aux = { ...this.state };
        aux.songs["selector3"] = evt;
        this.setState(aux);
    }

    selector4 = (evt) => {
        let aux = { ...this.state };
        aux.songs["selector4"] = evt;
        this.setState(aux);
    }

    selector5 = (evt) => {
        let aux = { ...this.state };
        aux.songs["selector5"] = evt;
        this.setState(aux);
    }

    handleSubmit = async () => {
        let { name, songs } = this.state;
        let errorMin = false, errorSame = false;
        let m = {};
        let arr = [];

        if (!name) return toast.error("Please provide the form a nickname!");
        Object.keys(songs).forEach(i => {
            if (!songs[i]) errorMin = true;
        });
        Object.values(songs).forEach(k => {
            if (m[k]) errorSame = true;
            m[k] = true;
            arr.push(k);
        });

        if (errorMin) return toast.error("Please select at least 5 songs.");
        else if (errorSame) return toast.error("Please choose 5 DIFFERENT songs!");

        this.props.setLoading(true);
        let req;

        try {
            req = await http.post("/user", { name, songs: arr });
            if ((req.status + "")[0] === "2") toast.success("Your form has been sent! Thanks for participating!");
            else toast.error(req.statusText);
        } catch (e) {
            console.error(e);
            toast.error(e.message || e.statusText || e);
        }

        await Sleep.run(1000, (p) => {
            const testValidity = !!p;
            return testValidity;
        }, req);

        this.props.setLoading(false);
        return window.location.reload();
    }

    promiseTimeout = (ms) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, ms);
        });
    }


    render() {
        return (
            <div className='loginCard'>
                <InputCard
                    arr={this.props.arr}
                    title="Submit your nickname and 5 favorite songs from the sorted selectors list of tracks."
                    fields={
                        [
                            { element: "input", label: "Enter your nickname", func: this.handleUser, type: "text" },
                            { element: "selector", label: "Pick the 1st song:", selector: true, func: this.selector1 },
                            { element: "selector", label: "Pick the 2st song:", selector: true, func: this.selector2 },
                            { element: "selector", label: "Pick the 3st song:", selector: true, func: this.selector3 },
                            { element: "selector", label: "Pick the 4st song:", selector: true, func: this.selector4 },
                            { element: "selector", label: "Pick the 5st song:", selector: true, func: this.selector5 },
                            { element: "button", label: "Submit", func: this.handleSubmit }
                        ]
                    }

                    onHandle={this.onHandle} />
            </div>
        );
    }
}

export default Form;
