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

const MAX_SIZE_IN_MEGABYTES = 6 * 1024 * 1024;

const VALID_MIME_TYPES = ["image/png","image/jpeg"]

const fileFilter : multer.Options["fileFilter"] = (req, file, callback) =>{

 if (VALID_MIME_TYPES.includes(file.mimetype)) {
  callback(null,true)
 } else {
  callback(new Error("Error : The uploaded file must be a JPG or a PNG"))
 }
}

export const multerOptions = {
 fileFilter,
 limits : {
  fileSize : MAX_SIZE_IN_MEGABYTES
 }
};

export const initMulterMiddleware = () => {
 return multer({storage,...multerOptions})
};
