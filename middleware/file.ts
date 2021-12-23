import  multer from 'multer';
export const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'public/books');
    }, filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const allowedTypes = ['text/txt', 'text/plain'];

export const fileFilter = (req: any, file: any, cb: any) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
};

export const fileMiddleware =  multer({
    storage,
    fileFilter
});