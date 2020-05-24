import React, { Component } from 'react';
import { Button, Form, Modal, Input, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import { complaintService } from '../../services/complaintService';

class ModalCreateComplain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: this.props.modal,
            currentUserId: JSON.parse(localStorage.getItem('user')).id,
            accountToId: this.props.accountToId,
            success: false,
            error: false,
            message: "",
            title: "",
            content: "",
            complaintSeverity: "POSSIBLY_MAKLER"
        }
    }

    toggle = () => {
        this.setState({ error: false, success: false, message: "", title: "", content: "" });
        this.props.onCancel()
    }

    onContentChange = c => {
        const { name, value } = c.target;
        this.setState({ [name]: value });
    }

    delay = ms => new Promise(res => setTimeout(res, ms));


    onServerityChange = (e) => {
        const { value } = e.target;
        this.setState({ complaintSeverity: value });
    }

    handleSubmit = async () => {

        this.setState({ error: false, success: false, message: "" });

        const { content, title, accountToId, currentUserId, complaintSeverity } = this.state;

        complaintService.createComplaint(accountToId, currentUserId, title, content, complaintSeverity)
            .then(response => {
                this.setState({ success: true, message: "Complaint sent" });
            }, error => {
                this.setState({ error: true, message: "Request failed, try in few minutes" });
            })

        await this.delay(1500);
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
                    <ModalHeader toggle={this.toggle}>Send a complaint</ModalHeader>

                    {success && <div className={'alert alert-success'}>{message}</div>}

                    {error && <div className={'alert alert-danger'}>{message}</div>}
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <Label>Title of complaint</Label>
                            <Input
                                type="text"
                                name="title"
                                id="title"
                                placeholder="Type a title"
                                value={this.state.title}
                                onChange={this.onContentChange} />

                            <Label>Content of complaint</Label>
                            <Input
                                type="textarea"
                                name="content"
                                id="content"
                                placeholder="Type a reason"
                                value={this.state.content}
                                onChange={this.onContentChange} />

                            <Label>Choose complaint severity</Label>
                            <Input
                                type="select"
                                name="sort"
                                id="sort"
                                value={this.state.complaintSeverity}
                                onChange={this.onServerityChange}
                            >
                                <option value="IS_MAKLER">definitely makler</option>
                                <option value="POSSIBLY_MAKLER">can be a makler</option>
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

export default ModalCreateComplain;
