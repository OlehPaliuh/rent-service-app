import React, { Component } from "react";
import { Button, Row } from 'reactstrap';
import DateTimePicker from 'react-datetime-picker';
import { overviewService } from "../../services/overviewService";
import "../../styles/OverviewCard.css"

class OverviewCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showButtons: true,
            error: false,
            message: ""
        }
    }

    componentDidMount() {
        if (this.props.overview.status != "REQUESTED") {
            this.setState({ showButtons: false })
        }
    }

    handleAgreedOverview = () => {
        this.setState({ error: false, message: "" });

        overviewService.approveOverviewRequest(this.props.overview.id)
            .then(response => {
                this.setState({ showButtons: false })
            }, error => {
                this.setState({ error: true, message: "Error during sending request" });
            })
    }

    handleRejectedOverview = () => {
        this.setState({ error: false, message: "" });

        overviewService.rejectOverviewRequest(this.props.overview.id)
            .then(response => {
                this.setState({ showButtons: false })
            }, error => {
                this.setState({ error: true, message: "Error during sending request" });
            })
    }

    render() {
        return (
            <div className="card overview-card">
                <div className="card-body">
                    <div className="overview-title overview-card-title">Date:   <DateTimePicker disabled
                        value={this.props.overview.dateTime}
                    /></div>
                    <p className="card-title overview-card-title">Comment:  {this.props.overview.requesterComment}</p>
                    <p className="card-title overview-card-title">Status:  {this.props.overview.status}</p>

                    {this.state.showButtons &&
                        <Button color="success" className="agreed-button" onClick={this.handleAgreedOverview}>
                            V
                        </Button>
                    }
                    {this.state.showButtons &&
                        <Button color="danger" className="reject-button" onClick={this.handleRejectedOverview}>
                            X
                        </Button>
                    }
                </div>
            </div>
        )
    }
}

export default OverviewCard;