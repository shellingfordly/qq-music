import React, { Dispatch, SetStateAction } from "react";

const values: {
  isShowSearch: boolean;
  setIsShowSearch: Dispatch<SetStateAction<boolean>>;
} = {
  isShowSearch: false,
  setIsShowSearch() {},
};

export const SearchContext = React.createContext(values);
