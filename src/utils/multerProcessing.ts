const multer = require('multer');

export default function (imgPropertyName: string) {
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });

    return upload.single(imgPropertyName);
}
