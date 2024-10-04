import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client } from "../../client";
import { chain, wallets } from "../../utils/wallet";
import { useEffect, useState } from "react";
import axios from "axios";

interface ConnectProps {
  label?: string;
}

export const Connect = (props: ConnectProps) => {
  const { label } = props;
  const account = useActiveAccount(); // Utilisation de useAccount pour obtenir l'adresse du wallet
  const [jwtToken, setJwtToken] = useState<string | null>(null); // Stocker le JWT
  const [error, setError] = useState<string | null>(null); // Stocker les erreurs

  // Fonction pour gérer la connexion avec signature et envoi au backend
  const handleLogin = async () => {
    if (!account) {
      setError("Wallet not connected.");
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    if (accounts.length === 0) {
      setError("No accounts found.");
      return;
    }

    console.log("accounts", accounts);

    try {
      // Message à signer par l'utilisateur pour prouver son identité
      const messageToSign = `Sign this message to authenticate: ${new Date().toISOString()}`;
      const address = account.address;
      // Demande la signature à l'utilisateur via Web3
      console.log("avant le sign");
      const signedMessage = await window.ethereum.request({
        method: "personal_sign",
        params: [address, messageToSign],
      });

      console.log(" signed ", signedMessage);
      // Envoie l'adresse et la signature au backend pour générer un JWT
      const response = await axios.post(
        "https://bdf2-92-91-68-114.ngrok-free.app/auth/login",
        {
          address,
          signature: signedMessage,
        },
      );

      // Stocke le token JWT dans le localStorage
      const token = response.data.token;
      setJwtToken(token);
      localStorage.setItem("jwtToken", token);
      setError(null); // Réinitialise l'erreur

      console.log("JWT Token:", token);
    } catch (err: any) {
      if (err.code === 4001) {
        // L'utilisateur a refusé la demande de signature
        setError("You have refused to sign the message.");
      } else {
        console.error("Erreur lors de la connexion:", err);
        setError("Failed to login. Please try again.");
      }
    }
  };

  // Déclenche handleLogin dès que l'utilisateur est connecté (adresse disponible)
  useEffect(() => {
    if (account) {
      handleLogin(); // Dès que l'utilisateur se connecte avec son wallet, déclencher la signature et l'authentification
    }
  }, [account]);

  return (
    <div>
      {/* Bouton de connexion Thirdweb */}
      <ConnectButton
        client={client}
        chain={chain}
        wallets={wallets}
        connectButton={{ label: label }}
        theme={"dark"}
        connectModal={{
          size: "wide",
          showThirdwebBranding: false,
        }}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
