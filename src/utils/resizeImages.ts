const sharp = require('sharp');

const transformImg = async function (buffer: any, path: any) {
    const generateName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.jpeg`;
    // ▼ Process the image buffer
    await sharp(buffer)
        .resize(550, 325)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`${__dirname}${path}${generateName}`);
    // ▼ Returns the unique name of the created image
    return generateName;
};

export default {
    transformImg,
};
