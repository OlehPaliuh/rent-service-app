import React, { Component } from 'react';
import { Button, Form, Modal, Input, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import DateTimePicker from 'react-datetime-picker';
import { apartmentService } from "../../services/apartmentService";
import { wait } from '@testing-library/react';
import { overviewService } from '../../services/overviewService';

class ModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: this.props.modal,
            date: new Date(),
            success: false,
            error: false,
            message: "",
            comment: ""
        }
    }

    toggle = () => {
        this.setState({ error: false, success: false, message: "", date: new Date(), comment: "" });
        this.props.onCancel()
    }

    onDateChange = d => {
        this.setState({ date: d });
        console.log(this.state.date);
    }

    onCommentChange = c => {
        const { value } = c.target;
        this.setState({ comment: value });
    }

    delay = ms => new Promise(res => setTimeout(res, ms));


    handleSubmit = async () => {

        this.setState({ error: false, success: false, message: "" });

        const { comment, date } = this.state;

        if (date < new Date()) {
            this.setState({ error: true, message: "Date and time are not appropriate!" });
            return;
        }

        overviewService.requestApartmentOverview(this.props.apartmentId, this.props.accountId, date, comment)
            .then(response => {
                this.setState({ success: true, message: "Request created" });
            }, error => {
                this.setState({ error: true, message: "Request failed, try in few minutes" });
            })

        await this.delay(3000);
        this.toggle();

    }

    render() {

        const { error, message, success } = this.state;

        return (
            <div>
                <Modal
                    isOpen={this.props.modal}
                    fade={false}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Requesting apartment overview</ModalHeader>

                    {success && <div className={'alert alert-success'}>{message}</div>}

                    {error && <div className={'alert alert-danger'}>{message}</div>}
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <Label>Chose date and time to overview the apartment</Label>
                            <DateTimePicker
                                onChange={this.onDateChange}
                                value={this.state.date}
                            />
                            <Label>Left a comment (if you would to add something important)</Label>
                            <Input
                                type="textarea"
                                placeholder="Type a comment"
                                value={this.state.comment}
                                onChange={this.onCommentChange} />
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

export default ModalComponent;
