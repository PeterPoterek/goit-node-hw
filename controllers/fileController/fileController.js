const { v4: uuidV4 } = require("uuid");
const multer = require("multer");
const fs = require("fs").promises;
const path = require("path");

const tempDir = path.join(process.cwd(), "temp");
const storeImageDir = path.join(process.cwd(), "public/images");

const extensionWhiteList = [".jpg", ".jpeg", ".png", ".gif"];
const mimetypeWhiteList = ["image/png", "image/jpg", "image/jpeg", "image/gif"];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tempDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${uuidV4()}${file.originalname}`);
    },
});

const uploadMiddleware = multer({
    storage,
    fileFilter: async (req, file, cb) => {
        const extension = path.extname(file.originalname).toLowerCase();
        const mimetype = file.mimetype;

        if (
            !extensionWhiteList.includes(extension) ||
            !mimetypeWhiteList.includes(mimetype)
        ) {
            return cb(null, false);
        }

        return cb(null, true);
    },
    limits: { fileSize: 1024 * 1024 * 5 },
});

const isAccesable = (path) =>
    fs
        .access(path)
        .then(() => true)
        .catch(() => false);

const setupFolder = async (path) => {
    const folderExists = await isAccesable(path);

    if (!folderExists) {
        try {
            await fs.mkdir(path);
        } catch (e) {
            console.log("No Access.");
            process.exit(1);
        }
    } else {
    }
};

module.exports = { tempDir, storeImageDir, setupFolder, uploadMiddleware };
