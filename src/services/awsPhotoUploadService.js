// import S3 from 'react-aws-s3';

// export const awsPhotoUplocadService = {
//     uploadFileToS3
// };

// function uploadFileToS3(file) {
//     const config = {
//         bucketName: 'rentalservicephotobucket',
//         dirName: 'apartments', /* optional */
//         region: 'eu-west-1',
//         accessKeyId: 'AKIAXGZK44HXVDMQ2Q7X',
//         secretAccessKey: 'WRxxF81A8XkTiKSWQ7lpO9/+j83h3twikT8Q0Gow',
//         // s3Url: 'https:/your-custom-s3-url.com/', /* optional */
//     }
     
//     const ReactS3Client = new S3(config);
//     /*  Notice that if you don't provide a dirName, the file will be automatically uploaded to the root of your bucket */
     
//     /* This is optional */
//     const newFileName = 'test-file';
     
//     ReactS3Client
//         .uploadFile(file, newFileName)
//         .then(data => console.log(data))
//         .catch(err => console.error(err));
// }

import S3FileUpload from 'react-s3';
 
//Optional Import
import { uploadFile } from 'react-s3';

export const awsPhotoUplocadService = {
    uploadFileToS3
};

 
const config = {
    bucketName: 'rentalservicephotobucket',
    dirName: 'photos', /* optional */
    region: 'eu-west-1',
    accessKeyId: 'AKIAXGZK44HXVDMQ2Q7X',
    secretAccessKey: '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',
    s3Url: 'https://rentalservicephotobucket.s3.eu-west-1.amazonaws.com/'
}
 
/*  Notice that if you don't provide a dirName, the file will be automatically uploaded to the root of your bucket */
 
function uploadFileToS3(file) {
    S3FileUpload
    .uploadFile(file, config)
    .then(data => console.log(data))
    .catch(err => console.error(err))
}
