import multer from "multer"
import { randomUUID } from "crypto";
import mime from "mime";


export const generatePhotoFilename = (mimeType : string) => {
 const randomFilename = `${randomUUID()}-${Date.now()}}`
 const fileExtention = mime.getExtension(mimeType)
 const fileName = `${randomFilename}.${fileExtention}`

 return fileName
}

const storage = multer.diskStorage({
 destination : "uploads/",
 filename: (request,file,callback) => {
  return callback(null,generatePhotoFilename(file.mimetype))}
});

export const multerOptions = {}

export const initMulterMiddleware = () => {
 return multer({storage,...multerOptions})
}