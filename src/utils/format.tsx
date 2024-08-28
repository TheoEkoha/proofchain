export const fillWithPrefix = (
  address: string = "",
  prefixProp?: string | false,
  prefixContext?: string | false,
): string => {
  let prefix = undefined;

  if (prefixProp === undefined && prefixContext === undefined) {
    prefix = "0x";
  } else {
    if (prefixProp !== undefined) {
      prefix = prefixProp === false ? "" : prefixProp;
    } else if (prefixContext !== undefined) {
      prefix = prefixContext === false ? "" : prefixContext;
    }
  }

  if (!prefix) return address;

  return address.startsWith(prefix) ? address : `${prefix}${address}`;
};

export const formatAddress = (address: string = "", groupSize = 4): string => {
  const formattedGroups = [];

  const has0x = address.startsWith("0x");
  const formatText = has0x ? address.slice(2) : address;

  for (let i = 0; i < formatText.length; i += groupSize) {
    const group = formatText.slice(i, i + groupSize);
    formattedGroups.push(group);
  }

  const formattedText = formattedGroups.join(" ");

  return has0x ? `0x ${formattedText}` : formattedText;
};

export const formatDate = (dateStr: string) => {
  const dateObj = new Date(dateStr);

  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Les mois sont indexés à partir de 0
  const day = String(dateObj.getDate()).padStart(2, "0");
  const year = dateObj.getFullYear();

  const formattedDate = `${month}/${day}/${year}`;

  return formattedDate;
};
