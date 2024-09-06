import { useEffect, useState } from "react";
import { useActiveWallet } from "thirdweb/react";
import { useQueryClient, useQuery } from "@tanstack/react-query";

const LOCAL_STORAGE_KEY_ADDRESS = "thirdweb:active-address";

export function isUserConnected() {
  return localStorage.getItem("thirdweb:active-wallet-id");
}