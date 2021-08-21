import React from 'react';

import ImageUploadButton from 'components/upload/imageUploadSection/ImageUploadButton';
import FirebaseUploadButton from 'components/upload/common/FirebaseUploadButton';

const ImageUploadSection = () => (
  <>
    <ImageUploadButton />
    <FirebaseUploadButton />
  </>
);

export default ImageUploadSection;
