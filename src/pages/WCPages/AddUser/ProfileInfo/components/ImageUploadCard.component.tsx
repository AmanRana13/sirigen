import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {
  CardContent,
  IconButton,
  Grid,
  Menu,
  Box,
  MenuItem,
  CircularProgress,
  Typography,
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import {profileInfoStyle} from '../ProfileInfo.style';

import {getCurrentSenior} from 'globals/global.functions';
import {
  IMAGE_LIMIT_EXCEED_MESSAGE,
  IMAGE_TYPES,
  INVALID_IMAGE_FORMAT,
} from 'globals/global.constants';
import AvatarComponent from 'common/Avatar/Avatar.component';
import {AvatarVariants} from 'globals/enums';

const ImageUploadCard = ({
  uplaodImage,
  getImage,
  setProfileImage,
  removeImage,
}: any) => {
  const [photos, setPhotos] = useState<any>({imageData: [], isLoaded: true});
  const photosData: any[] = [];
  const [defaultPic, setDefaultPic] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState<any>(null);
  const [showOption, setShowOption] = React.useState(null);
  const [removePic, setRemovePic] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLimitExceed, setIsLimitExceed] = useState(false);
  const [isInvalidImageFormat, setIsInvalidImageFormat] = useState(false);
  const param = useParams();

  useEffect(() => {
    setIsLoading(true);
    const accountInfo = getCurrentSenior();
    getImage(accountInfo).then((res: any) => {
      if (res) {
        const {images, profile} = res;
        profile?.id && setDefaultPic(profile?.id);
        if (images) {
          const imageData = images.map((photo: any) => {
            if (photo) {
              photo.image_body = `data:image/${photo.format};base64,${photo.image_body}`;
            }
            return {...photo};
          });
          setIsLoading(false);
          setPhotos({imageData, isLoaded: false});
        } else {
          setIsLoading(false);
          setPhotos({imageData: [], isLoaded: false});
        }
      } else {
        setIsLoading(false);
        setPhotos({imageData: [], isLoaded: false});
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (photos.isLoaded) {
      setIsLoading(true);
      photos.imageData.forEach((data: any, index: any) => {
        if (!data?.image_id) {
          uplaodImage(data.image_body).then((res: any) => {
            if (res) {
              const allPhotos = photos.imageData;
              const uploadedPhoto: any = allPhotos[index];
              uploadedPhoto.image_id = res.image_id;
              setPhotos({imageData: allPhotos, isLoaded: false});
              setIsLoading(false);
            }
          });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos]);

  useEffect(() => {
    removeImage(removePic);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removePic]);

  useEffect(() => {
    setProfileImage(defaultPic, param);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultPic]);

  const handleClick = (event: any, index: any) => {
    setSelectedIndex(index);
    setShowOption(event.currentTarget);
  };

  const {classes} = profileInfoStyle();
  const handleCapture = ({target}: any) => {
    setIsLimitExceed(false);
    setIsInvalidImageFormat(false);
    if (photos.imageData.length + target.files.length > 10) {
      setIsLimitExceed(true);
    } else if (
      !Object.values(target.files).every((fileData: any) =>
        IMAGE_TYPES.includes(fileData.type),
      )
    ) {
      setIsInvalidImageFormat(true);
    } else {
      setupFileReader(target.files, 0);
    }
  };

  const setupFileReader = (files: any, i: any) => {
    const file = files[i];
    const fileSize = Math.round(file.size / 1024);
    if (fileSize <= 3000) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (e) => {
        readerLoaded(e, files, i);
      };
    } else {
      if (i < files.length - 1) {
        setupFileReader(files, i + 1);
      }
    }
  };

  const updatePhotos = () =>
    setPhotos({
      imageData: [...photos.imageData, ...photosData],
      isLoaded: true,
    });

  const readerLoaded = (e: any, files: any, i: any) => {
    // const split;
    photosData.push({image_body: e.target.result});
    if (i < files.length - 1) {
      setupFileReader(files, i + 1);
    } else {
      updatePhotos();
    }
  };

  const handleChanged = (option: any = null) => {
    if (option === 'profile') {
      const selectedPhoto = photos.imageData[selectedIndex];
      setDefaultPic(selectedPhoto.image_id);
    } else if (option === 'removed') {
      const selectedPhoto = photos.imageData[selectedIndex];
      setRemovePic(selectedPhoto.image_id);
      photos.imageData.splice(selectedIndex, 1);
      if (setDefaultPic != null && photos.imageData.length === 1) {
        setDefaultPic(selectedPhoto.image_id);
      }
      setPhotos({imageData: photos.imageData, isLoaded: false});
    }
    setShowOption(null);
  };

  return (
    <CardContent
      style={{paddingBottom: 15}}
      className={classes.imageUploadCardContainer}>
      {isLoading ? (
        <CircularProgress color='inherit' />
      ) : (
        <Grid container alignItems='center'>
          {photos.imageData.map((photo: any, index: any) => {
            let selectedStyle = undefined;
            if (defaultPic === photo?.image_id) {
              selectedStyle = {border: '2px solid #16A9D0'};
            }
            return (
              <Box key={photo.image_body}>
                <IconButton
                  style={{padding: 0}}
                  aria-haspopup={
                    defaultPic === photo?.image_id ? 'true' : 'false'
                  }
                  data-testid = 'buttonUploadPhoto'
                  onClick={(event) => handleClick(event, index)}
                  size='large'>
                  <AvatarComponent
                    altText={'avatar' + index}
                    imageUrl={photo.image_body}
                    className={classes.avatarStyle}
                    variant={AvatarVariants.ROUNDED}
                    style={selectedStyle}
                  />
                </IconButton>
                <Menu
                  id='pic-menu'
                  data-testid = 'picMenu'
                  anchorEl={showOption}
                  keepMounted
                  open={Boolean(showOption)}
                  onClose={handleChanged}>
                  <MenuItem divider onClick={() => handleChanged('profile')} data-testid = 'selectPicture' >
                    Select as Profile picture
                  </MenuItem>
                  <MenuItem onClick={() => handleChanged('removed')} data-testid = 'removePhoto'>
                    Remove Photo
                  </MenuItem>
                </Menu>
              </Box>
            );
          })}
          <input
            accept='image/x-png,image/jpeg'
            style={{display: 'none'}}
            id='icon-button-photo'
            multiple
            onChange={handleCapture}
            type='file'
          />
          {photos.imageData.length < 10 && (
            <Box
              component='label'
              style={{cursor: 'pointer'}}
              htmlFor='icon-button-photo'>
              <AvatarComponent
                altText='avatar-alt'
                component='span'
                className={classes.avatarStyle}
                style={{
                  backgroundColor: 'transparent',
                  border: '1px dashed grey',
                }}
                variant={AvatarVariants.ROUNDED}
                child={<AddPhotoAlternateIcon style={{color: 'grey'}} />}
              />
            </Box>
          )}
        </Grid>
      )}
      {isLimitExceed && (
        <Typography variant='subtitle1' className={classes.errorText}>
          {IMAGE_LIMIT_EXCEED_MESSAGE}
        </Typography>
      )}
      {isInvalidImageFormat && (
        <Typography variant='subtitle1' className={classes.errorText}>
          {INVALID_IMAGE_FORMAT}
        </Typography>
      )}
    </CardContent>
  );
};

export {ImageUploadCard};
