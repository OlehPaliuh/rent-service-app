import React, { Component } from "react";
import { Button } from 'reactstrap';
import DateTimePicker from 'react-datetime-picker';
import { overviewService } from "../../services/overviewService";
import "../../styles/OverviewCard.css"

class OverviewCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            overview: this.props.overview,
            showButtons: true,
            error: false,
            message: "",
            isApartmentPage: this.props.isApartmentPage
        }
    }

    componentDidMount() {
        if (this.props.overview.status !== "REQUESTED") {
            this.setState({ showButtons: false })
        }
    }

    handleAgreedOverview = () => {
        this.setState({ error: false, message: "" });

        overviewService.approveOverviewRequest(this.props.overview.id)
            .then(response => {
                this.setState({ showButtons: false, overview: response })

            }, error => {
                this.setState({ error: true, message: "Error during sending request" });
            })
    }

    handleRejectedOverview = () => {
        this.setState({ error: false, message: "" });

        overviewService.rejectOverviewRequest(this.props.overview.id)
            .then(response => {
                this.setState({ showButtons: false, overview: response })
            }, error => {
                this.setState({ error: true, message: "Error during sending request" });
            })
    }

    render() {

        const { overview } = this.state;

        return (
            <div className="card overview-card">
                <div className="card-body">
                    <div className="overview-title overview-card-title">Date:   <DateTimePicker disabled
                        value={overview.dateTime}
                    /></div>
                     {this.state.isApartmentPage && overview &&
                    <p className="card-title overview-card-title">Comment:  {overview.requesterComment}</p>
                     }
                      {!this.state.isApartmentPage && overview &&
                       <p className="card-title overview-card-title">Owner comment:  {overview.ownerComment}</p>
                    }
                    {this.state.isApartmentPage && overview.account &&
                      <p className="card-title overview-card-title">Name:  {overview.account.firstName}   {overview.account.lastName}</p>
                    }
                      {this.state.isApartmentPage && overview.account &&
                      <p className="card-title overview-card-title">Phone:  {overview.account.phoneNumber}</p>
                    }
                    <p className="card-title overview-card-title">Status:  {overview.status}</p>

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