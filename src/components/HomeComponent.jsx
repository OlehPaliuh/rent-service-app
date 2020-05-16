import React, { Component } from "react"
import ApartmentCard from './ApartmentCard'
import { apartmentService } from '../services/apartmentService';
import { imageService } from '../services/imageService';
import { awsPhotoUplocadService } from '../services/awsPhotoUploadService';
import { Link } from 'react-router-dom';
import ReactS3Uploader from 'react-s3-uploader';
import "../index.css"

class HomeComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            apatmentArray: [],
            user: {},
            loading: false,
            files: [],
            filesLoaded: false
        }
    }

    componentWillMount() {
        this.setState({
            user: JSON.parse(localStorage.getItem('user')),
            loading: true
        });
        apartmentService.getAllApatments().then(array => this.setState({ apatmentArray: array.map(item => <ApartmentCard key={item.id} apartment={item} />), loading: false }));
    }

    onChangePhotoHandler = event => {

        this.setState({ filesLoaded: false });
        console.log(event.target.files);

        this.setState({ files: event.target.files, filesLoaded: true });

        // {this.state.filesLoaded &&  console.log(this.state.files);}
    }

    handleImageUpload = () => {
        awsPhotoUplocadService.uploadFileToS3(this.state.files[0]);
    }

    render() {
        return (
            <div className="container ownContainer">
                {localStorage.getItem('user') &&
                    <Link exect className="btn btn-primary" to={`/apartment/create/`}>Create Appartment</Link>
                }

                <input type="file" name="file" multiple
                    onChange={this.onChangePhotoHandler} />

                <button onClick={this.handleImageUpload} >Upload</button>

                {/* <ReactS3Uploader
                    signingUrl="https://s3.amazonaws.com/rentalservicephotobucket/image.png"
                    signingUrlMethod="PUT"
                    accept="image/*"
                    s3path="/uploads/"
                    preprocess={this.onUploadStart}
                    onSignedUrl={this.onSignedUrl}
                    onProgress={this.onUploadProgress}
                    onError={this.onUploadError}
                    onFinish={this.onUploadFinish}
                    // signingUrlHeaders={{ additional: headers }}
                    // signingUrlQueryParams={{ additional: query - params }}
                    signingUrlWithCredentials={true}      // in case when need to pass authentication credentials via CORS
                    uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}  // this is the default
                    contentDisposition="auto"
                    scrubFilename={(filename) => filename.replace(/[^\w\d_\-.]+/ig, '')}
                    server="http://cross-origin-server.com"
                    inputRef={cmp => this.uploadInput = cmp}
                    autoUpload={true}
                /> */}

                {this.state.filesLoaded && console.log(this.state.files)}

                <div className="container ownContainer">
                    {this.state.loading && <em>Loading apatments...</em>}

                    <div className="row">{this.state.apatmentArray}</div>
                </div>
            </div>
        )
    }
}

export default HomeComponent;