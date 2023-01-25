import AWS from 'aws-sdk'
import { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME } from '../config'

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: AWS_ACCESS_KEY as string,
    secretAccessKey: AWS_SECRET_ACCESS_KEY as string
  }
})

export const uploadFile = async(file: any) => {
  const uploadParams = {
    Bucket: AWS_BUCKET_NAME as string,
    Key: Date.now() + "-" + file.undefined.name,
    Body: Buffer.from(file.undefined.data),
    ACL:'public-read'
  }
  const upload = await s3.upload(uploadParams).promise()

  return upload
}


