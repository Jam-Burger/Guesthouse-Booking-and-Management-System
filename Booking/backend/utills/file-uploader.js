import stream from "stream";
import getDriveService from "./gdrive-service.cjs"

const drive = getDriveService();
const uploadFile = async (fileObject) => {
  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.buffer);
  const { data } = await drive.files.create({
    media: {
      mimeType: fileObject.mimeType,
      body: bufferStream,
    },
    requestBody: {
      name: fileObject.originalname,
      parents: ['1fsNrKYbwKafik7nPp-Fxt1im_MKQd3Mi'],
    },
    fields: 'id,name,webContentLink',
  });
  return data;
};

export default uploadFile;