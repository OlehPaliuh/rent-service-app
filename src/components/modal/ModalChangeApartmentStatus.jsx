import React, { Component } from 'react';
import { Button, Form, Modal, Input, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import { apartmentService } from "../../services/apartmentService";

class ModalChangeApartmentStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: this.props.modal,
            success: false,
            error: false,
            message: ""
        }
    }

    toggle = () => {
        this.setState({ error: false, success: false, message: "", status: "" });
        this.props.onCancel()
    }

    onStatusChange = c => {
        const { value } = c.target;
        this.props.onStatusChange(value)
    }

    delay = ms => new Promise(res => setTimeout(res, ms));


    handleSubmit = async () => {

        this.setState({ error: false, success: false, message: "" });

        apartmentService.updateApartmentStatus(this.props.apartmentId, this.props.status)
            .then(response => {
                // this.props.onSubmit(response.status)
                this.setState({ status: response.status, success: true, message: "Status changes" });
            }, error => {
                this.setState({ error: true, message: "Request failed, try in few minutes" });
            })

        await this.delay(1000);
        this.toggle();
    }

    render() {

        const { error, message, success, status } = this.state;

        return (
            <div>
                <Modal
                    isOpen={this.props.modal}
                    fade={false}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Change status</ModalHeader>

                    {success && <div className={'alert alert-success'}>{message}</div>}

                    {error && <div className={'alert alert-danger'}>{message}</div>}
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <Label>Chose status</Label>
                            <Input
                                    type="select"
                                    name="status"
                                    id="status"
                                    value={this.props.status}
                                    onChange={this.onStatusChange}
                                >
                                    <option value="FREE">FREE</option>
                                    <option value="REVIEW">REVIEW</option>
                                    <option value="RENTED">RENTED</option>
                                </Input>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit" onClick={this.handleSubmit}>Submit request</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalChangeApartmentStatus;
