import React from "react";
import { As, Flex, FlexProps } from "@chakra-ui/react";

interface IIconBoxProps extends FlexProps {
  children: any,
}

export function IconBox({ as, children, ...rest }: IIconBoxProps) {

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      borderRadius={"12px"}
      {...rest}
    >
      {children}
    </Flex>
  );
}