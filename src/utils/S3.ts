import AWS from 'aws-sdk'
import { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME, AWS_REGION } from '../config'
import { HttpException } from '../exception/HttpException'

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: AWS_ACCESS_KEY as string,
    secretAccessKey: AWS_SECRET_ACCESS_KEY as string
  },
  region: AWS_REGION as string
})

export const uploadFile = async(file: any) => {
  const uploadParams = {
    Bucket: AWS_BUCKET_NAME as string,
    Key: Date.now() + "-" + file.image.name,
    Body: Buffer.from(file.image.data),
    ACL:'public-read'
  }
  const upload =  s3.upload(uploadParams).promise()

  return upload
}

export const deleteArrObjects = async(array: any[]) => {
  const params = {
    Bucket: AWS_BUCKET_NAME as string,
    Delete: {
      Objects: array
    },
    Quiet: false
  }

  const deleteArrObjects = s3.deleteObjects(params, function(err,data){}).promise()

  return deleteArrObjects
}

export const deleteObject = async(object: string) => {
  const objectDelete = object.substring(object.lastIndexOf("/") + 1)
  const params = {
    Bucket: AWS_BUCKET_NAME as string,
    Key: objectDelete
  }

  const existsObject = await s3.getObject(params).promise()
  if (!existsObject) throw new HttpException(400, `Not found ${params.Key} in S3` )

  const deleteObject = s3.deleteObject(params, function(err,data){
    if (err) {
      console.log(err)
    }
  }).promise()

  return deleteObject
}

export const listObjects = async() => {
  const params = {
    Bucket: AWS_BUCKET_NAME as string,
  };
  const objects = s3.listObjects(params).promise();
  return objects;
}


