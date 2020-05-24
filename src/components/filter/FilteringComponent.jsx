import React, { Component } from "react";
import { Button, Row, Col, Form, Label, Input } from 'reactstrap';
import { overviewService } from "../../services/overviewService";
import { Checkbox } from "@material-ui/core";
import "../../styles/FilteringStyle.css"

class FilteringComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            message: ""
        }
    }

    handleCheckboxChange = async (e) => {
        const { name } = e.target;
        this.props.handleCheckboxChange(name);
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.props.handleInputChange(name, value);
    }

    handleSubmit = () => {
        this.props.onSubmitFiltering();
    }

    handleFilterReset = () => {
        this.props.onReset();
    }

    render() {

        return (
            <div className="card overview-card">
                <div className="card-body">
                    <Form onSubmit={this.handleSubmit} className="form-style">
                        <Label className="title"><h3>Filters</h3></Label>
                        <Row className="row-max-min">
                            <Col ms={1} lg={2}>
                                <Label> Price: </Label>
                            </Col>
                            <Col ms={5} lg={2} className="input-max-min">
                                <Input
                                    type="number"
                                    name="priceMin"
                                    placeholder="min"
                                    min="0"
                                    step="1"
                                    value={this.props.filter.priceMin || ""}
                                    onChange={this.handleInputChange} />
                            </Col>
                            <Col ms={5} lg={2}>
                                <Input
                                    type="number"
                                    placeholder="max"
                                    name="priceMax"
                                    min="0"
                                    step="1"
                                    value={this.props.filter.priceMax || ""}
                                    onChange={this.handleInputChange} />
                            </Col>
                        </Row>
                        <Row className="row-max-min">
                            <Col ms={1} lg={2}>
                                <Label> Floor: </Label>
                            </Col>
                            <Col ms={5} lg={2} className="input-max-min">
                                <Input
                                    type="number"
                                    placeholder="min"
                                    name="floorMin"
                                    min="0"
                                    step="1"
                                    value={this.props.filter.floorMin || ""}
                                    onChange={this.handleInputChange} />
                            </Col>
                            <Col ms={5} lg={2}>
                                <Input
                                    type="number"
                                    placeholder="max"
                                    name="floorMax"
                                    min="0"
                                    step="1"
                                    value={this.props.filter.floorMax || ""}
                                    onChange={this.handleInputChange} />
                            </Col>
                        </Row>
                        <Row className="row-max-min">
                            <Col ms={1} lg={2}>
                                <Label> Rooms: </Label>
                            </Col>
                            <Col ms={5} lg={2} className="input-max-min">
                                <Input
                                    type="number"
                                    placeholder="min"
                                    name="roomsMin"
                                    min="0"
                                    step="1" 
                                    value={this.props.filter.roomsMin || ""}
                                    onChange={this.handleInputChange}/>
                            </Col>
                            <Col ms={5} lg={2}>
                                <Input
                                    type="number"
                                    placeholder="max"
                                    name="roomsMax"
                                    min="0"
                                    step="1" 
                                    value={this.props.filter.roomsMax || ""}
                                    onChange={this.handleInputChange}/>
                            </Col>
                        </Row>
                        <Row className="row-max-min">
                            <Col ms={1} lg={2}>
                                <Label> Living area: </Label>
                            </Col>
                            <Col ms={5} lg={2} className="input-max-min">
                                <Input
                                    type="number"
                                    placeholder="min"
                                    name="livingAreaMin"
                                    min="0"
                                    step="1"
                                    value={this.props.filter.livingAreaMin || ""}
                                    onChange={this.handleInputChange} />
                            </Col>
                            <Col ms={5} lg={2}>
                                <Input
                                    type="number"
                                    placeholder="max"
                                    name="livingAreaMax"
                                    min="0"
                                    step="1"
                                    value={this.props.filter.livingAreaMax || ""}
                                    onChange={this.handleInputChange} />
                            </Col>
                        </Row>

                        <Row className="row-max-min">
                            <Col ms={1} lg={2}>
                                <Label> Total area: </Label>
                            </Col>
                            <Col ms={5} lg={2} className="input-max-min">
                                <Input
                                    type="number"
                                    placeholder="min"
                                    name="totalAreaMin"
                                    min="0"
                                    step="1"
                                    value={this.props.filter.totalAreaMin || ""}
                                    onChange={this.handleInputChange} />
                            </Col>
                            <Col ms={5} lg={2}>
                                <Input
                                    type="number"
                                    placeholder="max"
                                    name="totalAreaMax"
                                    min="0"
                                    step="1"
                                    value={this.props.filter.totalAreaMax || ""}
                                    onChange={this.handleInputChange} />
                            </Col>
                        </Row>

                        <Row className="row-max-min">
                            <Col ms={2}>
                                <Label>New Building</Label>
                                <Checkbox
                                    id="newBuilding"
                                    name="newBuilding"
                                    color="primary"
                                    checked={this.props.filter.newBuilding || false}
                                    onChange={this.handleCheckboxChange}
                                />
                            </Col>
                            <Col ms={2}>
                                <Label>Old Building</Label>
                                <Checkbox
                                    id="oldBuilding"
                                    name="oldBuilding"
                                    color="primary"
                                    checked={this.props.filter.oldBuilding || false}
                                    onChange={this.handleCheckboxChange}
                                />
                            </Col>
                            <Col ms={2}>
                                <Label>Has photos</Label>
                                <Checkbox
                                    id="hasPhotos"
                                    name="hasPhotos"
                                    color="primary"
                                    checked={this.props.filter.hasPhotos || false}
                                    onChange={this.handleCheckboxChange}
                                />
                            </Col>
                            <Col ms={2}>
                                <Label>Allow pets</Label>
                                <Checkbox
                                    id="allowPets"
                                    name="allowPets"
                                    color="primary"
                                    checked={this.props.filter.allowPets || false}
                                    onChange={this.handleCheckboxChange}
                                />
                            </Col>
                        </Row>

                          <Row className="row-max-min">
                              
                        <Col >
                        <Button 
                            color="primary"
                             className="filter-apartment btn btn-primary" 
                             onClick={this.handleSubmit}
                             > Filter </Button>

                            <Button 
                            color="warning"
                             className="filter-apartment btn btn-primary" 
                             onClick={this.handleFilterReset}
                             > Reset Filter </Button>
                        </Col>
                    </Row>
                    </Form>
                </div>
            </div>
        )
    }
}

export default FilteringComponent;