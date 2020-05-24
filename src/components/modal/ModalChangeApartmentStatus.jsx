import React, { Component } from 'react';
import { Button, Form, Modal, Input, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import { apartmentService } from "../../services/apartmentService";

class ModalChangeApartmentStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: this.props.modal,
            status: "FREE",
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
        this.setState({ status: value });
    }

    delay = ms => new Promise(res => setTimeout(res, ms));


    handleSubmit = async () => {

        this.setState({ error: false, success: false, message: "" });

        const { status } = this.state;


        apartmentService.updateApartmentStatus(this.props.apartmentId, status)
            .then(response => {
                this.props.onSubmit(response.status)
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
                                    value={status}
                                    onChange={this.onStatusChange}
                                >
                                    <option>FREE</option>
                                    <option>REVIEW</option>
                                    <option>RENTED</option>
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
