import type { ReactNode } from "react";
import React, { isValidElement, useContext, useMemo } from "react";
import { type Locale } from "@ant-design/web3-common";
import { ConfigProvider, Space, Typography } from "antd";
import classNames from "classnames";
import { IconButton, Text, useClipboard, Tooltip } from "@chakra-ui/react";
import { fillWithPrefix, formatAddress } from "../../utils/format";
import { FiCopy } from "react-icons/fi";
/**
 * Props for the Address component.
 */
export interface AddressProps {
  /**
   * Address ellipsis configuration.
   * If true, the address will be clipped with default head and tail values.
   * If an object, you can specify custom headClip and tailClip values.
   */
  ellipsis?:
    | boolean
    | {
        headClip?: number;
        tailClip?: number;
      };
  /**
   * The address to display.
   */
  address?: string;
  /**
   * The prefix to use for the address.
   * If false, no prefix will be used.
   */
  addressPrefix?: string | false;
  /**
   * Whether the address is copyable.
   */
  copyable?: boolean;
  /**
   * Tooltip configuration.
   * If true, the address will be shown in a tooltip.
   * If a string or ReactNode, it will be used as the tooltip content.
   */
  tooltip?: boolean | TooltipProps["title"];
  /**
   * Address format configuration.
   * If true, the address will be formatted.
   * If a function, it will be used to format the address.
   */
  format?: boolean | ((address: string) => ReactNode);
  /**
   * Locale configuration for the Address component.
   */
  locale?: Locale["Address"];
}

export const Address: React.FC<React.PropsWithChildren<AddressProps>> = (
  props,
) => {
  const {
    ellipsis,
    addressPrefix: addressPrefixProp,
    address,
    copyable = false,
    tooltip = true,
    format = false,
    children,
    locale,
  } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const filledAddress = fillWithPrefix(address, addressPrefixProp);
  const { hasCopied, onCopy } = useClipboard(filledAddress);

  const mergedFormat = useMemo(() => {
    if (typeof format === "function") {
      return format;
    }
    if (format) {
      return formatAddress;
    }
    return (input: string) => input;
  }, [format]);

  const isEllipsis = !!ellipsis;
  const { headClip = 6, tailClip = 4 } =
    typeof ellipsis !== "object"
      ? {
          headClip: 6,
          tailClip: 4,
        }
      : ellipsis;

  if (!address) {
    return null;
  }

  const mergedTooltip = () => {
    if (isValidElement(tooltip) || typeof tooltip === "string") {
      return tooltip;
    }
    if (tooltip) {
      return filledAddress;
    }
    return tooltip;
  };

  const formattedAddress = mergedFormat(filledAddress);

  return (
    <Space>
      {/* <Typography.Text
        copyable={
          copyable
            ? {
                text: filledAddress,
                tooltips: ["Copty Address", "Address Copied!"],
              }
            : false
        }
      > */}
      <Text color={"white"}>
        {isEllipsis
          ? `${filledAddress.slice(0, headClip)}...${filledAddress.slice(-tailClip)}`
          : formattedAddress}
      </Text>

      <Tooltip
        label={hasCopied ? "Address Copied!" : "Copy Address"}
        aria-label="A tooltip"
      >
        <IconButton
          onClick={onCopy}
          size="xs"
          variant="ghost"
          aria-label="copy"
          icon={<FiCopy />}
        ></IconButton>
      </Tooltip>

      {/* </Typography.Text> */}
    </Space>
  );
};
