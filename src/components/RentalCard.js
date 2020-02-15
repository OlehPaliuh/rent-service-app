import React, {Component} from "react";

class RentalCard extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            rental: props.rental
        }
    }

    render() {
        return (
            <div className="card" style={{width: "18rem"}}>
                {/* <img className="card-img-top" alt="Card image cap" /> */}
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text"></p>
                    {/* <a href="#" className="btn btn-primary">Show more</a> */}
                </div>
            </div>
        )
    }
}

export default RentalCard;