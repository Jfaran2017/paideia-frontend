import { Avatar, Box, Button, Paper } from "@mui/material";
import * as React from "react";
import { ITokenomics } from "../../../lib/creation/Api";
import { bytesToSize } from "../../../lib/creation/Utilities";
import { IData } from "../../../lib/utilities";
import FileInput from "../../utilities/file";
import { LearnMore } from "../utilities/HeaderComponents";

const TokenSymbol: React.FC<IData<ITokenomics>> = (props) => {
  const [url, setUrl] = React.useState<any>(props.data.tokenImage.url);

  function handleImage(e: any) {
    let fileInput = e.currentTarget.files;
    // where to store the images??? will be helpful to create the apis for future use & maintainabiliity.
    if (fileInput && fileInput[0]) {
      if (fileInput.length != 1) return;
      if (fileInput[0].size > 1000000) {
        props.setData({
          ...props.data,
          tokenImage: {
            ...props.data.tokenImage,
            file: -1,
          },
        });

        return;
      }

      var reader = new FileReader();

      reader.onload = function (_e: any) {
        setUrl(_e.target.result);
      };

      reader.readAsDataURL(fileInput[0]);

      props.setData({
        ...props.data,
        tokenImage: { ...props.data.tokenImage, file: fileInput[0] },
      });
    }
  }

  React.useEffect(() => {
    props.setData({
      ...props.data,
      tokenImage: { ...props.data.tokenImage, url: url },
    });
  }, [url]);
  return (
    <>
      <LearnMore
        title="Token symbol"
        small={true}
        tooltipTitle="Title Here"
        tooltipText="Content here."
        tooltipLink="/here"
      />
      <FileInput
        file={
          props.data.tokenImage === undefined ? "" : props.data.tokenImage.file
        }
        fileUrl={
          props.data.tokenImage === undefined ? "" : props.data.tokenImage.url
        }
        handleImage={handleImage}
        id="logo-img-upload"
      />
    </>
  );
};

export default TokenSymbol;
